"use client";

import React, { useState } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFamily, setSelectedFamily] = useState("All");

  // 1. Dynamically extract unique scent families from our product database
  const scentFamilies = ["All", ...Array.from(new Set(products.map((p) => p.scentFamily)))];

  // 2. Combine Search Input and Scent Family Tab Filters concurrently
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFamily = selectedFamily === "All" || product.scentFamily === selectedFamily;

    return matchesSearch && matchesFamily;
  });

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

      {/* Filter and Search Interface Layer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-stone-100">
        
        {/* Scent Family Custom Tab Buttons */}
        <div className="flex flex-wrap gap-2 text-xs tracking-wider uppercase font-medium">
          {scentFamilies.map((family) => (
            <button
              key={family}
              type="button"
              onClick={() => setSelectedFamily(family)}
              className={`px-4 py-2 transition-colors duration-200 border ${
                selectedFamily === family
                  ? "bg-stone-900 text-white border-stone-900"
                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-900 hover:text-stone-900"
              }`}
            >
              {family}
            </button>
          ))}
        </div>

        {/* Minimalist Search Box */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search notes, names, or families..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-sm font-light tracking-wide pl-4 pr-10 py-2.5 focus:outline-none focus:border-stone-900 focus:bg-white transition-all rounded-none placeholder-stone-400"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-stone-400">
            <svg className="w-4 h-4 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Grid Container & Empty State Pipeline */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto">
            <h3 className="font-serif text-xl text-stone-900 tracking-wide mb-2">
              No fragrances found
            </h3>
            <p className="text-sm font-light text-stone-500 tracking-wide leading-relaxed mb-6">
              Your search criteria for &ldquo;{searchTerm || selectedFamily}&rdquo; matches no formulas in our current production ledger.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedFamily("All");
              }}
              className="text-xs font-semibold tracking-widest uppercase text-stone-900 underline decoration-stone-300 hover:decoration-stone-900 transition-colors underline-offset-4"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}