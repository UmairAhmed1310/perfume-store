import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// Setting up a nice refined sans-serif and editorial serif font combination
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter" 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair" 
});

export const metadata: Metadata = {
  title: "Essence | Haute Parfumerie",
  description: "Discover curated minimalist fragrances.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-white text-stone-900 antialiased font-sans">
        <div className="flex flex-col min-h-screen">
          {/* Persistent Top Navigation */}
          <Navbar />
          
          {/* Page Content expands to fill vertical space */}
          <main className="flex-grow">
            {children}
          </main>
          
          {/* Persistent Bottom Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}