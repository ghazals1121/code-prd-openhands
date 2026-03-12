import Link from "next/link";
export function RoomCard({ room }: { room: any }) {
  return (
    <div className="rounded-lg border shadow p-4">
      <h3 className="font-semibold">{room.type} - Room {room.number}</h3>
      <p className="text-gray-600">${room.pricePerNight}/night</p>
      <p className="text-sm">Capacity: {room.capacity}</p>
      <Link href={`/rooms/${room.id}`} className="mt-2 inline-block bg-blue-600 text-white px-4 py-1 rounded">Book Now</Link>
    </div>
  );
}
