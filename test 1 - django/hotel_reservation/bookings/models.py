import uuid
from django.db import models
from django.contrib.auth.models import User
from rooms.models import Room


class Booking(models.Model):
    STATUS_CHOICES = [
        ("confirmed", "Confirmed"),
        ("cancelled", "Cancelled"),
    ]

    confirmation_code = models.UUIDField(default=uuid.uuid4, unique=True)
    guest = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookings")
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="bookings")
    check_in = models.DateField()
    check_out = models.DateField()
    guests_count = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="confirmed")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking {self.confirmation_code} - {self.guest.username}"

    @property
    def nights(self):
        return (self.check_out - self.check_in).days
