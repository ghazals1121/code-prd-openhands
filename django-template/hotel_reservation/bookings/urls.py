from django.urls import path
from . import views

urlpatterns = [
    path("book/<int:room_id>/", views.book_room, name="book-room"),
    path("my/", views.my_bookings, name="my-bookings"),
    path("<int:pk>/cancel/", views.cancel_booking, name="cancel-booking"),
]
