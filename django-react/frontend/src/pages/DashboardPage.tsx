import { useEffect } from "react";
import { useReservationStore } from "../store/reservationStore";
import { ReservationList } from "../components/reservations/ReservationList";
export default function DashboardPage() {
  const { fetchReservations } = useReservationStore();
  useEffect(() => { fetchReservations(); }, []);
  return <div className="p-8"><h1 className="text-2xl font-bold mb-4">My Dashboard</h1><ReservationList /></div>;
}
