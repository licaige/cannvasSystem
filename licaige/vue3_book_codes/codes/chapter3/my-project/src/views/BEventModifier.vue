<template>
  <!-- 使用.stop 阻止冒泡 -->
  <div class="inner" @click="innerHandler">
    <input type="button" value="点击按钮" @click.stop="btnHandler" />
  </div>
  <!-- 使用 .prevent 阻止默认行为 -->
  <a href="https://www.cnblogs.com/jiekzou/" @click.prevent="linkClick"
    >邹琼俊 - 博客园</a
  >
  <!-- 使用 .capture 实现捕获触发事件的机制 -->
  <div class="inner" @click.capture="innerHandler">
    <input type="button" value="按钮（capture）" @click="btnHandler" />
  </div>
  <!-- 使用 .self 实现只有点击当前元素时候，才会触发事件处理函数 -->
  <div class="inner" @click.self="innerHandler">
    <input type="button" value="按钮（self）" @click="btnHandler" />
  </div>
  <!-- 使用 .once 只触发一次事件处理函数 -->
  <a href="https://www.cnblogs.com/jiekzou/" @click.prevent.once="linkClick"
    >邹琼俊 - 博客园once</a
  >
  <!-- 演示：.stop 和 .self 的区别 -->
  <div class="outer" @click="outerHandler">
    <div class="inner" @click="innerHandler">
      <input type="button" value="stop " @click.self="btnHandler" />
    </div>
  </div>
  <!-- 演示：.stop 和 .self 的区别 -->
  <div class="outer" @click="outerHandler">
    <div class="inner" @click="innerHandler">
      <input type="button" value="stop " @click.stop="btnHandler" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    innerHandler () {
      console.log('触发了inner div的点击事件')
    },
    btnHandler () {
      console.log('触发了按钮的点击事件')
    },
    linkClick () {
      console.log('触发了a标签的点击事件')
    }
  }

}
</script>
 <style>
.inner {
  height: 50px;
  background-color: lightgreen;
}
.outer {
  height: 100px;
  background-color: lightblue;
  padding: 25px;
}
</style>
