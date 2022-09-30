<template>
  <div class="lignth-box">
  <div class="form">
      <span>弹簧自平衡物理模型，选择小球个数</span>
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
      <g id="ball-box"></g>
      <path id="links" stroke="black"></path>
    </svg>
  </div>
</template>
<script>
import { onMounted, onBeforeUnmount, ref, reactive, watch } from "vue";
import { random, randomRGB } from "@/utils";
import Vector from "@/utils/vector";
const SVG_NS = "http://www.w3.org/2000/svg";
var XLINK_NS = "http://www.w3.org/1999/xlink";
const relation = 300;
// 弹性x
const k = 0.05;
let balls = [];
let reqAniId = null;

function genPoints(num = 2) {
  const ballBox = document.getElementById('ball-box');
  balls = Array.from({length: num}, (v, i) => {

    var circle = document.createElementNS(SVG_NS, 'circle');
    var x = random(-300, 300);
    var y = random(-300, 300);
    var color = randomRGB();
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', 10);
    // TODO
    circle.setAttribute('fill', color);
    ballBox.appendChild(circle);
    return {
      circle,
      color,
      name: i,
       // 位置矢量
    s: new Vector(x, y),
    // 速度矢量
    v: new Vector(0, 0),
    // 加速度矢量
    a :new Vector(0, 0),
    }
  });
  console.log(balls)
}

let lastTime = 0;
function update(time) {
  // 毫秒
  let diff = time - lastTime;
  if(diff >= 20) {
    let t = diff / 200;
    // 对各个小球求矢量（力、速度、加速度）并更新位置
    balls.forEach((pa) => {
      var f = new Vector();
      balls.forEach((pb) => {
        if(pa === pb) return;
        var x = Vector.fromPoints(pa.s, pb.s)
        var delta = x.length() - relation;
        f = f.add(x.normalize(delta * k));
      });
      pa.a = f;
      // pa.v = pa.v.add(pa.a.multipy(t));
      // 人为制造动量损失
      pa.v = pa.v.add(pa.a.multipy(t)).multipy(0.98);
      pa.s = pa.s.add(pa.v.multipy(t));

      pa.circle.setAttribute('cx', pa.s.x);
      pa.circle.setAttribute('cy', pa.s.y);
    });

    // 更新连线
    const links = document.getElementById('links');
    var linkPath = [];
    balls.forEach((pa) => {
      var sa = pa.s;
      balls.forEach((pb) => {
        if(pa === pb) return;
        var sb = pb.s;
        linkPath= linkPath.concat([`M ${sa.x} ${sa.y}`, `L ${sb.x} ${sb.y}`]);
      })
      links.setAttribute('d', linkPath.join(','))
    })
    lastTime = time;

  }
reqAniId = requestAnimationFrame(update)
}



export default {
  name: "svg-spring",
  setup(props) {
    const options = reactive(Array.from({length: 19}, (v, i) => i+2));
    const num = ref(6);

    function init () {
      let ballBox = document.getElementById('ball-box');
      let links = document.getElementById('links');
      ballBox.innerHTML = '';
      links.setAttribute('d', '');

      genPoints(num.value);
      reqAniId = requestAnimationFrame(update);
    }

    watch(num, (count, prevCount) => { 
     init();
    }) 
    onMounted(() => {
      init();
      setTimeout(() => {
        init();
      }, 10);
    });
    onBeforeUnmount(() => {
      cancelAnimationFrame(reqAniId);
    })

    return {
      options,
      num
    }
  },
};
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
