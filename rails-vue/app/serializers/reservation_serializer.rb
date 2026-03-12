class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :check_in, :check_out, :total_price, :status, :payment_id, :created_at
  belongs_to :room, serializer: RoomSerializer
end
