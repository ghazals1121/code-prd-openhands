import { z } from "zod";
export const reservationSchema = z.object({
  roomId: z.string().cuid(),
  checkIn: z.string().datetime(),
  checkOut: z.string().datetime(),
}).refine(d => new Date(d.checkOut) > new Date(d.checkIn), { message: "Check-out must be after check-in" });
export const userSchema = z.object({ email: z.string().email(), password: z.string().min(8), name: z.string().min(1) });
