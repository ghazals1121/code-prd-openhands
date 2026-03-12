export function calculateTotalPrice(pricePerNight: number, checkIn: Date, checkOut: Date): number {
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  return nights * pricePerNight;
}
export function applyDiscount(total: number, nights: number): number {
  if (nights >= 7) return total * 0.9;
  if (nights >= 3) return total * 0.95;
  return total;
}
