import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async findAvailable(filters: { type?: string; checkIn?: string; checkOut?: string }) {
    return this.prisma.room.findMany({
      where: {
        isAvailable: true,
        ...(filters.type && { type: filters.type as any }),
        ...(filters.checkIn && filters.checkOut && {
          reservations: {
            none: {
              AND: [
                { checkIn: { lt: new Date(filters.checkOut!) } },
                { checkOut: { gt: new Date(filters.checkIn!) } },
                { status: { not: "CANCELLED" } },
              ],
            },
          },
        }),
      },
    });
  }

  async findOne(id: string) {
    const room = await this.prisma.room.findUnique({ where: { id } });
    if (!room) throw new NotFoundException("Room not found");
    return room;
  }
}
