import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("rooms")
@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  findAll(@Query("type") type?: string, @Query("checkIn") checkIn?: string, @Query("checkOut") checkOut?: string) {
    return this.roomsService.findAvailable({ type, checkIn, checkOut });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roomsService.findOne(id);
  }
}
