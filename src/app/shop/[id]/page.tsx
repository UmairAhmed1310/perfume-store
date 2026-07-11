import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/data/products';
import AddToCartButton from "@/components/product/AddToCartButton";
import type { Metadata } from "next";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  
  if (!product) {
    return { title: "Product Not Found" };
  }
  
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  // Await the route parameters promise safely
  const { id } = await params;
  
  // Look up the unique product configuration from data store
  const product = products.find((p) => p.id === id);
  
  // Direct to custom 404 page if someone looks up an invalid product ID
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Breadcrumb Navigation trail */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-xs tracking-wider uppercase text-stone-400 font-medium">
        <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
        <span className="mx-2">&middot;</span>
        <Link href="/shop" className="hover:text-stone-900 transition-colors">Shop</Link>
        <span className="mx-2">&middot;</span>
        <span className="text-stone-600">{product.name}</span>
      </nav>

      {/* Main Presentation Layout Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 items-start">
        
        {/* Left Column: Premium Framing Aspect Ratio Image */}
        <div className="aspect-[4/5] bg-stone-100 w-full overflow-hidden border border-stone-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={`${product.name} luxury perfume bottle`}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Right Column: Narrative Copy & Commerce Controls */}
        <div className="flex flex-col pt-2 lg:pt-8">
          
          {/* Brand & Scent Classification */}
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-stone-400 mb-2 block">
            {product.brand} &middot; {product.scentFamily} Collection
          </span>

          {/* Product Title */}
          <h1 className="font-serif text-3xl sm:text-4xl tracking-wide text-stone-900 leading-tight">
            {product.name}
          </h1>

          {/* Pricing tier block */}
          <p className="mt-4 text-xl font-light text-stone-700 tracking-wide">
            ${product.price.toFixed(2)}
          </p>

          <div className="w-full h-[1px] bg-stone-100 my-8" />

          {/* Olfactive Narrative Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              The Experience
            </h3>
            <p className="text-base text-stone-600 font-light leading-relaxed tracking-wide">
              {product.description}
            </p>
          </div>

          <div className="w-full h-[1px] bg-stone-100 my-8" />

          {/* Sizing Note / Small-Batch Details */}
          <div className="text-xs text-stone-400 font-light tracking-wide space-y-1 mb-8">
            <p>&bull; Size: 100 mL / 3.4 fl. oz.</p>
            <p>&bull; Concentration: Extrait de Parfum</p>
            <p>&bull; Hand-blended and poured sequentially in limited editions.</p>
          </div>

          {/* Inside your ProductDetailPage return layout where the button used to be: */}
          {/* Call to action panel */}
          <div>
            <AddToCartButton product={product} />
          </div>

        </div>
      </main>
    </div>
  );
}