"use client";
import { useRoomStore } from "@/store/roomStore";
export function RoomFilters() {
  const { filters, setFilters } = useRoomStore();
  return (
    <aside className="w-64">
      <h2 className="font-bold mb-4">Filters</h2>
      <select onChange={e => setFilters({ ...filters, type: e.target.value })} className="w-full border p-2">
        <option value="">All Types</option>
        <option value="SINGLE">Single</option>
        <option value="DOUBLE">Double</option>
        <option value="SUITE">Suite</option>
      </select>
    </aside>
  );
}
