"use client";
import { useEffect } from "react";
import { RoomCard } from "@/components/rooms/RoomCard";
import { RoomFilters } from "@/components/rooms/RoomFilters";
import { useRoomStore } from "@/store/roomStore";
export default function RoomsPage() {
  const { rooms, fetchRooms, filters } = useRoomStore();
  useEffect(() => { fetchRooms(filters); }, [filters]);
  return (
    <div className="flex gap-6 p-8">
      <RoomFilters />
      <div className="grid grid-cols-3 gap-4">
        {rooms.map(room => <RoomCard key={room.id} room={room} />)}
      </div>
    </div>
  );
}
