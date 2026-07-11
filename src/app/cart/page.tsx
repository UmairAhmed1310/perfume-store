"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4 text-center">
        <h1 className="font-serif text-3xl text-stone-900 tracking-wide mb-4">
          Your curation is empty
        </h1>
        <p className="text-sm font-light text-stone-500 tracking-wide max-w-sm mb-8 leading-relaxed">
          Explore our collection of small-batch botanical signatures to start your olfactive journal.
        </p>
        <Link
          href="/shop"
          className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 transition-colors duration-300 shadow-sm"
        >
          Return To The Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Page Header */}
      <header className="bg-stone-50 border-b border-stone-100 py-12 text-center">
        <h1 className="font-serif text-3xl tracking-wide text-stone-900">
          Your Collection
        </h1>
      </header>

      {/* Main Structural Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
        
        {/* Left Column: List of items */}
        <section className="lg:col-span-7 space-y-8">
          <div className="hidden sm:grid grid-cols-12 text-[10px] tracking-widest uppercase text-stone-400 font-semibold pb-4 border-b border-stone-100">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 pb-8 border-b border-stone-100 relative group"
            >
              {/* Image & Basic Identification */}
              <div className="col-span-1 sm:col-span-6 flex items-center space-x-4">
                <div className="w-20 aspect-[4/5] bg-stone-50 overflow-hidden flex-shrink-0 border border-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-stone-400 font-medium">
                    {item.product.brand}
                  </p>
                  <Link
                    href={`/shop/${item.product.id}`}
                    className="font-serif text-base text-stone-900 hover:underline decoration-stone-300 underline-offset-4"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-stone-400 font-light mt-0.5 sm:hidden">
                    ${item.product.price.toFixed(2)} each
                  </p>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-xs text-stone-400 hover:text-stone-900 mt-2 block tracking-wide underline decoration-stone-200 hover:decoration-stone-900 transition-colors sm:mt-1 font-light"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Price Per Unit (Desktop Only) */}
              <div className="hidden sm:block sm:col-span-2 text-center text-sm font-light text-stone-600">
                ${item.product.price.toFixed(2)}
              </div>

              {/* Quantity Controls */}
              <div className="col-span-1 sm:col-span-2 flex justify-start sm:justify-center">
                <div className="flex items-center border border-stone-200 px-2 py-1 bg-white">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-1 text-stone-400 hover:text-stone-900 text-sm focus:outline-none transition-colors w-6"
                    aria-label="Decrease quantity"
                  >
                    &minus;
                  </button>
                  <span className="px-2 text-sm text-stone-800 font-medium min-w-[20px] text-center select-none">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1 text-stone-400 hover:text-stone-900 text-sm focus:outline-none transition-colors w-6"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Line Item Total */}
              <div className="col-span-1 sm:col-span-2 text-left sm:text-right text-sm font-medium text-stone-900">
                <span className="sm:hidden text-xs text-stone-400 font-light mr-1">Total:</span>
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </section>

        {/* Right Column: Summary Card */}
        <section className="lg:col-span-5 bg-stone-50 border border-stone-100 p-8 self-start sticky top-28">
          <h2 className="font-serif text-xl text-stone-900 tracking-wide mb-6">
            Summary
          </h2>

          <div className="space-y-4 text-sm font-light tracking-wide text-stone-600">
            <div className="flex justify-between pb-4 border-b border-stone-200/60">
              <span>Subtotal</span>
              <span className="font-medium text-stone-900">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pb-4 border-b border-stone-200/60">
              <span>Shipping</span>
              <span className="text-xs text-stone-400 font-medium tracking-normal uppercase">
                Complimentary
              </span>
            </div>
            <div className="flex justify-between text-base text-stone-900 pt-2 font-medium">
              <span>Estimated Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/checkout"
              className="w-full inline-flex justify-center bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium tracking-[0.2em] uppercase py-5 transition-colors duration-300 shadow-sm text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
          <p className="mt-4 text-[10px] text-stone-400 text-center font-light leading-relaxed">
            Shipping and regional taxes calculated dynamically at authorization step.
          </p>
        </section>

      </main>
    </div>
  );
}