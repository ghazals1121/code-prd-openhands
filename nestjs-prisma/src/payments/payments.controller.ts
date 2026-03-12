import { Controller, Post, Body, Headers, RawBodyRequest, Req, UseGuards } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Request } from "express";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("payments")
@Controller("payments")
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @ApiBearerAuth() @UseGuards(JwtAuthGuard) @Post("create-intent")
  createIntent(@Body() body: { reservationId: string }) {
    return this.paymentsService.createIntent(body.reservationId);
  }

  @Post("webhook")
  webhook(@Req() req: RawBodyRequest<Request>, @Headers("stripe-signature") sig: string) {
    return this.paymentsService.handleWebhook(req.rawBody!, sig);
  }
}
