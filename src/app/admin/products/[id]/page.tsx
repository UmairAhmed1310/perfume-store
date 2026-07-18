import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "../ProductForm";
import { updateProduct } from "../actions";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl tracking-wide text-stone-900">
          Edit Product
        </h1>
        <p className="text-sm text-stone-500 font-light tracking-wide mt-1">
          Update &ldquo;{product.name}&rdquo;
        </p>
      </div>

      <ProductForm
        action={updateProduct}
        product={product}
        submitLabel="Save Changes"
      />
    </div>
  );
}
