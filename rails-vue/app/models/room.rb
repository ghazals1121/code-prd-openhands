class Room < ApplicationRecord
  ROOM_TYPES = %w[single double suite penthouse].freeze
  validates :number, presence: true, uniqueness: true
  validates :room_type, inclusion: { in: ROOM_TYPES }
  validates :price_per_night, numericality: { greater_than: 0 }
  validates :capacity, numericality: { greater_than: 0 }
  has_many :reservations, dependent: :destroy
  scope :available, -> { where(is_available: true) }
  def available_for?(check_in, check_out)
    reservations.active.where("check_in < ? AND check_out > ?", check_out, check_in).none?
  end
end
