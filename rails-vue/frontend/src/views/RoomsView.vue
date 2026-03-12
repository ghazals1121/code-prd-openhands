<template>
  <div class="flex gap-6 p-8">
    <RoomFilters @filter="store.fetchRooms($event)" />
    <div class="grid grid-cols-3 gap-4">
      <RoomCard v-for="room in store.rooms" :key="room.id" :room="room" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useRoomsStore } from "../stores/rooms";
import RoomCard from "../components/rooms/RoomCard.vue";
import RoomFilters from "../components/rooms/RoomFilters.vue";
const store = useRoomsStore();
onMounted(() => store.fetchRooms());
</script>
