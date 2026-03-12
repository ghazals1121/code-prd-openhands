class Reservation < ApplicationRecord
  STATUSES = %w[pending confirmed cancelled completed].freeze
  belongs_to :user
  belongs_to :room
  validates :check_in, :check_out, presence: true
  validate :check_out_after_check_in
  validate :room_availability
  scope :active, -> { where(status: %w[pending confirmed]) }
  before_create :calculate_total_price
  private
  def check_out_after_check_in
    errors.add(:check_out, "must be after check-in") if check_out <= check_in
  end
  def room_availability
    errors.add(:room, "is not available") unless room.available_for?(check_in, check_out)
  end
  def calculate_total_price
    nights = (check_out - check_in).to_i
    base = room.price_per_night * nights
    self.total_price = ReservationPricingService.apply_discount(base, nights)
  end
end
