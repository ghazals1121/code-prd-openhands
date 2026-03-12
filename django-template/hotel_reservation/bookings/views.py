from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from datetime import date

from rooms.models import Room
from bookings.models import Booking
from services.booking_service import BookingService


@login_required
def book_room(request, room_id):
    room = get_object_or_404(Room, pk=room_id)

    if request.method == "POST":
        try:
            booking = BookingService.create_booking(
                user=request.user,
                room=room,
                check_in=date.fromisoformat(request.POST["check_in"]),
                check_out=date.fromisoformat(request.POST["check_out"]),
                guests_count=int(request.POST.get("guests", 1)),
            )
            messages.success(request, f"Booked! Code: {booking.confirmation_code}")
            return redirect("my-bookings")
        except ValueError as e:
            messages.error(request, str(e))

    return render(request, "book_room.html", {"room": room})


@login_required
def my_bookings(request):
    bookings = Booking.objects.filter(guest=request.user).select_related("room")
    return render(request, "my_bookings.html", {"bookings": bookings})


@login_required
def cancel_booking(request, pk):
    booking = get_object_or_404(Booking, pk=pk, guest=request.user)
    try:
        BookingService.cancel_booking(booking)
        messages.success(request, "Booking cancelled.")
    except ValueError as e:
        messages.error(request, str(e))
    return redirect("my-bookings")
