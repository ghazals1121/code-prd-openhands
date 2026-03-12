from decimal import Decimal
from datetime import date
from .models import Reservation

class ReservationService:
    @staticmethod
    def calculate_price(price_per_night: Decimal, check_in: date, check_out: date) -> Decimal:
        nights = (check_out - check_in).days
        total = price_per_night * nights
        if nights >= 7: total *= Decimal("0.90")
        elif nights >= 3: total *= Decimal("0.95")
        return total

    @staticmethod
    def check_availability(room, check_in: date, check_out: date) -> bool:
        return not Reservation.objects.filter(
            room=room, status__in=["PENDING","CONFIRMED"],
            check_in__lt=check_out, check_out__gt=check_in,
        ).exists()
