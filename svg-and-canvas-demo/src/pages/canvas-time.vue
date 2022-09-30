<template>
  <canvas id="canvas-time" style="height: 100%">
    当前浏览器不支持Canvas，请更换浏览器后再试
  </canvas>
</template>
<script>
import { random, randomRGB } from "@/utils";
import digit from "@/utils/digit";
import { onMounted, onBeforeUnmount } from "vue";
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var curShowTimeSeconds = 0;
const MinutesSecs = 60;
const HourSecs = 60 * 60;
var requestAniId = null;

var balls = [];
const colors = [
  "#33B5E5",
  "#0099CC",
  "#AA66CC",
  "#9933CC",
  "#99CC00",
  "#669900",
  "#FFBB33",
  "#FF8800",
  "#FF4444",
  "#CC0000",
];

function renderCanvas() {
  WINDOW_WIDTH = document.body.clientWidth;
  WINDOW_HEIGHT = document.body.clientHeight;
  MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
  RADIUS = Math.round((WINDOW_WIDTH * 4) / 5 / 108) - 1;
  MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);

  var canvas = document.getElementById("canvas-time");
  var context = canvas.getContext("2d");
  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;
  curShowTimeSeconds = getCurrentShowTimeSeconds();

  // TODO requestAnimationFrame
  // setInterval(function () {
  //   render(context);
  //   update();
  // }, 50);

  let lastTime = 0;
  function animate(time) {
    let diff = time - lastTime;
    if (diff >= 50) {
      render(context);
      update();
      lastTime = time;
    }
    requestAniId = requestAnimationFrame(animate);
  }
  requestAniId = requestAnimationFrame(animate);
}

function getCurrentShowTimeSeconds() {
  var curTime = new Date();
  var ret =
    curTime.getHours() * 60 * 60 +
    curTime.getMinutes() * 60 +
    curTime.getSeconds();

  return ret;
}

function update() {
  var nextShowTimeSeconds = getCurrentShowTimeSeconds();

  var nextHours = parseInt(nextShowTimeSeconds / HourSecs);
  var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * HourSecs) / 60);
  var nextSeconds = nextShowTimeSeconds % 60;

  var curHours = parseInt(curShowTimeSeconds / HourSecs);
  var curMinutes = parseInt((curShowTimeSeconds - curHours * HourSecs) / 60);
  var curSeconds = curShowTimeSeconds % 60;

  if (nextSeconds != curSeconds) {
    // 判断 hours 是否相等
    if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
      addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
    }
    if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
      addBalls(
        MARGIN_LEFT + 15 * (RADIUS + 1),
        MARGIN_TOP,
        parseInt(curHours / 10)
      );
    }

    // 判断 minutes 是否相等
    if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
      addBalls(
        MARGIN_LEFT + 39 * (RADIUS + 1),
        MARGIN_TOP,
        parseInt(curMinutes / 10)
      );
    }
    if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
      addBalls(
        MARGIN_LEFT + 54 * (RADIUS + 1),
        MARGIN_TOP,
        parseInt(curMinutes % 10)
      );
    }

    // 判断 seconds 是否相等
    if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
      addBalls(
        MARGIN_LEFT + 78 * (RADIUS + 1),
        MARGIN_TOP,
        parseInt(curSeconds / 10)
      );
    }
    if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
      addBalls(
        MARGIN_LEFT + 93 * (RADIUS + 1),
        MARGIN_TOP,
        parseInt(nextSeconds % 10)
      );
    }

    curShowTimeSeconds = nextShowTimeSeconds;
  }

  updateBalls();
}

function updateBalls() {
  for (var i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    // 模拟重力加速度
    balls[i].vy += balls[i].g;

    if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
      balls[i].y = WINDOW_HEIGHT - RADIUS;
      // 撞到地面是反弹 && 模拟能力损耗
      balls[i].vy = -balls[i].vy * 0.75;
    }
  }

  var cnt = 0;
  // 只保留本次在视口中的小球 GC
  balls = balls.filter((item) => {
    return item.x + RADIUS > 0 && item.x - RADIUS < WINDOW_WIDTH;
  });
}

// 添加对应数字之前的
function addBalls(x, y, num) {
  // 之前的一个数字，因为卸妆的是之前的数字
  if (num > 0) {
    num--;
  } else {
    num = 9;
  }
  for (var i = 0; i < digit[num].length; i++)
    for (var j = 0; j < digit[num][i].length; j++)
      if (digit[num][i][j] == 1) {
        var aBall = {
          x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
          y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
          g: 1.5 + 1,
          // vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
          vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
          vy: -5,
          color: colors[random(0, colors.length - 1)],
        };

        balls.push(aBall);
      }
}
function render(cxt) {
  cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

  // title
  cxt.beginPath();
  cxt.font = "24px serif";
  cxt.fillStyle = 'black';
  cxt.closePath();
  cxt.fillText("数字时钟",500,50);

  var hours = parseInt(curShowTimeSeconds / HourSecs);
  var minutes = parseInt((curShowTimeSeconds - hours * HourSecs) / 60);
  var seconds = curShowTimeSeconds % 60;

  // 时显示
  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);
  renderDigit(
    MARGIN_LEFT + 15 * (RADIUS + 1),
    MARGIN_TOP,
    parseInt(hours % 10),
    cxt
  );
  // ：
  renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
  // 分
  renderDigit(
    MARGIN_LEFT + 39 * (RADIUS + 1),
    MARGIN_TOP,
    parseInt(minutes / 10),
    cxt
  );
  renderDigit(
    MARGIN_LEFT + 54 * (RADIUS + 1),
    MARGIN_TOP,
    parseInt(minutes % 10),
    cxt
  );
  // ：
  renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
  // 秒
  renderDigit(
    MARGIN_LEFT + 78 * (RADIUS + 1),
    MARGIN_TOP,
    parseInt(seconds / 10),
    cxt
  );
  renderDigit(
    MARGIN_LEFT + 93 * (RADIUS + 1),
    MARGIN_TOP,
    parseInt(seconds % 10),
    cxt
  );

  for (var i = 0; i < balls.length; i++) {
    cxt.fillStyle = balls[i].color;

    cxt.beginPath();
    cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
    cxt.closePath();

    cxt.fill();
  }
}

function renderDigit(x, y, num, cxt) {
  for (var i = 0; i < digit[num].length; i++)
    for (var j = 0; j < digit[num][i].length; j++)
      if (digit[num][i][j] == 1) {
        cxt.beginPath();
        
        cxt.arc(
          x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
          y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
          RADIUS,
          0,
          2 * Math.PI
        );
        cxt.closePath();
        cxt.fill();
        // cxt.stroke();
      }
}

export default {
  name: "canvas-time",
  setup(props) {
    onMounted(() => {
      renderCanvas();
    });
    onBeforeUnmount(() => {
      cancelAnimationFrame(requestAniId);
    });
  },
};
</script>
