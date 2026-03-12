import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PaymentsService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", { apiVersion: "2023-10-16" });

  constructor(private prisma: PrismaService) {}

  async createIntent(reservationId: string) {
    const reservation = await this.prisma.reservation.findUniqueOrThrow({ where: { id: reservationId } });
    const intent = await this.stripe.paymentIntents.create({
      amount: Math.round(reservation.totalPrice * 100),
      currency: "usd",
      metadata: { reservationId },
    });
    return { clientSecret: intent.client_secret };
  }

  async handleWebhook(payload: Buffer, signature: string) {
    const event = this.stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET ?? "");
    if (event.type === "payment_intent.succeeded") {
      const pi = event.data.object as Stripe.PaymentIntent;
      await this.prisma.reservation.update({
        where: { id: pi.metadata.reservationId },
        data: { status: "CONFIRMED", paymentId: pi.id },
      });
    }
    return { received: true };
  }
}
