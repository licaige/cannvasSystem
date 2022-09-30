<template>
  <div class="lignth-box">
    <div class="form" @click="onClickStart">
      <button>点击绘制折线</button>
    </div>
    <svg  viewBox="-50 -450 1000 500" id="chart">
    </svg>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref, reactive, watch } from "vue";
import { random, randomRGB } from "@/utils";
import Vector from "@/utils/vector";
const SVG_NS = "http://www.w3.org/2000/svg";
var XLINK_NS = "http://www.w3.org/1999/xlink";
import gsap from 'gsap'

function createTag(tagName, obj={}) {
  let tag = document.createElementNS(SVG_NS, tagName);
  Object.entries(obj).forEach(([k, v]) => {
    tag.setAttribute(k, v);
  });
  return tag;
}

let textObj = {
  'font-size': '12px',
  'color': 'black'
}

function createCoor() {
  const svg = document.querySelector('#chart');
  const {width, height} = svg.viewBox.baseVal;
  const g = createTag('g', {
    id: 'coor'
  });
  let p = createTag('path', {
    d: `M 0 0, h 800, M 0 0, v -400`,
    stroke: 'black'
  });

  const hs = Array.from({length: (width - 150) / 100}, (_, i) => {
    let x = (i+1)*100;
    let t = createTag('text', {
      x: x-10,
      y: 15,
      ...textObj
    });
    t.textContent = x;
    g.appendChild(t)
    return `M ${x} 0, v -5`
  }).join(',');
  const vs = Array.from({length: (height - 150) / 100}, (_, i) => {
    let y = (i+1)*100;
    let yy = -y;
    let t = createTag('text', {
      x: -26,
      y: yy+3,
      ...textObj
    });
    t.textContent = y;
    g.appendChild(t)
    return `M 0 ${yy}, h 5`
  }).join(',');

  let kh = createTag('path', {
    d: `${hs}`,
    stroke: 'black'
  });
  let kv = createTag('path', {
    d: `${vs}`,
    stroke: 'black'
  });
  g.appendChild(p)
  g.appendChild(kh)
  g.appendChild(kv)
  svg.appendChild(g)
}

let list = [
  {
    name: 'x1',
    val: 100,
  },
  {
    name: 'x2',
    val: 200,
  },
  {
    name: 'x3',
    val: 250,
  },
  {
    name: 'x4',
    val: 200,
  },
  {
    name: 'x5',
    val: 200,
  },
  {
    name: 'x6',
    val: 200,
  },
  {
    name: 'x7',
    val: 250,
  },
  {
    name: 'x8',
    val: 200,
  },
  {
    name: 'x9',
    val: 200,
  }
];
function createPolyline() {
  let svg = document.querySelector('#chart');
  const g = createTag('g', {
    id: 'polyline'
  });
  
  let cs = [];
  let ds = ['M 0 0'];
  list.forEach((o, i) => {
    let x = i*100;
    let y = -(o.val)
    let g = createTag('g', {
      'class': 'item'
    });
    let c = createTag('circle', {
      r: 5,
      cx: x, 
      cy: y,
      fill: 'white',
      stroke: 'blue',
      'stroke-width': 3,
    });
    let t = createTag('text', {
      x,
      y: y -10,
      ...textObj,
      color: 'red'
    });
    t.textContent = `${o.name} ${o.val}`
    g.appendChild(t);
    g.appendChild(c);
    cs = cs.concat(g);
    ds = ds.concat(`L ${x} ${y}`);
  });
  let p = createTag('path', {
    id:"line",
    'stroke-width': 2,
    stroke: 'pink',
    fill: 'none',
    d: ds.join(',')
  });
  g.appendChild(p);
  cs.forEach(t => {
    g.appendChild(t);
  });
  svg.appendChild(g);

}

function onClickStart() {
  let line = document.getElementById('line');
  let len = line.getTotalLength()
  line.setAttribute('stroke-dasharray', len);
  line.setAttribute('stroke-dashoffset', len);
  let lastTime = 0;
  let l = len;
  let id = 0;
  function update(time) {
    if(l<=0) {
      cancelAnimationFrame(id)
      return;
    }
    l -= 10;
    line.setAttribute('stroke-dashoffset', l);
    id = requestAnimationFrame(update);
  }
  id = requestAnimationFrame(update);
}

    onMounted(() => {
      createPolyline();
      createCoor();
      onClickStart()
    });
    onBeforeUnmount(() => {

    })
</script>
<style scoped>
.lignth-box {
  position: relative;
  height: 100%;
  font-size: 0;
  line-height: 0;
}
.form {
  font-size: 20px;
  line-height: 1.5;
  cursor: pointer;
}
#chart {
  background-color: #f6f6f6;
  width: 1000px;
  height: 500px;
}
::v-deep .item {
  cursor: pointer;
}
</style>
