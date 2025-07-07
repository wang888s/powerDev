import router from "./index";
import { useUserStore } from "@/store/auth";
// import { ro } from "element-plus/es/locales.mjs";
router.beforeEach((to, from) => {
  const userStore = useUserStore();
  const isLogin = userStore.token;

  if (!isLogin) {
    //未登录
    if (to.path !== "/login") {
      return { path: "/login" }
    }
  } else {
    //登录
    if (to.path === "/login") {
      return { path: "/" }
    }

    if (to.meta?.needAuth && !userStore.roles.some((role: string) => (to.meta.needAuth as string[]).includes(role))) {
      return { path: "/" }
    }


  }
});