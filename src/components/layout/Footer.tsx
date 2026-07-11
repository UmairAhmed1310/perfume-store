import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-stone-100 bg-stone-50 text-stone-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand & Copyright */}
          <div className="text-sm font-light tracking-wide text-center md:text-left">
            <span className="font-serif tracking-widest uppercase text-stone-900 mr-2">Essence</span>
            &copy; {currentYear}. All rights reserved.
          </div>

          {/* Legal / Info Links */}
          <div className="flex space-x-8 text-xs tracking-wider uppercase font-medium">
            <Link href="/privacy" className="hover:text-stone-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-stone-900 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-stone-900 transition-colors">
              Contact
            </Link>
          </div>

          {/* Social Icons (Static) */}
          <div className="flex space-x-5 text-stone-400">
            <a href="#" className="hover:text-stone-900 transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="hover:text-stone-900 transition-colors" aria-label="Pinterest">
              <svg className="w-5 h-5 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 21c.5-2.5 1-4.5 1.5-6.5C9 13 8 11.5 8 9.5c0-2.5 2-4.5 4.5-4.5s4 1.5 4 4c0 2-1 3.5-1.5 4.5s0 2.5 1 2.5c2 0 4.5-3 4.5-7 0-4-3.5-6.5-7.5-6.5E-5 0-7.5 3-7.5 7.5 0 1.5.5 2.5 1 3.5l-.5 2" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}