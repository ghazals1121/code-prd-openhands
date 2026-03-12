import { useReservationStore } from "../../store/reservationStore";
export function ReservationList() {
  const { reservations } = useReservationStore();
  return (
    <div>
      {reservations.map((r: any) => (
        <div key={r.id} className="border p-4 rounded mb-2">
          Room: {r.room_detail?.number} | {r.check_in} → {r.check_out} | {r.status}
        </div>
      ))}
    </div>
  );
}
