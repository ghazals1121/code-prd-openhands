<template>
  <div>
    <h2 class="text-xl font-bold mb-4">My Reservations</h2>
    <div v-for="r in reservations" :key="r.id" class="border p-4 rounded mb-2 flex justify-between">
      <span>Room: {{ r.room?.number }} | {{ r.check_in }} → {{ r.check_out }} | {{ r.status }}</span>
      <button v-if="r.status === 'pending'" @click="$emit('cancel', r.id)" class="text-red-500">Cancel</button>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ reservations: any[] }>();
defineEmits(["cancel"]);
</script>
