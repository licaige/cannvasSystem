<template>
  <div id="app">
    <div class="cs-nav">
      <nav-bar></nav-bar>
    </div>
    <div class="cs-bg">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import NavBar from './components/NavBar'

  export default {
    name: 'App',
    components: { NavBar },
  }
</script>

<style>
  html, body {
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
  }

  .cs-nav {
    position: fixed;
    left: 0;
    top: 0;
    width: 150px;
  }
</style>
