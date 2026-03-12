from rest_framework import serializers
from .models import Reservation
from rooms.serializers import RoomSerializer
class ReservationSerializer(serializers.ModelSerializer):
    room_detail = RoomSerializer(source="room", read_only=True)
    class Meta:
        model = Reservation
        fields = ["id","room","room_detail","check_in","check_out","total_price","status","payment_id","created_at"]
        read_only_fields = ["total_price","status","payment_id","created_at"]
