import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Essence collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      <header className="bg-stone-50 border-b border-stone-100 py-20 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold block mb-3">
          Legal
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl tracking-wide text-stone-900">
          Privacy Policy
        </h1>
        <p className="mt-3 text-xs text-stone-400 tracking-wide">
          Last updated: July 2026
        </p>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12 text-sm text-stone-600 font-light leading-relaxed">
        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            1. Information We Collect
          </h2>
          <p>
            When you create an account, place an order, or contact us, we collect your name,
            email address, shipping address, payment information, and any other details you
            choose to provide. We also collect browsing data (pages visited, referral source)
            through standard analytics tools.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-1">
            <li>To process and fulfil your orders, including shipping and returns.</li>
            <li>To send order confirmations, shipping updates, and customer support replies.</li>
            <li>To improve our website, product offerings, and customer experience.</li>
            <li>To send marketing communications — only if you opt in. You may unsubscribe at any time.</li>
            <li>To detect and prevent fraud or unauthorised access.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            3. Information Sharing
          </h2>
          <p>
            We do not sell your personal data. We share information only with service
            providers who help us operate — payment processors, shipping carriers, and
            analytics platforms — all bound by strict data-processing agreements. We may
            disclose information when required by law.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            4. Cookies
          </h2>
          <p>
            We use essential cookies to maintain your session and preferences. Analytics
            cookies help us understand how visitors interact with our site. You may disable
            non-essential cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            5. Data Security
          </h2>
          <p>
            We implement industry-standard encryption (TLS), access controls, and regular
            security audits. While no system is completely secure, we take every reasonable
            measure to protect your information.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            6. Your Rights
          </h2>
          <p>
            You may access, correct, or delete your personal data at any time by contacting
            us at privacy@essence-parfum.com or through your account settings. If you are
            in the EU/EEA, you also have the right to data portability and to lodge a
            complaint with a supervisory authority.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            7. Data Retention
          </h2>
          <p>
            We retain your account information for as long as your account is active. Order
            records are kept for seven years to comply with tax and accounting obligations.
            When you delete your account, we remove your personal data within 30 days.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl tracking-wide text-stone-900 mb-4">
            8. Contact
          </h2>
          <p>
            For privacy-related enquiries, contact our Data Protection Officer at{" "}
            <strong className="font-medium text-stone-900">privacy@essence-parfum.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
