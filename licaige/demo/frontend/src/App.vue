<template>
  <!-- <el-menu :router="true" :default-active="$route.path" mode="horizontal">
    <el-menu-item index="/">Home</el-menu-item>
    <el-menu-item index="/editor">Editor Demo</el-menu-item>
    <el-menu-item index="/terminal">Terminal Demo</el-menu-item>
  </el-menu> -->
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

router-view {
  margin-top: 0;
}
</style>
