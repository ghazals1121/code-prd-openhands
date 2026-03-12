import { useEffect, useState } from "react";
import { roomsApi } from "../api/roomsApi";
import { RoomCard } from "../components/rooms/RoomCard";
import { RoomFilters } from "../components/rooms/RoomFilters";
export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => { roomsApi.list().then(r => setRooms(r.data)); }, []);
  return (
    <div className="flex gap-6 p-8">
      <RoomFilters onFilter={f => roomsApi.list(f).then(r => setRooms(r.data))} />
      <div className="grid grid-cols-3 gap-4">{rooms.map((r: any) => <RoomCard key={r.id} room={r} />)}</div>
    </div>
  );
}
