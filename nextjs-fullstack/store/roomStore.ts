import { create } from "zustand";
interface RoomFilters { type?: string; minPrice?: number; maxPrice?: number; }
interface RoomStore {
  rooms: any[]; filters: RoomFilters;
  fetchRooms: (f: RoomFilters) => void;
  setFilters: (f: RoomFilters) => void;
}
export const useRoomStore = create<RoomStore>((set) => ({
  rooms: [], filters: {},
  fetchRooms: async (filters) => {
    const params = new URLSearchParams(filters as any);
    const res = await fetch(`/api/rooms?${params}`);
    set({ rooms: await res.json() });
  },
  setFilters: (filters) => set({ filters }),
}));
