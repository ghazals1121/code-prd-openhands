<template>
  <aside class="w-64">
    <h2 class="font-bold mb-4">Filters</h2>
    <select @change="$emit('filter', { room_type: ($event.target as HTMLSelectElement).value })" class="w-full border p-2">
      <option value="">All Types</option>
      <option value="single">Single</option>
      <option value="double">Double</option>
      <option value="suite">Suite</option>
    </select>
  </aside>
</template>
<script setup lang="ts">
defineEmits(["filter"]);
</script>
