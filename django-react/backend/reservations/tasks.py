from celery import shared_task
from django.utils import timezone
from .models import Reservation

@shared_task
def send_reservation_confirmation(reservation_id: int):
    r = Reservation.objects.select_related("user","room").get(id=reservation_id)
    print(f"Confirmation sent to {r.user.email} for room {r.room.number}")

@shared_task
def cancel_expired_reservations():
    cutoff = timezone.now() - timezone.timedelta(hours=24)
    count = Reservation.objects.filter(status="PENDING", created_at__lt=cutoff).update(status="CANCELLED")
    return f"Cancelled {count} expired reservations"
