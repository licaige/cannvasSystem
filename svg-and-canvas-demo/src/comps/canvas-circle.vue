<template>
  <div>
    <canvas id="canvas-circle" height="400" width="400"></canvas>
  </div>
</template>

<script setup>
  import { onMounted } from "vue";
  import { random, randomRGB } from "@/utils";
  let data = [
    {
      name: '应届',
      val: 50
    },
    {
      name: '毕业2年',
      val: 124
    },
    {
      name: '毕业5年',
      val: 134
    },
    {
      name: '其他',
      val: 234
    }
  ];
  function deg(num) {
    return num * Math.PI / 180;
  }
  onMounted(() => {
    let cas = document.querySelector('#canvas-circle');
    let ctx = cas.getContext('2d');
    let total = data.reduce((acc, item) => acc += item.val, 0);
    // let total = 200
    let originDeg = deg(-90);
    let cx = 200;
    let cy = 200;
    let r = 100;
    let br = 120; 
    // ctx.strokeStyle = 'red';
    ctx.strokeStyle = 'transparent';
    ctx.arc(cx, cy, r, deg(0), deg(360))
    ctx.stroke();

    // 
    data.reduce((pre, item) => {
      let color = `${randomRGB()}`;
      let endDeg = pre + item.val / total * 2 * Math.PI;
      // line
      ctx.beginPath();
      ctx.fillStyle = 'black';
      ctx.moveTo(cx, cy);
      let tdeg = (pre + endDeg) / 2;
      let tx = cx + br * Math.cos(tdeg);
      let ty = cy + br * Math.sin(tdeg);
      ctx.lineTo(tx, ty);
      ctx.strokeStyle = 'black';
      if(Math.PI / 2 < tdeg && tdeg < 2 * Math.PI) {
        ctx.textAlign = 'end';
      }
      ctx.stroke();
      ctx.fillText(`${item.name} (${item.val}%)`, tx, ty);
      ctx.closePath();

      // arc
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.fillStyle = color
      ctx.arc(cx, cy, r, pre, endDeg)
      ctx.closePath()
      ctx.fill();
      return endDeg
    }, originDeg);

  });



</script>

<style scoped>

</style>
