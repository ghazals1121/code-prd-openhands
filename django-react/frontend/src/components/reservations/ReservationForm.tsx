import { useState } from "react";
import { reservationsApi } from "../../api/reservationsApi";
import { useNavigate } from "react-router-dom";
export function ReservationForm({ roomId }: { roomId: number }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const navigate = useNavigate();
  const handleBook = async () => {
    await reservationsApi.create({ room: roomId, check_in: checkIn, check_out: checkOut });
    navigate("/dashboard");
  };
  return (
    <div className="mt-6 border rounded p-4">
      <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
      <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
      <button onClick={handleBook} className="bg-green-600 text-white px-6 py-2 rounded">Reserve</button>
    </div>
  );
}
