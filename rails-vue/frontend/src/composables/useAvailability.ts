import { ref } from "vue";
import axios from "axios";
export function useAvailability() {
  const availableRooms = ref([]);
  const isLoading = ref(false);
  const checkAvailability = async (checkIn: string, checkOut: string) => {
    isLoading.value = true;
    const res = await axios.get("/api/v1/rooms", { params: { check_in: checkIn, check_out: checkOut } });
    availableRooms.value = res.data;
    isLoading.value = false;
  };
  return { availableRooms, isLoading, checkAvailability };
}
