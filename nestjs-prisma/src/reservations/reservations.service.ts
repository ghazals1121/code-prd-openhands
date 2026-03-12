import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PricingService } from "./pricing.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService, private pricingService: PricingService) {}

  async findAllForUser(userId: string) {
    return this.prisma.reservation.findMany({ where: { userId }, include: { room: true }, orderBy: { createdAt: "desc" } });
  }

  async create(dto: CreateReservationDto, userId: string) {
    const room = await this.prisma.room.findUnique({ where: { id: dto.roomId } });
    if (!room) throw new NotFoundException("Room not found");
    const isAvailable = await this.checkAvailability(dto.roomId, dto.checkIn, dto.checkOut);
    if (!isAvailable) throw new BadRequestException("Room is not available for the selected dates");
    const totalPrice = this.pricingService.calculate(room.pricePerNight, new Date(dto.checkIn), new Date(dto.checkOut));
    return this.prisma.reservation.create({
      data: { userId, roomId: dto.roomId, checkIn: new Date(dto.checkIn), checkOut: new Date(dto.checkOut), totalPrice },
      include: { room: true },
    });
  }

  async cancel(id: string, userId: string) {
    const reservation = await this.prisma.reservation.findFirst({ where: { id, userId } });
    if (!reservation) throw new NotFoundException("Reservation not found");
    return this.prisma.reservation.update({ where: { id }, data: { status: "CANCELLED" } });
  }

  private async checkAvailability(roomId: string, checkIn: string, checkOut: string): Promise<boolean> {
    const overlap = await this.prisma.reservation.count({
      where: { roomId, status: { not: "CANCELLED" }, checkIn: { lt: new Date(checkOut) }, checkOut: { gt: new Date(checkIn) } },
    });
    return overlap === 0;
  }
}
