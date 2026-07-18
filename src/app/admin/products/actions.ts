"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export type ProductState = {
  error?: string;
};

export async function createProduct(
  _prevState: ProductState,
  formData: FormData
): Promise<ProductState> {
  await requireAdmin();

  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const price = parseFloat(formData.get("price") as string);
  const scentFamily = formData.get("scentFamily") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const featured = formData.get("featured") === "on";

  if (!name || !brand || isNaN(price) || !scentFamily || !description || !image) {
    return { error: "All fields are required." };
  }

  await prisma.product.create({
    data: { name, brand, price, scentFamily, description, image, featured },
  });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProduct(
  _prevState: ProductState,
  formData: FormData
): Promise<ProductState> {
  await requireAdmin();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const price = parseFloat(formData.get("price") as string);
  const scentFamily = formData.get("scentFamily") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const featured = formData.get("featured") === "on";

  if (!id || !name || !brand || isNaN(price) || !scentFamily || !description || !image) {
    return { error: "All fields are required." };
  }

  await prisma.product.update({
    where: { id },
    data: { name, brand, price, scentFamily, description, image, featured },
  });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
  revalidatePath(`/shop/${id}`);
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;
  if (!id) return;

  await prisma.product.delete({ where: { id } });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
}
