from django.urls import path
from . import api_views

urlpatterns = [
    path("rooms/", api_views.room_list_api, name="api-rooms"),
    path("bookings/", api_views.my_bookings_api, name="api-bookings"),
    path("bookings/create/", api_views.create_booking_api, name="api-create-booking"),
    path("bookings/<int:pk>/cancel/", api_views.cancel_booking_api, name="api-cancel-booking"),
]
