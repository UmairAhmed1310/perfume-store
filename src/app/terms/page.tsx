import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing your use of the Essence website and purchases.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      <header className="bg-stone-50 border-b border-stone-100 py-20 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold block mb-3">
          Legal
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl tracking-wide text-stone-900">
          Terms of Service
        </h1>
        <p className="mt-3 text-xs text-stone-400 tracking-wide">
          Last updated: July 2026
        </p>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12 text-sm text-stone-600 font-light leading-relaxed">
        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the Essence website (essence-parfum.com) and placing an
            order, you agree to be bound by these Terms of Service. If you do not agree,
            please do not use our site.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            2. Account Registration
          </h2>
          <p>
            You may browse our shop without an account. To place an order, you must provide
            accurate and complete information. You are responsible for maintaining the
            confidentiality of your password and for all activity under your account.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            3. Pricing &amp; Payment
          </h2>
          <p>
            All prices are displayed in your local currency at checkout. We accept major
            credit cards and offer manual payment methods (JazzCash, EasyPaisa) where
            available. Payment must be received before an order is processed.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            4. Shipping
          </h2>
          <p>
            We ship worldwide via tracked carriers. Delivery times are estimates and not
            guarantees. Essence is not responsible for delays caused by customs processing,
            incorrect address entries, or events beyond our control.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            5. Returns &amp; Refunds
          </h2>
          <p>
            Unopened, sealed products may be returned within 30 days of delivery for a full
            refund. Opened fragrances and discovery sets are non-returnable. If your order
            arrives damaged, contact us within 7 days with photographic evidence for a
            replacement or refund.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            6. Intellectual Property
          </h2>
          <p>
            All content on this website — text, images, logos, fragrance names, and
            formulations — is the property of Essence and protected by applicable
            intellectual property laws. You may not reproduce, distribute, or create
            derivative works without prior written consent.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            7. Limitation of Liability
          </h2>
          <p>
            Essence shall not be liable for any indirect, incidental, or consequential
            damages arising from your use of our website or products. Our total liability
            shall not exceed the amount you paid for the order in question.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            8. Changes to Terms
          </h2>
          <p>
            We reserve the right to update these terms at any time. Material changes will be
            announced on our website. Continued use of the site after changes are posted
            constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            9. Governing Law
          </h2>
          <p>
            These terms are governed by the laws of the jurisdiction in which Essence is
            registered. Disputes shall be resolved through binding arbitration before
            resorting to litigation.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            10. Contact
          </h2>
          <p>
            Questions about these terms? Email us at{" "}
            <strong className="font-medium text-stone-900">legal@essence-parfum.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
