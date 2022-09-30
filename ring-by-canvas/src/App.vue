<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">\ -->
    <!-- <h2>{{ message }}</h2> -->
    <!-- <h2>{{ $store.state.count }}</h2> -->
    <!-- <button @click="addCount">+</button> -->
    <HelloVuex />
    <div class="order-chart-ring">
      <div class="ring-label">
        <span class="ring-label-1">已读</span>
        <span class="ring-label-2">未读</span>
      </div>
      <div class="ring">
        <div
          v-for="item in canvasData"
          :key="item.canvasId"
          style="display:flex;"
        >
          <schart
            :canvasId="item.canvasId"
            :type="item.type"
            :width="item.width"
            :height="item.height"
            :data="item.data"
            :options="item.options"
            :centerText="item.centerText"
          ></schart>
          <div style="width:15px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelloVuex from "./components/HelloVuex.vue";
import schart from "./components/DrawPie.vue";

export default {
  name: "App",
  components: {
    HelloVuex,
    schart,
  },
  data () {
    return {
      message: "Hello",
      canvasData: [
        {
          canvasId: "myCanvas1",
          type: "ring",
          width: 200,
          height: 200,
          centerText: "",
          data: [
            { name: "已读", value: 233 },
            { name: "未读", value: 669 },
          ],
          options: {
            radius: 63, // 环形图外圆半径
            innerRadius: 41, // 环形图内圆半径
          },
        },
        {
          canvasId: "myCanvas2",
          type: "ring",
          width: 200,
          height: 200,
          centerText: "接收信息读取情况",
          data: [
            { name: "已读", value: 24 },
            { name: "未读", value: 14 },
          ],
          options: {
            radius: 63, // 环形图外圆半径
            innerRadius: 41, // 环形图内圆半径
          },
        },
      ],
    };
  },
  methods: {
    addCount () {
      this.$store.commit("increment");
    },
  },
};
</script>

<style  lang="scss" scope>
body {
  background-color: rgb(18, 30, 34);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.order-chart {
  display: flex;
  flex-direction: row;
  &-ring {
    width: 37.6rem;
    text-align: start;
    padding-top: 1.2rem;
    .ring-label {
      display: flex;
      flex-direction: row;
      justify-content: start;
      > span {
        display: flex;
        justify-content: start;
        align-items: center;
      }
    }
    .ring-label-1 {
      margin-right: 2rem;
      color: rgba(212, 229, 243, 0.911);
      &::before {
        content: "";
        display: inline-block;
        height: 1.4rem;
        width: 1.4rem;
        border-radius: 2px;
        background: #017f8c;
        margin-right: 1rem;
      }
    }
    .ring-label-2 {
      display: inline-block;
      color: rgba(212, 229, 243, 0.911);
      &::before {
        content: "";
        display: inline-block;
        height: 1.4rem;
        width: 1.4rem;
        border-radius: 2px;
        background: #53fffd;
        margin-right: 1rem;
      }
    }
    .ring {
      display: flex;
      height: 18.6rem;
      width: 100%;
      // background: url("../../assets/imgs/chart-ring.png") no-repeat center;
      background-size: 37.6rem 13.4rem;
    }
  }
  &-square {
    width: calc(100% - 37.6rem);
    box-sizing: border-box;
    padding: 5.2rem 0 0 3rem;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
  }
}
</style>
