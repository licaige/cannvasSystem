import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/text.scss";
//改变font-size
import "@/util/rem.js";
// css格式化文件
// import "normalize.css";
// css工程化样式统一管理
// import "./assets/layoutStyle/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this; //全局总线，这样就可以子与子，父亲与孙子之间通信
  },
}).$mount("#app");
