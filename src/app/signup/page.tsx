"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { signup, type SignupState } from "./actions";

export default function SignupPage() {
  const [state, formAction, pending] = useActionState<SignupState, FormData>(
    signup,
    {}
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold block mb-2">
            La Collection Privée
          </span>
          <h1 className="font-serif text-3xl tracking-wide text-stone-900">
            Create Account
          </h1>
          <p className="mt-3 text-sm text-stone-500 font-light tracking-wide">
            Join the Essence collection.
          </p>
        </div>

        {/* Error message */}
        {state.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm tracking-wide text-center">
            {state.error}
          </div>
        )}

        {/* Signup Form */}
        <form action={formAction} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-[10px] tracking-widest uppercase text-stone-500 font-medium mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-sm font-light tracking-wide px-4 py-3 focus:outline-none focus:border-stone-900 focus:bg-white transition-all placeholder-stone-400"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-[10px] tracking-widest uppercase text-stone-500 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-sm font-light tracking-wide px-4 py-3 focus:outline-none focus:border-stone-900 focus:bg-white transition-all placeholder-stone-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[10px] tracking-widest uppercase text-stone-500 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength={6}
              className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-sm font-light tracking-wide px-4 py-3 focus:outline-none focus:border-stone-900 focus:bg-white transition-all placeholder-stone-400"
              placeholder="Min. 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white text-xs font-medium tracking-[0.2em] uppercase py-5 transition-colors duration-300 shadow-sm"
          >
            {pending ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer link */}
        <p className="mt-8 text-center text-sm text-stone-500 font-light tracking-wide">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-stone-900 font-medium underline decoration-stone-300 hover:decoration-stone-900 underline-offset-4 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
