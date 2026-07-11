"use client";

import React from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      className="w-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium tracking-[0.2em] uppercase py-5 transition-colors duration-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-stone-900 focus:ring-offset-2"
    >
      Add To Collection
    </button>
  );
}