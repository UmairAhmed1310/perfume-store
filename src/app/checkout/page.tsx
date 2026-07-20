import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4 text-center">
      <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold block mb-2">
        Coming Soon
      </span>
      <h1 className="font-serif text-3xl text-stone-900 tracking-wide mb-4">
        Secure Checkout
      </h1>
      <p className="text-sm font-light text-stone-500 tracking-wide max-w-sm mb-8 leading-relaxed">
        Stripe-powered payment is on its way. For now, enjoy browsing our
        collection.
      </p>
      <Link
        href="/cart"
        className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 transition-colors duration-300 shadow-sm"
      >
        Return To Cart
      </Link>
    </div>
  );
}
