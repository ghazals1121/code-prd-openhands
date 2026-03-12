import axios from "./client";
export const roomsApi = {
  list: (params?: { room_type?: string; checkIn?: string; checkOut?: string }) => axios.get("/api/rooms/", { params }),
  getById: (id: number) => axios.get(`/api/rooms/${id}/`),
};
