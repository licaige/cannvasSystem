import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Kui from "v3-json-canvas";
import "v3-json-canvas/dist/kui.css";
import "./style.scss";

createApp(App).use(store).use(Kui).use(router).mount("#app");

// Configure additional objects that need to be used in the editor
// You can also configure APIs related to axios or router here
Kui.disposeConfig.set("key", "value");
Kui.disposeConfig.set("router", router);
Kui.disposeConfig.set("store", store);

// Register additional components or labels that can be dragged by configuration
const registerObj = Kui.registerLayout();
registerObj.register("b", {
  compLabel: "b　用户注册标签",
  dropedInfo: {
    tag: "b",
    iscontainer: false,
    styleConfig: {
      position: "absolute",
      "z-index": 200,
      color: "#333",
      "font-size": 14,
      width: "auto",
      height: "auto",
    },
    attrsConfig: ["text"],
    text: "这是一个用户注册b标签",
    eventConfig: ["onClick"],
  },
});
