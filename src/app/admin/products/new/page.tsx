import React from "react";
import ProductForm from "../ProductForm";
import { createProduct } from "../actions";

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl tracking-wide text-stone-900">
          New Product
        </h1>
        <p className="text-sm text-stone-500 font-light tracking-wide mt-1">
          Add a new fragrance to the collection.
        </p>
      </div>

      <ProductForm action={createProduct} submitLabel="Create Product" />
    </div>
  );
}
