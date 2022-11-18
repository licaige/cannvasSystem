import router from "./router";
import { isMobile } from "./utils";
import { pcRoutes, mobileRoutes } from "./router";

// 判断当前设备的型号从而改变当前路由
router.addRoute(isMobile() ? mobileRoutes[1] : pcRoutes[1]);

