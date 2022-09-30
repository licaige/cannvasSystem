<!--
 * @Author: zhoulei0232
 * @Date: 2021-12-31 13:25:45
 * @LastEditTime: 2022-01-03 22:15:09
 * @LastEditors: zhoulei0232
 * @Description: 
-->
<template>
  <div id="app">
    <CanvasRoadCom
      :c-width="canvasWidth"
      :c-height="canvasHeight"
      :list="list"
    />
  </div>
</template>

<script>
import CanvasRoadCom from "./components/canvas/index.vue";

export default {
  name: "App",
  components: {
    CanvasRoadCom,
  },
  data() {
    return {
      canvasWidth: 1000,
      canvasHeight: 1000,
      list: [
        {
          type: "baseBox",
          color:'yellow',
          borderColor:'yellow',
          data: [
            [
              [100, 100],
              [100, 900],
              [900, 900],
              [800, 300],
              [700, 100],
            ]
          ],
        },
      ],
    };
  },
  mounted() {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
