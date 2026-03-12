import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { reservationId } = await req.json();
  const reservation = await prisma.reservation.findUnique({ where: { id: reservationId } });
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(reservation!.totalPrice * 100),
    currency: "usd",
    metadata: { reservationId },
  });
  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
