class ReservationPricingService
  def self.calculate(price_per_night, check_in, check_out)
    nights = (check_out - check_in).to_i
    base = price_per_night * nights
    apply_discount(base, nights)
  end
  def self.apply_discount(total, nights)
    return total * 0.90 if nights >= 7
    return total * 0.95 if nights >= 3
    total
  end
end
