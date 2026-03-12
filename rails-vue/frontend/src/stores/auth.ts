import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("token"));
  const login = async (email: string, password: string) => {
    const res = await axios.post("/api/v1/users/sign_in", { user: { email, password } });
    token.value = res.headers["authorization"].replace("Bearer ", "");
    localStorage.setItem("token", token.value!);
    user.value = res.data.user;
  };
  const logout = () => { token.value = null; localStorage.removeItem("token"); };
  return { user, token, login, logout };
});
