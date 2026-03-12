<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">My Dashboard</h1>
    <ReservationList :reservations="store.reservations" @cancel="store.cancelReservation($event)" />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useReservationsStore } from "../stores/reservations";
import ReservationList from "../components/reservations/ReservationList.vue";
const store = useReservationsStore();
onMounted(() => store.fetchReservations());
</script>
