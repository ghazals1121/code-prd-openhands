import { Injectable } from "@nestjs/common";

@Injectable()
export class PricingService {
  calculate(pricePerNight: number, checkIn: Date, checkOut: Date): number {
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const base = pricePerNight * nights;
    return this.applyDiscount(base, nights);
  }

  applyDiscount(total: number, nights: number): number {
    if (nights >= 7) return total * 0.9;
    if (nights >= 3) return total * 0.95;
    return total;
  }
}
