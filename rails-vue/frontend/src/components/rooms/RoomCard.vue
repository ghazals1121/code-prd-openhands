<template>
  <div class="rounded-lg border shadow p-4">
    <h3 class="font-semibold">{{ room.room_type }} - Room {{ room.number }}</h3>
    <p class="text-gray-600">${{ room.price_per_night }}/night</p>
    <p class="text-sm">Capacity: {{ room.capacity }}</p>
    <router-link :to="`/rooms/${room.id}`" class="mt-2 inline-block bg-blue-600 text-white px-4 py-1 rounded">Book Now</router-link>
  </div>
</template>
<script setup lang="ts">
defineProps<{ room: any }>();
</script>
