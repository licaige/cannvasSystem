import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import JsonTest from "./template.vue";

// 获取json文件夹下面的文件名，组装成路由
function getJsonRouter() {
  const reqObj = require.context("../json", true, /layout.json/);
  let folderList = reqObj.keys().map((str) => {
    const regObj = str.match(/\.\/([a-zA-Z0-9_]+)\/layout.json/);
    if (regObj && regObj.length) return regObj[1];
  });
  folderList = folderList.filter((item) => item !== undefined);
  folderList = Array.from(new Set(folderList));
  return folderList.map((str) => {
    if (!str) return;
    return {
      path: `/${str}`,
      name: `${str.charAt(0).toUpperCase() + str.slice(1)}`,
      component: JsonTest,
    };
  });
}

export const jsonRouters = getJsonRouter()

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];
routes.push(...(jsonRouters as Array<RouteRecordRaw>));

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
