<template>
  <div>
    <canvas id="canvas-polyline" height="400" width="400"></canvas>
  </div>
</template>

<script setup>
  import { onMounted } from "vue";
  import { random, randomRGB } from "@/utils";
  let data = [
    {
      name: '应届',
      val: 28
    },
    {
      name: '毕业2年',
      val: 12
    },
    {
      name: '其他',
      val: 20
    }
  ];
  function deg(num) {
    return num * Math.PI / 180;
  }
  onMounted(() => {
    let cas = document.querySelector('#canvas-polyline');
    let ctx = cas.getContext('2d');
    // 边
    ctx.beginPath();
    ctx.moveTo(20, 370);
    ctx.lineTo(380, 370);
    let arrowL = 8;
    ctx.lineTo(380 - arrowL * Math.cos(Math.PI/6), 370 - arrowL * Math.sin(Math.PI/6));
    ctx.moveTo(380, 370);
    ctx.lineTo(380 - arrowL * Math.cos(Math.PI/6), 370 + arrowL * Math.sin(Math.PI/6));
    ctx.moveTo(20, 370);
    ctx.lineTo(20, 20);
    ctx.lineTo(20 + arrowL * Math.sin(Math.PI/6), 20 + arrowL * Math.cos(Math.PI/6));
    ctx.moveTo(20, 20);
    ctx.lineTo(20 - arrowL * Math.sin(Math.PI/6), 20 + arrowL * Math.cos(Math.PI/6));
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'black';
    ctx.stroke();
    let xStart = 20;
    let yStart = 370;
    // y轴
    Array.from({length: 4}, (v, i) => {
      ctx.beginPath();
      let index = i + 1;
      ctx.moveTo(xStart, index * 100 - 30);
      ctx.lineTo(xStart + 5, index * 100 - 30);
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.textAlign = 'end'
      ctx.fillText((4 -index) * 10,xStart - 5, index * 100 - 30);
    })
    // x轴
    data.forEach((v, i) => {
      ctx.beginPath();
      let index = i + 1;
      ctx.moveTo(index * 100 + 20, yStart);
      ctx.lineTo(index * 100 + 20, yStart - 5);
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.textBaseline = 'bottom';
      ctx.textAlign = 'center'
      ctx.fillText(v.name ,index * 100 + 20, yStart + 15);
    })
    // 折线
    ctx.beginPath();
    data.forEach((o, i) => {
      let index = i + 1;
      let x = index * 100 + 20;
      let y = 370 - o.val * 10;
      // ctx.beginPath();
      if(i === 0) {
        ctx.moveTo(x, y);
      }else{
        ctx.lineTo(x, y)
      }
    });
    ctx.strokeStyle = randomRGB();
    ctx.lineWidth = 5;
    ctx.stroke();

    // 点
    ctx.beginPath();
    ctx.strokeStyle = 'pink'
    data.forEach((o, i) => {
      let index = i + 1;
      let x = index * 100 + 20;
      let y = 370 - o.val * 10;
      ctx.moveTo(x, y);
      ctx.arc(x, y, 5, 0, 2*Math.PI)
      ctx.stroke();
    });
    ctx.beginPath();
    data.forEach((o, i) => {
      let index = i + 1;
      let x = index * 100 + 20;
      let y = 370 - o.val * 10;
      ctx.moveTo(x, y);
      ctx.font = "18px serif";
      ctx.textAlign = 'start'
      ctx.fillText(`${o.name}-${o.val}` , x, y - 10);
      ctx.stroke();
    });

  });



</script>

<style scoped>

</style>
