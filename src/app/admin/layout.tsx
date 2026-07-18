import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex bg-stone-50">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-white flex flex-col">
        {/* Brand */}
        <div className="p-6 border-b border-stone-800">
          <Link
            href="/admin/products"
            className="font-serif text-lg tracking-widest uppercase hover:opacity-80 transition-opacity"
          >
            Essence Admin
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin/products"
            className="block px-4 py-3 text-sm font-medium tracking-wide text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
          >
            Products
          </Link>
          <Link
            href="/admin/orders"
            className="block px-4 py-3 text-sm font-medium tracking-wide text-stone-500 cursor-not-allowed"
          >
            Orders (coming soon)
          </Link>
        </nav>

        {/* Back to site */}
        <div className="p-4 border-t border-stone-800">
          <Link
            href="/"
            className="block px-4 py-3 text-sm font-light tracking-wide text-stone-400 hover:text-white transition-colors"
          >
            &larr; Back to site
          </Link>
          <div className="px-4 mt-2 text-xs text-stone-500 font-light">
            Signed in as {session.user?.name}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
