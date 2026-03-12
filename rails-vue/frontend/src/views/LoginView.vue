<template>
  <div class="max-w-md mx-auto mt-20 p-8 border rounded">
    <h1 class="text-2xl font-bold mb-6">Login</h1>
    <input v-model="email" type="email" placeholder="Email" class="w-full border p-2 mb-4" />
    <input v-model="password" type="password" placeholder="Password" class="w-full border p-2 mb-4" />
    <button @click="handleLogin" class="w-full bg-blue-600 text-white py-2 rounded">Login</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
const email = ref(""); const password = ref("");
const auth = useAuthStore(); const router = useRouter();
const handleLogin = async () => { await auth.login(email.value, password.value); router.push("/dashboard"); };
</script>
