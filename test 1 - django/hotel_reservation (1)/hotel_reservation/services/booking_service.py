from datetime import date
from decimal import Decimal
from django.db import transaction
from rooms.models import Room
from bookings.models import Booking


class BookingService:
    """Core business logic for reservations."""

    @classmethod
    def get_available_rooms(cls, check_in, check_out, room_type=None):
        """Find rooms not booked during the given dates."""
        booked_ids = Booking.objects.filter(
            check_in__lt=check_out,
            check_out__gt=check_in,
            status="confirmed",
        ).values_list("room_id", flat=True)

        qs = Room.objects.filter(is_available=True).exclude(id__in=booked_ids)
        if room_type:
            qs = qs.filter(room_type=room_type)
        return qs

    @classmethod
    def calculate_price(cls, room, check_in, check_out):
        """Calculate total price for a stay."""
        nights = (check_out - check_in).days
        if nights <= 0:
            raise ValueError("Check-out must be after check-in.")
        total = room.price_per_night * nights
        # 10% discount for 7+ nights
        if nights >= 7:
            total *= Decimal("0.90")
        return total.quantize(Decimal("0.01"))

    @classmethod
    @transaction.atomic
    def create_booking(cls, user, room, check_in, check_out, guests_count=1):
        """Create a booking after validating availability."""
        if check_in < date.today():
            raise ValueError("Check-in cannot be in the past.")
        if guests_count > room.capacity:
            raise ValueError(f"Room capacity is {room.capacity} guests.")

        available = cls.get_available_rooms(check_in, check_out)
        if not available.filter(id=room.id).exists():
            raise ValueError("Room is not available for those dates.")

        total = cls.calculate_price(room, check_in, check_out)

        return Booking.objects.create(
            guest=user,
            room=room,
            check_in=check_in,
            check_out=check_out,
            guests_count=guests_count,
            total_price=total,
        )

    @classmethod
    def cancel_booking(cls, booking):
        """Cancel a booking."""
        if booking.status == "cancelled":
            raise ValueError("Booking is already cancelled.")
        booking.status = "cancelled"
        booking.save()
        return booking
