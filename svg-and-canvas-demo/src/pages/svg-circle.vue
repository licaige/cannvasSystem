<template>
  <div class="lignth-box">
  <div class="form">
      <span>控制🐈‍⬛的数量</span>
      <select v-model="num">
       <option v-for="v in options" :key="v" :value="v">{{v}}</option>
      </select>
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

function createTag(tagName, obj={}) {
  let tag = document.createElementNS(SVG_NS, tagName);
  Object.entries(obj).forEach(([k, v]) => {
    tag.setAttribute(k, v);
  });
  return tag;
}

function createCenter() {
  const svgDom = document.querySelector('svg');
  const centerG = document.querySelector('#center-g');
  if(centerG) {
    centerG.remove();
  }
  let g = createTag('g', {
    id: 'center-g'
  })
  let c = createTag('circle', {
    xmlns: SVG_NS,
    cx: 0,
    cy: 0,
    r: 70,
    fill: 'pink',
    'stroke-width': 2,
    stroke: 'red'
  });
  let x = createTag('line', {
    x1: -1000,
    y1: 0,
    x2: 1000,
    y2: 0,
    stroke: 'black'
  });
  let y = createTag('line', {
    x1: 0,
    y1: -1000,
    x2: 0,
    y2: 10000,
    stroke: 'black'
  });
  let text = createTag('text', {
    x: -20,
    y: 5,
    'font-size': 20,
    fill: 'black'
  });
  text.textContent = '主人';
  g.appendChild(c);
  // 辅助线
  // g.appendChild(x);
  // g.appendChild(y);
  g.appendChild(text);
  svgDom.appendChild(g)
}

function createSubC(n) {
  const svgDom = document.querySelector('svg');
  let subG = document.getElementById('sub-g');
  if(!subG) {
    subG = createTag('g', {
      id: 'sub-g'
    })
    svgDom.appendChild(subG);
  }else{
    subG.innerHTML = '';
  }
  let r = 200;
  let d = 2 * Math.PI / n;
  Array.from({length: n}, (v, i) => {
    // cx
    let cx = r * Math.sin(i*d);
    let cy = r * Math.cos(i*d);
    let l = createTag('line', {
      x1: 0,
      y1: 0,
      x2: cx, 
      y2:cy,
      stroke: 'blue'
    });
    let dog = createTag('g')
    let dogI = createTag('g')
    let c = createTag('circle', {
      xmlns: SVG_NS,
      cx: cx + 8,
      cy: cy - 3,
      r: 30,
      fill: 'green',
      'stroke-width': 2,
      stroke: 'black'
    });
    dogI.addEventListener('mouseenter', function(e) {
      gsap.to(e.target, {
        duration: .3,/*持续时间*/
        scale: 1.5,
        transformOrigin: 'center',
      });
    });
    dogI.addEventListener('mouseleave', function(e) {
      gsap.to(e.target, {
        duration: .3,/*持续时间*/
        scale: 1,
        transformOrigin: 'center',
      });
    });
    
    let t = createTag('text', {
      x: cx,
      y: cy,
      'font-size': 12,
      fill: 'black'
    });
    t.textContent = `🐈‍⬛${i+1}`
    dogI.appendChild(c)
    dogI.appendChild(t)
    dog.appendChild(l);
    dog.appendChild(dogI);
    subG.appendChild(dog);
  })
}

const options = reactive(Array.from({length: 15}, (v, i) => i+2));
const num = ref(6);
    
watch(num, () => {
  createSubC(num.value)
  createCenter()
});
onMounted(() => {
  num.value = 8;
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
