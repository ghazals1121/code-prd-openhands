import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
export const useReservationsStore = defineStore("reservations", () => {
  const reservations = ref([]);
  const fetchReservations = async () => {
    const res = await axios.get("/api/v1/reservations");
    reservations.value = res.data;
  };
  const createReservation = async (data: { room_id: number; check_in: string; check_out: string }) => {
    const res = await axios.post("/api/v1/reservations", { reservation: data });
    reservations.value.push(res.data);
    return res.data;
  };
  const cancelReservation = async (id: number) => {
    await axios.delete(`/api/v1/reservations/${id}`);
    const idx = reservations.value.findIndex((r: any) => r.id === id);
    if (idx > -1) (reservations.value[idx] as any).status = "cancelled";
  };
  return { reservations, fetchReservations, createReservation, cancelReservation };
});
