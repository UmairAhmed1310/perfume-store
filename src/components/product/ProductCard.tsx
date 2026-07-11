import React from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/shop/${product.id}`} className="group cursor-pointer flex flex-col">
      {/* Product Image Wrapper */}
      <div className="aspect-[4/5] w-full overflow-hidden bg-stone-100 relative mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info Metadata */}
      <div className="flex flex-col flex-grow">
        <p className="text-[10px] tracking-widest uppercase text-stone-400 font-medium mb-1">
          {product.brand} &middot; {product.scentFamily}
        </p>
        <h3 className="font-serif text-base tracking-wide text-stone-900 group-hover:underline decoration-stone-300 underline-offset-4">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-stone-600 font-light">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}