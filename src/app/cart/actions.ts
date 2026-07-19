"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

/** Type returned to the client — lightweight, no Prisma internals. */
export type CartItemRow = {
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    scentFamily: string;
  };
};

// ---------------------------------------------------------------------------
// Read
// ---------------------------------------------------------------------------

export async function getCart(): Promise<CartItemRow[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  const rows = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          brand: true,
          price: true,
          image: true,
          scentFamily: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return rows.map((r) => ({
    productId: r.productId,
    quantity: r.quantity,
    product: r.product,
  }));
}

// ---------------------------------------------------------------------------
// Add  (upsert — if already in cart, increment quantity)
// ---------------------------------------------------------------------------

export async function addToCart(productId: string): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) return;

  await prisma.cartItem.upsert({
    where: {
      userId_productId: {
        userId: session.user.id,
        productId,
      },
    },
    update: { quantity: { increment: 1 } },
    create: {
      userId: session.user.id,
      productId,
      quantity: 1,
    },
  });
}

// ---------------------------------------------------------------------------
// Update quantity
// ---------------------------------------------------------------------------

export async function updateCartItemQuantity(
  productId: string,
  quantity: number
): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) return;

  if (quantity <= 0) {
    await prisma.cartItem.deleteMany({
      where: { userId: session.user.id, productId },
    });
  } else {
    await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId,
        },
      },
      update: { quantity },
      create: {
        userId: session.user.id,
        productId,
        quantity,
      },
    });
  }
}

// ---------------------------------------------------------------------------
// Remove
// ---------------------------------------------------------------------------

export async function removeFromCart(productId: string): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) return;

  await prisma.cartItem.deleteMany({
    where: { userId: session.user.id, productId },
  });
}

// ---------------------------------------------------------------------------
// Merge — called once after login. Sums quantities for shared products.
// ---------------------------------------------------------------------------

export async function mergeGuestCart(
  guestItems: { productId: string; quantity: number }[]
): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) return;

  for (const item of guestItems) {
    await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId: item.productId,
        },
      },
      update: { quantity: { increment: item.quantity } },
      create: {
        userId: session.user.id,
        productId: item.productId,
        quantity: item.quantity,
      },
    });
  }
}
