import { create } from "zustand";
import { reservationsApi } from "../api/reservationsApi";
interface ReservationStore { reservations: any[]; fetchReservations: () => void; }
export const useReservationStore = create<ReservationStore>((set) => ({
  reservations: [],
  fetchReservations: async () => {
    const res = await reservationsApi.list();
    set({ reservations: res.data });
  },
}));
