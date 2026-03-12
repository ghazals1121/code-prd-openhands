<template>
  <div>
    <section class="h-96 bg-gradient-to-r from-blue-900 to-indigo-900 flex items-center justify-center text-white">
      <div class="text-center">
        <h1 class="text-5xl font-bold">Grand Hotel</h1>
        <p class="mt-4 text-xl">Luxury stays, unforgettable experiences</p>
      </div>
    </section>
    <SearchBar @search="handleSearch" />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import SearchBar from "../components/rooms/SearchBar.vue";
const router = useRouter();
const handleSearch = (params: any) => router.push({ path: "/rooms", query: params });
</script>
