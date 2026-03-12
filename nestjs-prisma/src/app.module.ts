import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { RoomsModule } from "./rooms/rooms.module";
import { ReservationsModule } from "./reservations/reservations.module";
import { PaymentsModule } from "./payments/payments.module";
import { UsersModule } from "./users/users.module";
@Module({ imports: [PrismaModule, AuthModule, RoomsModule, ReservationsModule, PaymentsModule, UsersModule] })
export class AppModule {}
