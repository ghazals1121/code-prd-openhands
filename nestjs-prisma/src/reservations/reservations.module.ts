import { Module } from "@nestjs/common";
import { ReservationsController } from "./reservations.controller";
import { ReservationsService } from "./reservations.service";
import { PricingService } from "./pricing.service";
@Module({ controllers: [ReservationsController], providers: [ReservationsService, PricingService] })
export class ReservationsModule {}
