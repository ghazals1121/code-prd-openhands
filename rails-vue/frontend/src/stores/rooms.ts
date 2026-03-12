import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
export const useRoomsStore = defineStore("rooms", () => {
  const rooms = ref([]);
  const currentRoom = ref(null);
  const fetchRooms = async (filters = {}) => {
    const res = await axios.get("/api/v1/rooms", { params: filters });
    rooms.value = res.data;
  };
  const fetchRoom = async (id: number) => {
    const res = await axios.get(`/api/v1/rooms/${id}`);
    currentRoom.value = res.data;
  };
  return { rooms, currentRoom, fetchRooms, fetchRoom };
});
