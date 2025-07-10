import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type NavigationGuardNext,
} from "vue-router";
import accountsRoutes from "@/app/accounts/routes";
import publicRoutes from "@/app/public/routes";
import AppLayout from "@/pkg/layouts/AppLayout.vue";
import DashboardView from "@/pkg/views/DashboardView.vue";
import LoginView from "@/pkg/views/LoginView.vue";
import AuthLayout from "@/pkg/layouts/AuthLayout.vue";
import NotFoundView from "@/pkg/views/NotFoundView.vue";
import ForbiddenView from "@/pkg/views/ForbiddenView.vue";
import ErrorLayout from "@/pkg/layouts/ErrorLayout.vue";
const appRoutes = [...accountsRoutes, ...publicRoutes];
const authMiddleWare = async (
  _: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  if (from.name != "login" && from.name != "login_owner") {
    try {
      next();
      return true;
    } catch (err: unknown) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("sidebar");
      localStorage.removeItem("roles");
      console.log("error here", err);
      next("/auth/login");
      return false;
    }
  }
  next();
};
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: AppLayout,
      redirect: "/dashboard",
      beforeEnter: authMiddleWare,
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: DashboardView,
        },
        ...appRoutes,
      ],
    },
    {
      path: "/auth/",
      component: AuthLayout,
      redirect: "/auth/login",
      children: [
        {
          path: "login",
          name: "login",
          component: LoginView,
        },
        {
          path: "reset-password-email",
          name: "reset-password-email",
          component: import("../views/ResetPasswordEmailView.vue"),
        },
        {
          path: "reset-password",
          name: "reset-password",
          component: import("../views/ResetPasswordView.vue"),
        },
        {
          path: "provider-login-callback",
          name: "provider-login-callback",
          component: import("../views/ProviderLoginCallbackView.vue"),
        },
      ],
    },
    {
      path: "/error",
      component: ErrorLayout,
      children: [
        {
          path: "403",
          name: "forbidden",
          component: ForbiddenView,
        },
        {
          path: "404",
          name: "not-found",
          component: NotFoundView,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/error/404",
    },
  ],
});

export default router;
