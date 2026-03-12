<template>
  <div class="mt-6 border rounded p-4">
    <h3 class="font-semibold mb-4">Book This Room</h3>
    <input type="date" v-model="checkIn" class="border p-2 mr-2" />
    <input type="date" v-model="checkOut" class="border p-2 mr-2" />
    <button @click="handleBook" class="bg-green-600 text-white px-6 py-2 rounded">Reserve</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useReservationsStore } from "../../stores/reservations";
import { useRouter } from "vue-router";
const props = defineProps<{ roomId: number }>();
const checkIn = ref(""); const checkOut = ref("");
const store = useReservationsStore(); const router = useRouter();
const handleBook = async () => {
  await store.createReservation({ room_id: props.roomId, check_in: checkIn.value, check_out: checkOut.value });
  router.push("/dashboard");
};
</script>
