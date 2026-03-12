import { createRouter, createWebHistory } from "vue-router";
const routes = [
  { path: "/", component: () => import("../views/HomeView.vue") },
  { path: "/rooms", component: () => import("../views/RoomsView.vue") },
  { path: "/rooms/:id", component: () => import("../views/RoomDetailView.vue") },
  { path: "/dashboard", component: () => import("../views/DashboardView.vue"), meta: { requiresAuth: true } },
  { path: "/login", component: () => import("../views/LoginView.vue") },
];
export const router = createRouter({ history: createWebHistory(), routes });
router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) next("/login");
  else next();
});
