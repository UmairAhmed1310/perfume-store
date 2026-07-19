"use server";

import { put } from "@vercel/blob";
import { auth } from "@/auth";

export async function uploadProductImage(
  formData: FormData
): Promise<{ url?: string; error?: string }> {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return { error: "Unauthorized" };
  }

  const file = formData.get("file") as File;
  if (!file || file.size === 0) {
    return { error: "No file provided" };
  }

  if (!file.type.startsWith("image/")) {
    return { error: "File must be an image" };
  }
  if (file.size > 4.5 * 1024 * 1024) {
    return { error: "Image must be under 4.5MB" };
  }

  const blob = await put(`products/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  return { url: blob.url };
}
