import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { reservationSchema } from "@/lib/validations";
import { calculateTotalPrice } from "@/lib/pricing";
export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const parsed = reservationSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const { roomId, checkIn, checkOut } = parsed.data;
  const room = await prisma.room.findUnique({ where: { id: roomId } });
  const totalPrice = calculateTotalPrice(room!.pricePerNight, new Date(checkIn), new Date(checkOut));
  const reservation = await prisma.reservation.create({
    data: { userId: session.user.id, roomId, checkIn: new Date(checkIn), checkOut: new Date(checkOut), totalPrice },
  });
  return NextResponse.json(reservation, { status: 201 });
}
export async function GET(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const reservations = await prisma.reservation.findMany({
    where: { userId: session.user.id }, include: { room: true },
  });
  return NextResponse.json(reservations);
}
