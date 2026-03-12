import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const rooms = await prisma.room.findMany({
    where: {
      isAvailable: true,
      reservations: { none: { AND: [
        { checkIn: { lt: new Date(checkOut!) } },
        { checkOut: { gt: new Date(checkIn!) } },
        { status: { not: "CANCELLED" } },
      ]}},
    },
  });
  return NextResponse.json(rooms);
}
