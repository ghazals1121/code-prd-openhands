from django.db import models
class Room(models.Model):
    ROOM_TYPES = [("SINGLE","Single"),("DOUBLE","Double"),("SUITE","Suite"),("PENTHOUSE","Penthouse")]
    number = models.CharField(max_length=10, unique=True)
    room_type = models.CharField(max_length=20, choices=ROOM_TYPES)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    capacity = models.PositiveIntegerField()
    amenities = models.JSONField(default=list)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return f"Room {self.number} ({self.room_type})"
