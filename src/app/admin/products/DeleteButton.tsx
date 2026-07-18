"use client";

import React from "react";
import { deleteProduct } from "./actions";

export default function DeleteButton({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  return (
    <form
      action={deleteProduct}
      onSubmit={(e) => {
        if (
          !confirm(`Delete "${productName}"? This cannot be undone.`)
        ) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={productId} />
      <button
        type="submit"
        className="text-xs font-medium tracking-wider uppercase text-red-500 hover:text-red-700 transition-colors"
      >
        Delete
      </button>
    </form>
  );
}
