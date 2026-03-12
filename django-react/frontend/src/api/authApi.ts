import axios from "./client";
export const authApi = {
  login: (email: string, password: string) => axios.post("/api/auth/login/", { email, password }),
  register: (data: { email: string; password: string; first_name: string; last_name: string }) => axios.post("/api/auth/register/", data),
  getProfile: () => axios.get("/api/auth/profile/"),
};
