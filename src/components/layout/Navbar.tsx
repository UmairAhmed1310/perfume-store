"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="w-full border-b border-stone-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-serif text-2xl tracking-widest uppercase text-stone-900 hover:opacity-80 transition-opacity">
              Essence
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-12">
            <Link href="/" className="text-sm font-medium tracking-wide text-stone-600 hover:text-stone-900 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-medium tracking-wide text-stone-600 hover:text-stone-900 transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-sm font-medium tracking-wide text-stone-600 hover:text-stone-900 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium tracking-wide text-stone-600 hover:text-stone-900 transition-colors">
              Contact
            </Link>
          </div>

          {/* Cart Icon Wrapper */}
          <div className="flex items-center">
            <Link 
              href="/cart"
              className="p-2 text-stone-700 hover:text-stone-900 transition-colors relative focus:outline-none block"
              aria-label="View Shopping Cart"
            >
              <svg 
                className="w-5 h-5 stroke-[1.5]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" 
                />
              </svg>
              
              {/* Dynamic Live Counter Badge */}
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-stone-900 text-white text-[10px] font-medium flex items-center justify-center rounded-full leading-none scale-90">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}