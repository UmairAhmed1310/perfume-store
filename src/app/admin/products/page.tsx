import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "./actions";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl tracking-wide text-stone-900">
            Products
          </h1>
          <p className="text-sm text-stone-500 font-light tracking-wide mt-1">
            {products.length} product{products.length !== 1 ? "s" : ""} in collection
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium tracking-[0.15em] uppercase px-6 py-3 transition-colors duration-300"
        >
          + New Product
        </Link>
      </div>

      {/* Products Table */}
      {products.length === 0 ? (
        <div className="text-center py-24 bg-white border border-stone-200">
          <p className="text-stone-500 font-light tracking-wide">
            No products yet. Create your first one.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="text-left px-6 py-3 text-[10px] tracking-widest uppercase text-stone-400 font-semibold">
                  Product
                </th>
                <th className="text-left px-6 py-3 text-[10px] tracking-widest uppercase text-stone-400 font-semibold">
                  Scent Family
                </th>
                <th className="text-left px-6 py-3 text-[10px] tracking-widest uppercase text-stone-400 font-semibold">
                  Price
                </th>
                <th className="text-left px-6 py-3 text-[10px] tracking-widest uppercase text-stone-400 font-semibold">
                  Featured
                </th>
                <th className="text-right px-6 py-3 text-[10px] tracking-widest uppercase text-stone-400 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-16 object-cover bg-stone-100 border border-stone-100"
                      />
                      <div>
                        <p className="text-sm font-medium text-stone-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-stone-400 font-light">
                          {product.brand}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-600 font-light">
                    {product.scentFamily}
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-900 font-medium">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    {product.featured ? (
                      <span className="text-[10px] tracking-wider uppercase font-semibold text-stone-900 bg-stone-100 px-2 py-1">
                        Featured
                      </span>
                    ) : (
                      <span className="text-[10px] tracking-wider uppercase font-medium text-stone-400">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-xs font-medium tracking-wider uppercase text-stone-600 hover:text-stone-900 transition-colors"
                      >
                        Edit
                      </Link>
                      <form
                        action={deleteProduct}
                        onSubmit={(e) => {
                          if (
                            !confirm(
                              `Delete "${product.name}"? This cannot be undone.`
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <input type="hidden" name="id" value={product.id} />
                        <button
                          type="submit"
                          className="text-xs font-medium tracking-wider uppercase text-red-500 hover:text-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
