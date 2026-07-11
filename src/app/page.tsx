import React from 'react';
import Link from 'next/link';
import { products } from '@/data/products';

export default function HomePage() {
  // Filter for featured products
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <div className="pb-24">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] flex items-center justify-center bg-stone-50 overflow-hidden">
        {/* Subtle decorative layout background element */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#d6d3d1_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10 flex flex-col items-center">
          <span className="text-xs tracking-[0.25em] uppercase text-stone-400 font-medium mb-4 block">
            La Collection Privée
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl tracking-wide text-stone-900 leading-tight max-w-3xl">
            Fragrances that linger long after you leave
          </h1>
          <p className="mt-6 text-base sm:text-lg font-light tracking-wide text-stone-600 max-w-xl leading-relaxed">
            Minimalist olfactive poetry, meticulously crafted in small batches using the world's finest botanical essences.
          </p>
          <div className="mt-10">
            <Link 
              href="/shop" 
              className="inline-block bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 transition-colors duration-300 shadow-sm"
            >
              Explore The Shop
            </Link>
          </div>
        </div>
      </section>

      {/* --- FEATURED PRODUCTS SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl tracking-wide text-stone-900">
            The Curated Selection
          </h2>
          <div className="w-12 h-[1px] bg-stone-300 mx-auto mt-4" />
        </div>

        {/* Responsive Editorial Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer flex flex-col">
              
              {/* Product Image Wrapper */}
              <div className="aspect-[4/5] w-full overflow-hidden bg-stone-100 relative mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-700 ease-out"
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
              
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}