import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Essence — questions, press, wholesale, or custom consultations.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero */}
      <header className="bg-stone-50 border-b border-stone-100 py-20 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold block mb-3">
          Reach Out
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl tracking-wide text-stone-900">
          Contact Us
        </h1>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center mb-16">
          {[
            {
              label: "General Enquiries",
              value: "hello@essence-parfum.com",
            },
            {
              label: "Press & Wholesale",
              value: "press@essence-parfum.com",
            },
            {
              label: "Custom Consultations",
              value: "consult@essence-parfum.com",
            },
          ].map((item) => (
            <div key={item.label}>
              <span className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-semibold block mb-2">
                {item.label}
              </span>
              <span className="text-sm text-stone-700 font-light">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Response Promise */}
        <section className="bg-stone-50 border border-stone-100 p-10 text-center mb-16">
          <p className="text-sm text-stone-600 font-light leading-relaxed max-w-lg mx-auto">
            We respond to all enquiries within{" "}
            <strong className="font-medium text-stone-900">48 hours</strong> during business
            days. For custom scent consultations, please allow up to one week so we can
            prepare a considered response.
          </p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="font-serif text-2xl tracking-wide text-stone-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {[
              {
                q: "Do you ship internationally?",
                a: "Yes. We ship worldwide via tracked, insured carriers. Delivery typically takes 5–10 business days depending on destination.",
              },
              {
                q: "Can I return an opened fragrance?",
                a: "We accept returns within 30 days for unopened, sealed products. If you purchased a discovery set, we recommend sampling before committing to a full bottle.",
              },
              {
                q: "Do you offer gift wrapping?",
                a: "Every order ships in our signature matte-black box with tissue paper. Gift messages can be added at checkout at no extra cost.",
              },
              {
                q: "Are your fragrances tested on animals?",
                a: "Never. All Essence fragrances are certified vegan and cruelty-free by independent third-party auditors.",
              },
            ].map((item) => (
              <div key={item.q}>
                <h3 className="text-sm font-medium text-stone-900 mb-2">
                  {item.q}
                </h3>
                <p className="text-sm text-stone-600 font-light leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
