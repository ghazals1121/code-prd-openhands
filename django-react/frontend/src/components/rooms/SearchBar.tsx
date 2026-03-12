import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function SearchBar() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex gap-4 p-6">
      <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
      <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
      <button onClick={() => navigate(`/rooms?checkIn=${checkIn}&checkOut=${checkOut}`)}>Search</button>
    </div>
  );
}
