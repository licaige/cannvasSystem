<template>
  <div class="lignth-box">
  <div class="form">
      <span>圆环</span>
    </div>
    <svg
      id="svg"
      width="100%"
      height="100%"
      viewBox="-400 -400 800 800"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
    </svg>
  </div>
</template>
<script setup>
import gsap from "gsap";
import { onMounted, onBeforeUnmount, ref, reactive, watch } from "vue";
import { random, randomRGB } from "@/utils";
import Vector from "@/utils/vector";
const SVG_NS = "http://www.w3.org/2000/svg";
var XLINK_NS = "http://www.w3.org/1999/xlink";
let minR = 60;
let maxR = 120;

const list = [
  {
    text: '百度',
    num: 30,
    color: 'blue'
  },
  {
    text: '平安',
    num: 60,
    color: 'yellow'
  },
  {
    text: '腾讯',
    num: 40,
    color: 'pink'
  },
  {
    text: '小鹏',
    num: 8.34,
    color: 'gray'
  },
  {
    text: '大鹏',
    num: 26.3,
    color: 'green'
  }
];

function createTag(tagName, obj={}) {
  let tag = document.createElementNS(SVG_NS, tagName);
  Object.entries(obj).forEach(([k, v]) => {
    tag.setAttribute(k, v);
  });
  return tag;
}

function createCircle() {
  const svg = document.querySelector('#svg');
  let lG = createTag('g', {id: 'lG'});
  let p = createTag('path', {
    stroke: 'black',
    d: 'M 0 0, H -1000, M 0 0, H 1000, M 0 0, V -1000, M 0 0, V 1000'
  })
  let c1 = createTag('circle', {
    cx: 0,
    cy: 0,
    r: minR,
    stroke: 'red',
    fill: 'none'
  })
  let c2 = createTag('circle', {
    cx: 0,
    cy: 0,
    r: maxR,
    stroke: 'red',
    fill: 'none'
  })
  lG.appendChild(c1);
  lG.appendChild(c2);
  lG.appendChild(p);
  svg.appendChild(lG);
}
let total = list.reduce((acc, item) => acc+=item.num, 0);
function deg (n) {
  return n / total * 2 * Math.PI;
}

function createT() {
  const svg = document.querySelector('#svg');
  const cG = createTag('g', {
    id: 'cG'
  });
  // list
  
  let start = 0;
  let end = 0;
  list.forEach((item, index) => {
    end += item.num;
    let large = (end - start) > total / 2 ? 1 : 0;
    let p = createTag('path', {
      fill: `${item.color}`,
      d: `
        M ${minR * Math.sin(deg(start))} ${minR * Math.cos(deg(start))}, L ${maxR * Math.sin(deg(start))} ${maxR * Math.cos(deg(start))},
        A ${maxR} ${maxR} 0 ${large} 0 ${maxR * Math.sin(deg(end))} ${maxR * Math.cos(deg(end))},
        L ${minR * Math.sin(deg(end))} ${minR * Math.cos(deg(end))},
        A ${minR} ${minR} 0 ${large} 1 ${minR * Math.sin(deg(start))} ${minR * Math.cos(deg(start))} z
      `
    });
    start += item.num;
    cG.appendChild(p);
  });
  svg.appendChild(cG);
}


const options = reactive(Array.from({length: 20}, (v, i) => i+2));
const num = ref(6);
    
onMounted(() => {
  createCircle();
  createT();
});
onBeforeUnmount(() => {
  // cancelAnimationFrame(reqAniId);
})




</script>
<style scoped>
.lignth-box {
  position: relative;
  height: 100%;
  font-size: 0;
  line-height: 0;
}
.lignth-box .form {
  position: absolute;
  top: 6px;
  left: 50%;
  width: 400px;
  transform: translateX(-50%);
  display: flex;
  font-size: 20px;
  line-height: 20px;
}
.lignth-box .form span {
  margin-right: 12px;
}
</style>
