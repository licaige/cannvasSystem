import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//默认路由
export const routes = [
  {
    path: "/",
    redirect: "/home",
  },
];
//pc端的路由
export const pcRoutes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home/pc.vue"),
  },
];
//移动端设备路由
export const mobileRoutes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home/mobile.vue"),
  },
];

const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    mode: "history",
    routes: routes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
