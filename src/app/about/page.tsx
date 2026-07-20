import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover the philosophy behind Essence — curated minimalist fragrances hand-blended in small batches.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero */}
      <header className="bg-stone-50 border-b border-stone-100 py-20 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold block mb-3">
          Our Story
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl tracking-wide text-stone-900">
          About Essence
        </h1>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-16">
        {/* Philosophy */}
        <section>
          <h2 className="font-serif text-2xl tracking-wide text-stone-900 mb-4">
            A Philosophy of Restraint
          </h2>
          <p className="text-stone-600 font-light leading-relaxed text-sm">
            Essence was born from a conviction that fragrance, at its finest, is an act of
            subtraction. In a landscape crowded with synthetic volume and fleeting trends, we
            chose a different path: fewer ingredients, longer maceration, and an unwavering
            commitment to architectural composition.
          </p>
          <p className="text-stone-600 font-light leading-relaxed text-sm mt-4">
            Every formula is the result of months of deliberate refinement — balancing top,
            heart, and base notes into a single, cohesive signature that evolves on the skin
            over hours rather than minutes.
          </p>
        </section>

        {/* Process */}
        <section>
          <h2 className="font-serif text-2xl tracking-wide text-stone-900 mb-4">
            Small Batch, Considered Craft
          </h2>
          <p className="text-stone-600 font-light leading-relaxed text-sm">
            Each fragrance is hand-blended in limited runs using the world's finest
            botanical essences — Grasse jasmine absolute, Mysore sandalwood, Haitian vetiver,
            and rare oud aged for years before distillation. We never rush a maceration. Some
            compositions rest for six months before they meet a bottle.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { number: "6+", label: "Month Average Maceration" },
              { number: "100%", label: "Natural Essences" },
              { number: "< 500", label: "Batches Per Release" },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="font-serif text-3xl text-stone-900 block">
                  {stat.number}
                </span>
                <span className="text-xs tracking-wider uppercase text-stone-400 mt-1 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Ingredients */}
        <section>
          <h2 className="font-serif text-2xl tracking-wide text-stone-900 mb-4">
            Ingredient Sourcing
          </h2>
          <p className="text-stone-600 font-light leading-relaxed text-sm">
            We work directly with independent growers and traditional distillers in Grasse,
            Southern India, and the Comoros Islands. Each raw material is selected not only
            for its olfactory profile but for the integrity of its extraction — enfleurage,
            steam distillation, or CO₂ extraction, chosen to preserve the living complexity
            of the botanical source.
          </p>
        </section>

        {/* Values */}
        <section>
          <h2 className="font-serif text-2xl tracking-wide text-stone-900 mb-4">
            Our Commitments
          </h2>
          <ul className="space-y-3">
            {[
              "No synthetic aromachemicals — ever.",
              "Vegan and cruelty-free, certified by independent auditors.",
              "Fully recyclable packaging, FSC-certified paper and glass.",
              "Transparent pricing — we publish our ingredient cost breakdown.",
              "Carbon-neutral shipping on every order.",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-stone-600 font-light text-sm"
              >
                <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
