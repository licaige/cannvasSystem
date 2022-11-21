import Vue from "vue";
import VueRouter from "vue-router";
import { isMobile } from "@/util/isMobile";
import { pcRoutes } from "./pcRoutes";
import { mobileRoutes } from "./mobileRoutes";
Vue.use(VueRouter);
let routes = [];
if (isMobile()) {
  console.log("0000isMobile()", isMobile());
  routes = [...mobileRoutes];
} else {
  console.log("11111isMobile()", isMobile());
  routes = [...pcRoutes];
}
console.log("routes 李琦", routes);
const router = new VueRouter({
  routes,
});
// 解决footer在当前页面点击出错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
