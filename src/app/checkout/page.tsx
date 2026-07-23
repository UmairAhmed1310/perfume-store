"use client";

import React, { useState, useEffect, useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { paymentMethods, type PaymentMethod } from "@/lib/payment-methods";
import { placeOrder, type OrderState } from "./actions";

const enabledMethods = paymentMethods.filter((m) => m.enabled);

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { cartItems, cartTotal } = useCart();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [state, formAction, pending] = useActionState<OrderState, FormData>(
    placeOrder,
    {}
  );

  const isLoggedIn = status === "authenticated" && !!session?.user?.id;

  // Redirect to /cart if cart is empty
  if (cartItems.length === 0 && status !== "loading") {
    router.push("/cart");
    return null;
  }

  // Don't render until session is resolved
  if (status === "loading") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-sm text-stone-400 tracking-wide animate-pulse">
          Loading…
        </p>
      </div>
    );
  }

  const activeMethod = enabledMethods.find((m) => m.id === selectedMethod);

  // Build hidden cart items JSON for the server action.
  // Only send productId + quantity — the server fetches price/name from the DB.
  const cartItemsJson = JSON.stringify(
    cartItems.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }))
  );

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="bg-stone-50 border-b border-stone-100 py-12 text-center">
        <h1 className="font-serif text-3xl tracking-wide text-stone-900">
          Checkout
        </h1>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
        {/* Left column: form */}
        <form
          action={formAction}
          className="lg:col-span-7 space-y-8"
          onSubmit={() => {
            // Clear localStorage cart before server action clears DB cart.
            // The redirect to /order-confirmation will mount a fresh CartProvider
            // that reads empty localStorage.
            localStorage.removeItem("cart");
          }}
        >
          <input type="hidden" name="cartItems" value={cartItemsJson} />

          {/* Error */}
          {state.error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm tracking-wide">
              {state.error}
            </div>
          )}

          {/* Guest fields */}
          {!isLoggedIn && (
            <fieldset className="space-y-6">
              <legend className="text-[10px] tracking-widest uppercase text-stone-500 font-medium">
                Your Details
              </legend>
              <div>
                <label
                  htmlFor="guestName"
                  className="block text-[10px] tracking-widest uppercase text-stone-500 font-medium mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="guestName"
                  name="guestName"
                  required
                  className="w-full bg-white border border-stone-200 text-stone-900 text-sm font-light tracking-wide px-4 py-3 focus:outline-none focus:border-stone-900 transition-all placeholder-stone-400"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="guestEmail"
                  className="block text-[10px] tracking-widest uppercase text-stone-500 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="guestEmail"
                  name="guestEmail"
                  required
                  className="w-full bg-white border border-stone-200 text-stone-900 text-sm font-light tracking-wide px-4 py-3 focus:outline-none focus:border-stone-900 transition-all placeholder-stone-400"
                  placeholder="you@example.com"
                />
              </div>
            </fieldset>
          )}

          {/* Payment method selection */}
          <fieldset className="space-y-4">
            <legend className="text-[10px] tracking-widest uppercase text-stone-500 font-medium">
              Payment Method
            </legend>

            {enabledMethods.map((method) => (
              <label
                key={method.id}
                className={`block border p-4 cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? "border-stone-900 bg-stone-50"
                    : "border-stone-200 hover:border-stone-400"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                    className="w-4 h-4 text-stone-900 border-stone-300 focus:ring-stone-900"
                  />
                  <span className="text-sm font-medium text-stone-900 tracking-wide">
                    {method.label}
                  </span>
                </div>

                {/* Show details when selected */}
                {selectedMethod === method.id && (
                  <div className="mt-4 ml-7 space-y-3">
                    <p className="text-xs text-stone-500 font-light leading-relaxed">
                      {method.instructions}
                    </p>
                    {method.isManual && (
                      <>
                        <div className="bg-white border border-stone-200 p-3 space-y-1">
                          <p className="text-[10px] tracking-widest uppercase text-stone-400">
                            Account Number
                          </p>
                          <p className="text-sm font-medium text-stone-900 tracking-wide">
                            {method.accountNumber}
                          </p>
                        </div>
                        <div className="bg-white border border-stone-200 p-3 space-y-1">
                          <p className="text-[10px] tracking-widest uppercase text-stone-400">
                            Account Name
                          </p>
                          <p className="text-sm font-medium text-stone-900 tracking-wide">
                            {method.accountName}
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="transactionRef"
                            className="block text-[10px] tracking-widest uppercase text-stone-500 font-medium mb-2"
                          >
                            Transaction ID *
                          </label>
                          <input
                            type="text"
                            id="transactionRef"
                            name="transactionRef"
                            required
                            className="w-full bg-white border border-stone-200 text-stone-900 text-sm font-light tracking-wide px-4 py-3 focus:outline-none focus:border-stone-900 transition-all placeholder-stone-400"
                            placeholder="e.g. 1234567890"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </label>
            ))}
          </fieldset>

          {/* Submit */}
          <button
            type="submit"
            disabled={pending || !selectedMethod}
            className="bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white text-xs font-medium tracking-[0.15em] uppercase px-8 py-4 transition-colors duration-300"
          >
            {pending ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {/* Right column: order summary */}
        <section className="lg:col-span-5 bg-stone-50 border border-stone-100 p-8 self-start sticky top-28">
          <h2 className="font-serif text-xl text-stone-900 tracking-wide mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between pb-4 border-b border-stone-200/60"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-16 bg-stone-100 overflow-hidden flex-shrink-0 border border-stone-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-stone-900 tracking-wide">
                      {item.product.name}
                    </p>
                    <p className="text-[10px] text-stone-400 tracking-wide">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium text-stone-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 text-sm font-light tracking-wide text-stone-600">
            <div className="flex justify-between pb-4 border-b border-stone-200/60">
              <span>Subtotal</span>
              <span className="font-medium text-stone-900">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pb-4 border-b border-stone-200/60">
              <span>Shipping</span>
              <span className="text-xs text-stone-400 font-medium tracking-normal uppercase">
                Complimentary
              </span>
            </div>
            <div className="flex justify-between text-base text-stone-900 pt-2 font-medium">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <p className="mt-6 text-[10px] text-stone-400 text-center font-light leading-relaxed">
            Your order will be confirmed after payment verification.
          </p>
        </section>
      </main>
    </div>
  );
}
