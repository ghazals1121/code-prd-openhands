import axios from "./client";
export const reservationsApi = {
  list: () => axios.get("/api/reservations/"),
  create: (data: { room: number; check_in: string; check_out: string }) => axios.post("/api/reservations/", data),
  cancel: (id: number) => axios.delete(`/api/reservations/${id}/`),
};
