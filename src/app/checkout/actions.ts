"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { paymentMethods } from "@/lib/payment-methods";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type OrderState = {
  error?: string;
};

export async function placeOrder(
  _prevState: OrderState,
  formData: FormData
): Promise<OrderState> {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;

  // --- Parse cart items from hidden field ---
  // We ONLY trust productId and quantity from the client.
  // Price and name come from the database — never from the browser.
  const cartJson = formData.get("cartItems") as string;
  if (!cartJson) return { error: "Cart is empty." };

  let cartInput: { productId: string; quantity: number }[];
  try {
    cartInput = JSON.parse(cartJson);
  } catch {
    return { error: "Invalid cart data." };
  }

  if (!Array.isArray(cartInput) || cartInput.length === 0) {
    return { error: "Cart is empty." };
  }

  // --- Validate payment method ---
  const paymentMethodId = formData.get("paymentMethod") as string;
  const method = paymentMethods.find((m) => m.id === paymentMethodId);
  if (!method || !method.enabled) {
    return { error: "Invalid or unavailable payment method." };
  }

  const transactionRef = (formData.get("transactionRef") as string)?.trim() || null;
  if (method.isManual && !transactionRef) {
    return { error: "Transaction ID is required for manual payment methods." };
  }

  // --- Guest validation ---
  const guestName = (formData.get("guestName") as string)?.trim() || null;
  const guestEmail = (formData.get("guestEmail") as string)?.trim() || null;
  if (!isLoggedIn) {
    if (!guestName || !guestEmail) {
      return { error: "Name and email are required for guest checkout." };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail)) {
      return { error: "Please enter a valid email address." };
    }
  }

  // --- Fetch real prices from DB (never trust client-submitted prices) ---
  const productIds = cartInput.map((i) => i.productId);
  const dbProducts = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  const orderItemsData = cartInput.map((item) => {
    const product = dbProducts.find((p) => p.id === item.productId);
    if (!product) {
      throw new Error(`Product ${item.productId} no longer exists.`);
    }
    // Clamp quantity to sane range (1–20) to prevent abuse
    const quantity = Math.max(1, Math.min(20, Math.floor(item.quantity)));
    return {
      productId: item.productId,
      name: product.name,
      price: product.price,
      quantity,
    };
  });

  const total = orderItemsData.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // --- Create order in a transaction ---
  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        userId: session?.user?.id ?? null,
        guestEmail: isLoggedIn ? null : guestEmail,
        guestName: isLoggedIn ? null : guestName,
        paymentMethod: method.id,
        transactionRef,
        total,
        items: {
          create: orderItemsData.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    // --- Clear cart (DB rows if logged in) ---
    if (isLoggedIn) {
      await tx.cartItem.deleteMany({ where: { userId: session!.user!.id } });
    }

    return newOrder;
  });

  revalidatePath("/cart");
  redirect(`/order-confirmation/${order.id}`);
}
