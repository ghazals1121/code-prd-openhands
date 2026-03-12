from django.db import models
from django.conf import settings
from rooms.models import Room
class Reservation(models.Model):
    STATUS_CHOICES = [("PENDING","Pending"),("CONFIRMED","Confirmed"),("CANCELLED","Cancelled"),("COMPLETED","Completed")]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reservations")
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="reservations")
    check_in = models.DateField()
    check_out = models.DateField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    payment_id = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
