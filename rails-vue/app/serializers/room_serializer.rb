class RoomSerializer < ActiveModel::Serializer
  attributes :id, :number, :room_type, :price_per_night, :capacity, :amenities, :is_available
end
