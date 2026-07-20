import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { paymentMethods } from "@/lib/payment-methods";

type Props = { params: Promise<{ id: string }> };

export default async function OrderConfirmationPage({ params }: Props) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) notFound();

  const method = paymentMethods.find((m) => m.id === order.paymentMethod);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="bg-stone-50 border-b border-stone-100 py-12 text-center">
        <h1 className="font-serif text-3xl tracking-wide text-stone-900">
          Order Confirmed
        </h1>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* Thank you */}
        <div className="text-center mb-12">
          <p className="text-sm font-light text-stone-500 tracking-wide leading-relaxed max-w-md mx-auto">
            Thank you — order <span className="font-medium text-stone-900">#{order.id}</span> has
            been received. We&apos;ll verify your payment and confirm within 24
            hours.
          </p>
        </div>

        {/* Payment instructions for manual methods */}
        {method?.isManual && (
          <div className="bg-stone-50 border border-stone-200 p-6 mb-8">
            <p className="text-[10px] tracking-widest uppercase text-stone-400 font-medium mb-2">
              Payment Instructions
            </p>
            <p className="text-sm text-stone-600 font-light tracking-wide mb-4">
              {method.instructions}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] tracking-widest uppercase text-stone-400 font-medium mb-1">
                  Account Number
                </p>
                <p className="text-sm font-medium text-stone-900">
                  {method.accountNumber}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-widest uppercase text-stone-400 font-medium mb-1">
                  Account Name
                </p>
                <p className="text-sm font-medium text-stone-900">
                  {method.accountName}
                </p>
              </div>
            </div>
            {order.transactionRef && (
              <div className="mt-4 pt-4 border-t border-stone-200">
                <p className="text-[10px] tracking-widest uppercase text-stone-400 font-medium mb-1">
                  Your Transaction ID
                </p>
                <p className="text-sm font-medium text-stone-900">
                  {order.transactionRef}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Order items */}
        <div className="border border-stone-200 p-6">
          <h2 className="font-serif text-lg text-stone-900 tracking-wide mb-4">
            Order Details
          </h2>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between pb-3 border-b border-stone-100 last:border-0"
              >
                <div>
                  <p className="text-sm text-stone-900 font-light">{item.name}</p>
                  <p className="text-[10px] text-stone-400 tracking-wide">
                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="text-sm font-medium text-stone-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-stone-200 flex justify-between">
            <span className="text-sm font-medium text-stone-900">Total</span>
            <span className="text-sm font-medium text-stone-900">
              ${order.total.toFixed(2)}
            </span>
          </div>

          <div className="mt-3 text-[10px] text-stone-400 tracking-wide">
            Payment method: {method?.label ?? order.paymentMethod} · Status:{" "}
            <span className="capitalize">{order.status}</span>
          </div>
        </div>

        {/* Back to shop */}
        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 transition-colors duration-300 shadow-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    </div>
  );
}
