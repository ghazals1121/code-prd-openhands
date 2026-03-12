from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from rooms.models import Room
from bookings.models import Booking
from bookings.serializers import RoomSerializer, BookingSerializer, CreateBookingSerializer
from services.booking_service import BookingService


@api_view(["GET"])
@permission_classes([AllowAny])
def room_list_api(request):
    """List all rooms, optionally filtered by availability dates."""
    check_in = request.query_params.get("check_in")
    check_out = request.query_params.get("check_out")

    if check_in and check_out:
        from datetime import date
        rooms = BookingService.get_available_rooms(
            date.fromisoformat(check_in), date.fromisoformat(check_out)
        )
    else:
        rooms = Room.objects.all()

    return Response(RoomSerializer(rooms, many=True).data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_bookings_api(request):
    """List bookings for the logged-in user."""
    bookings = Booking.objects.filter(guest=request.user).select_related("room")
    return Response(BookingSerializer(bookings, many=True).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_booking_api(request):
    """Create a new booking."""
    serializer = CreateBookingSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    room = get_object_or_404(Room, id=serializer.validated_data["room_id"])

    try:
        booking = BookingService.create_booking(
            user=request.user,
            room=room,
            check_in=serializer.validated_data["check_in"],
            check_out=serializer.validated_data["check_out"],
            guests_count=serializer.validated_data["guests_count"],
        )
    except ValueError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response(BookingSerializer(booking).data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def cancel_booking_api(request, pk):
    """Cancel a booking."""
    booking = get_object_or_404(Booking, pk=pk, guest=request.user)
    try:
        BookingService.cancel_booking(booking)
    except ValueError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"message": "Booking cancelled."})
