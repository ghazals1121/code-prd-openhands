from rest_framework import generics, filters
from rest_framework.permissions import AllowAny
from .models import Room
from .serializers import RoomSerializer
class RoomListView(generics.ListAPIView):
    queryset = Room.objects.filter(is_available=True)
    serializer_class = RoomSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ["number", "room_type"]
class RoomDetailView(generics.RetrieveAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [AllowAny]
