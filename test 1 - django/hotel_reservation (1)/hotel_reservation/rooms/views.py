from django.shortcuts import render, get_object_or_404
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.shortcuts import redirect
from django.contrib import messages
from rooms.models import Room


def home(request):
    rooms = Room.objects.filter(is_available=True)[:6]
    return render(request, "home.html", {"rooms": rooms})


def room_detail(request, pk):
    room = get_object_or_404(Room, pk=pk)
    return render(request, "room_detail.html", {"room": room})


def login_view(request):
    if request.method == "POST":
        user = authenticate(request, username=request.POST["username"], password=request.POST["password"])
        if user:
            login(request, user)
            return redirect("home")
        messages.error(request, "Invalid credentials.")
    return render(request, "login.html")


def register_view(request):
    if request.method == "POST":
        user = User.objects.create_user(
            username=request.POST["username"],
            email=request.POST["email"],
            password=request.POST["password"],
        )
        login(request, user)
        return redirect("home")
    return render(request, "register.html")


def logout_view(request):
    logout(request)
    return redirect("home")
