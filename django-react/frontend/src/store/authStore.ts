import { create } from "zustand";
import { authApi } from "../api/authApi";
interface AuthStore { user: any; token: string | null; login: (e: string, p: string) => Promise<void>; logout: () => void; }
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem("access_token"),
  login: async (email, password) => {
    const res = await authApi.login(email, password);
    localStorage.setItem("access_token", res.data.access);
    set({ token: res.data.access });
  },
  logout: () => { localStorage.removeItem("access_token"); set({ user: null, token: null }); },
}));
