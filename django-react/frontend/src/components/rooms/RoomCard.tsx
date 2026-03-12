import { Link } from "react-router-dom";
export function RoomCard({ room }: { room: any }) {
  return (
    <div className="rounded-lg border shadow p-4">
      <h3 className="font-semibold">{room.room_type} - Room {room.number}</h3>
      <p>${room.price_per_night}/night | Capacity: {room.capacity}</p>
      <Link to={`/rooms/${room.id}`} className="mt-2 inline-block bg-blue-600 text-white px-4 py-1 rounded">Book Now</Link>
    </div>
  );
}
