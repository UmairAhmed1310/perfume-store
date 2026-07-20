import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.cartItem.findMany({
    include: {
      user: { select: { id: true, email: true } },
      product: { select: { id: true, name: true } },
    },
  });
  return NextResponse.json(items);
}
