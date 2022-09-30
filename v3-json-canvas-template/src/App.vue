<template>
  <div id="nav">
    <h3>本地路由</h3>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <h3>json路由</h3>
    <router-link :to="item.path" v-for="item in routerList" :key="item.name">{{
      item.name
    }}</router-link>
  </div>
  <div class="page-con">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { jsonRouters } from "@/router";
export default defineComponent({
  name: "App",
  setup() {
    return {
      routerList: jsonRouters,
    };
  },
});
</script>

<style lang="scss">
#nav {
  flex: 0 0 200px;
  width: 200px;
  display: flex;
  position: fixed;
  flex-direction: column;
  top: 0;
  left: 0;
  height: 100vh;
  text-align: left;
  overflow-y: auto;
  box-sizing: border-box;
  border-right: 1px solid #ddd;
  text-indent: 20px;
  a {
    line-height: 50px;
    border-bottom: 1px solid #ddd;
  }
  h3 {
    color: #999;
  }
}
.page-con {
  flex: 1;
  margin-left: 200px;
}
</style>
