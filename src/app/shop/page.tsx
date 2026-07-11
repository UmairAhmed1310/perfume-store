import React from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

export default function ShopPage() {
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

      {/* Grid Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}