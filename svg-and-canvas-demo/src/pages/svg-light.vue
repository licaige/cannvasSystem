<template>
  <div class="lignth-box">
  
    <svg
      id="svg"
      width="100%"
      height="100%"
      viewBox="-400 -300 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <defs>
        <polygon
          id="star"
          points="0 -10, 2 -2, 10 0, 2 2, 0 10, -2 2, -10 0, -2 -2"
        />
      </defs>
      <g id="real">
      <g id="title"><text x="30" y="15" font-size="12px" fill="white">星空、灯塔、海面、倒影</text></g>
      <g id="star-group"></g>
      <g id="moon-group">
      <mask id="moon-mask">
      <circle cx="-250" cy="-150" r="100" fill="white"/>
      <circle cx="-200" cy="-200" r="100" fill="black"/>
      </mask>
      <circle cx="-250" cy="-150" r="100" fill="yellow" mask="url(#moon-mask)"/>
      </g>
      <g id="light-tower" transform="translate(250, 0)">
        <defs>
          <linearGradient id="tower" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#999"></stop>
            <stop offset="1" stop-color="#333"></stop>
          </linearGradient>
          <radialGradient id="light" cx="0.5" cy="0.5" r="0.5" >
            <stop offset="0" stop-color="rgba(255, 255, 255, 0.8)"></stop>
            <stop offset="1" stop-color="rgba(255, 255, 255, 0)"></stop>
          </radialGradient>
          <clipPath id="light-clip">
            <circle x="0" y="0" r="3" fill="#fff"></circle>
            <polygon points="0 0, -400 -15, -400 15" fill="rgba(255, 0, 0, 0.5)" >
              <animateTransform 
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0"
              to="360"
              dur="10s" 
              repeatCount="indefinite">
              </animateTransform>
            </polygon>
          </clipPath>
        </defs>
        <polygon points="0 0, 5 50, -5 50" fill="url(#tower)"/>
        <ellipse cx="0" cy="0" rx="300" ry="100" fill="url(#light)" clip-path="url(#light-clip)"/>
      </g>
      </g>
      <line x1="-400" y1="50" x2="400" y2="50" stroke="white" stroke-width=".3"/>
      <g id="reflect" mask="url(#reflect-mask)">
      <defs>
      <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="rgba(255, 255, 255, 0.6)"></stop>
      <stop offset="0.5" stop-color="rgba(255, 255, 255, 0.1)"></stop>
      </linearGradient>
      <mask id="reflect-mask">
      <rect x="-400" y="0" width="800" height="300" fill="url(#fade)"></rect>
      </mask>
      </defs>
      <use xlink:href="#real" transform="scale(1, -1) translate(0, -100)" />
      </g>
    </svg>
  </div>
</template>
<script>
import { onMounted } from "vue";
import { random } from "@/utils";
const SVG_NS = "http://www.w3.org/2000/svg";
var XLINK_NS = "http://www.w3.org/1999/xlink";
const svg = document.getElementById("svg");

function createStar(origin) {
  var _use = document.createElementNS(SVG_NS, "use");
  _use.setAttributeNS(XLINK_NS, "xlink:href", `#${origin.id}`);
  return _use;
}
function renderStar() {
  var starRef = document.getElementById("star");
  var starGroup = document.getElementById("star-group");
  const starCount = 500;
  // 批量创建星星
  Array.from({ length: 500 }).forEach(() => {
    let star = createStar(starRef);
    star.setAttribute("fill", `rgba(255, 255, 255, ${Math.random()})`);
    // star.setAttribute("opacity", Math.random());
    star.setAttribute(
      "transform",
      `translate(${random(-400, 400)}, ${random(-300, 50)}) 
        scale(${Math.random()})`
    );
    star;
    starGroup.appendChild(star);
  });
}

export default {
  name: "svg-light",
  setup(props) {
    onMounted(() => {
      renderStar();
    });
  },
};
</script>
<style scoped>
.lignth-box {
  position: relative;
  height: 100%;
  font-size: 0;
  line-height: 0;
  background: #000;
}
</style>
