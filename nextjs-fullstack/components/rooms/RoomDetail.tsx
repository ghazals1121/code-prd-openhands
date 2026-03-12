export function RoomDetail({ room }: { room: any }) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{room.type} Room #{room.number}</h1>
      <p className="text-2xl text-green-600 mt-2">${room.pricePerNight}/night</p>
      <p className="mt-2">Capacity: {room.capacity} guests</p>
      <ul className="mt-4 flex gap-2 flex-wrap">
        {room.amenities.map((a: string) => <li key={a} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{a}</li>)}
      </ul>
    </div>
  );
}
