import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request } from "@nestjs/common";
import { ReservationsService } from "./reservations.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("reservations")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("reservations")
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.reservationsService.findAllForUser(req.user.id);
  }

  @Post()
  create(@Body() dto: CreateReservationDto, @Request() req: any) {
    return this.reservationsService.create(dto, req.user.id);
  }

  @Delete(":id")
  cancel(@Param("id") id: string, @Request() req: any) {
    return this.reservationsService.cancel(id, req.user.id);
  }
}
