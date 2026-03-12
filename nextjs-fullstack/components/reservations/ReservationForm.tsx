"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function ReservationForm({ roomId, pricePerNight }: { roomId: string; pricePerNight: number }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    const res = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, checkIn, checkOut }),
    });
    if (res.ok) router.push("/dashboard");
  };
  return (
    <div className="mt-6 border rounded p-4">
      <h3 className="font-semibold mb-4">Book This Room</h3>
      <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="border p-2 mr-2" />
      <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="border p-2 mr-2" />
      <button onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded">Reserve</button>
    </div>
  );
}
