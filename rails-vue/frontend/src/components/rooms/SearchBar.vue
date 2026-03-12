<template>
  <div class="flex gap-4 p-6 bg-white shadow-lg rounded-xl max-w-2xl mx-auto">
    <input type="date" v-model="checkIn" class="flex-1 border p-2 rounded" />
    <input type="date" v-model="checkOut" class="flex-1 border p-2 rounded" />
    <button @click="$emit('search', { check_in: checkIn, check_out: checkOut })" class="bg-blue-600 text-white px-6 rounded">Search</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const checkIn = ref(""); const checkOut = ref("");
defineEmits(["search"]);
</script>
