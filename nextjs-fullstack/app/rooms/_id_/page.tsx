import { prisma } from "@/lib/prisma";
import { RoomDetail } from "@/components/rooms/RoomDetail";
import { ReservationForm } from "@/components/reservations/ReservationForm";
export default async function RoomPage({ params }: { params: { id: string } }) {
  const room = await prisma.room.findUnique({ where: { id: params.id } });
  return (
    <div className="max-w-4xl mx-auto p-8">
      <RoomDetail room={room!} />
      <ReservationForm roomId={room!.id} pricePerNight={room!.pricePerNight} />
    </div>
  );
}
