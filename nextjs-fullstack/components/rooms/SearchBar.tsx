"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function SearchBar() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const router = useRouter();
  return (
    <div className="flex gap-4 p-6 bg-white shadow-lg rounded-xl max-w-2xl mx-auto -mt-8 relative z-10">
      <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="flex-1 border p-2 rounded" />
      <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="flex-1 border p-2 rounded" />
      <button onClick={() => router.push(`/rooms?checkIn=${checkIn}&checkOut=${checkOut}`)} className="bg-blue-600 text-white px-6 rounded">Search</button>
    </div>
  );
}
