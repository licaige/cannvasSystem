<template>
  <div class="box">
    <canvas id="canvas-sou" height="600" width="600"></canvas>
    <canvas id="canvas-des" height="600" width="600"></canvas>
  </div>
</template>

<script setup>
  import { onMounted, reactive, watch } from "vue";
  import { random, randomRGB, drawStar } from "@/utils";
  import Img from '@/assets/img/fj.jpeg'
  let canvasSou, souCtx, canvasDes, desCtx;
  let imgData;
  
  function drawImg() {
    const img = new Image();
    img.src = Img;
    img.onload = (e) => {
      souCtx.drawImage(img, 0, 0, canvasSou.width, canvasSou.height);
      imgData =  souCtx.getImageData(0, 0, canvasSou.width, canvasSou.height);
    }
  }
  function drawDes() {
    let {width: w, height: h} = canvasSou;
    let data = imgData.data;
    let len = w * h
    for(let i = 0; i < len; i++) {
      // rgba
      let r = data[i * 4 + 0]
      let g = data[i * 4 + 1]
      let b = data[i * 4 + 2]
      // data[i * 4 + 0] =  data[i * 4 + 0] / 2;
      // data[i * 4 + 1] = data[i * 4 + 1] / 2;
      // data[i * 4 + 2] = data[i * 4 + 2] / 2;
      let gray = 0.3 * r + 0.59 * g + 0.11 * b;
      data[i * 4 + 0] = gray;
      data[i * 4 + 1] = gray;
      data[i * 4 + 2] = gray;
      data[i * 4 + 3] = gray;
    }
    desCtx.putImageData(imgData, 0, 0);
  }

  onMounted(() => {
    canvasSou = document.querySelector('#canvas-sou');
    souCtx = canvasSou.getContext('2d');
    canvasDes = document.querySelector('#canvas-des');
    desCtx = canvasDes.getContext('2d');
    drawImg();
    // drawDes(imgData);
    setTimeout(() => {
      // console.log(imgData);
      drawDes();
    }, 1000);
  });
</script>

<style scoped>
.box {
  display: flex;
  justify-content: space-between;
}
</style>
