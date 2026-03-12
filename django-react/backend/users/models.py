from django.contrib.auth.models import AbstractUser
from django.db import models
class User(AbstractUser):
    ROLES = [("GUEST","Guest"),("ADMIN","Admin")]
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLES, default="GUEST")
    phone = models.CharField(max_length=20, blank=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
