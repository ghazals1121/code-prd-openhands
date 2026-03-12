"use client";
import { useEffect, useState } from "react";
export function ReservationList() {
  const [reservations, setReservations] = useState([]);
  useEffect(() => { fetch("/api/reservations").then(r => r.json()).then(setReservations); }, []);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Reservations</h2>
      {reservations.map((r: any) => (
        <div key={r.id} className="border p-4 rounded mb-2">
          <p>Room: {r.room?.number} | Check-in: {r.checkIn} | Status: <span className="font-semibold">{r.status}</span></p>
        </div>
      ))}
    </div>
  );
}
