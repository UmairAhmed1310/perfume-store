"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPending(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setPending(false);

    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold block mb-2">
            La Collection Privée
          </span>
          <h1 className="font-serif text-3xl tracking-wide text-stone-900">
            Welcome Back
          </h1>
          <p className="mt-3 text-sm text-stone-500 font-light tracking-wide">
            Sign in to your Essence account.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm tracking-wide text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-sm font-light tracking-wide px-4 py-3 focus:outline-none focus:border-stone-900 focus:bg-white transition-all placeholder-stone-400"
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white text-xs font-medium tracking-[0.2em] uppercase py-5 transition-colors duration-300 shadow-sm"
          >
            {pending ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer link */}
        <p className="mt-8 text-center text-sm text-stone-500 font-light tracking-wide">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-stone-900 font-medium underline decoration-stone-300 hover:decoration-stone-900 underline-offset-4 transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
