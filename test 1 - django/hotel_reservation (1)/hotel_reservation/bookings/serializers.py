from rest_framework import serializers
from rooms.models import Room
from bookings.models import Booking


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["id", "number", "room_type", "price_per_night", "capacity", "description", "is_available"]


class BookingSerializer(serializers.ModelSerializer):
    room = RoomSerializer(read_only=True)
    nights = serializers.ReadOnlyField()

    class Meta:
        model = Booking
        fields = ["id", "confirmation_code", "room", "check_in", "check_out", "guests_count", "total_price", "status", "nights"]


class CreateBookingSerializer(serializers.Serializer):
    room_id = serializers.IntegerField()
    check_in = serializers.DateField()
    check_out = serializers.DateField()
    guests_count = serializers.IntegerField(min_value=1, default=1)
