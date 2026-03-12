from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Reservation
from .serializers import ReservationSerializer
from .services import ReservationService

class ReservationListCreateView(generics.ListCreateAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Reservation.objects.filter(user=self.request.user).select_related("room")
    def perform_create(self, serializer):
        data = serializer.validated_data
        total = ReservationService.calculate_price(data["room"].price_per_night, data["check_in"], data["check_out"])
        if not ReservationService.check_availability(data["room"], data["check_in"], data["check_out"]):
            raise Exception("Room not available")
        serializer.save(user=self.request.user, total_price=total)

class ReservationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self): return Reservation.objects.filter(user=self.request.user)
    def destroy(self, request, *args, **kwargs):
        self.get_object().update(status="CANCELLED")
        return Response(status=status.HTTP_204_NO_CONTENT)
