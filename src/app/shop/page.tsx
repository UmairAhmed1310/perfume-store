import React from 'react';
import { prisma } from '@/lib/prisma';
import ShopContent from '@/components/product/ShopContent';

export default async function ShopPage() {
  const products = await prisma.product.findMany();

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Page Header Area */}
      <header className="bg-stone-50 border-b border-stone-100 py-16 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold block mb-2">
          Olfactive Journal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-wide text-stone-900">
          The Full Collection
        </h1>
        <p className="mt-3 text-sm text-stone-500 font-light tracking-wide max-w-md mx-auto">
          Explore our complete range of deliberate, architectural scent signatures.
        </p>
      </header>

      {/* Client-side filtering and product grid */}
      <ShopContent products={products} />
    </div>
  );
}
