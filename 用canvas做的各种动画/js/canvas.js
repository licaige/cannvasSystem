const canvas = document.getElementById('myCanvas');
const cliW = document.body.clientWidth;
const cliH = document.body.clientHeight;
const MINRADIUS = 1;
const MAXRADIUS = 2;
const MAXSTEP = 1;
const MINSTEP = 0.1;
const MIN = 100;
const MAX = 200;
const MDISTANCE = 150;
const EACHDISTANCE = 70;
let pageX = null;
let pageY = null;
let isRun = false;
let animation = null;
let circles = [];
canvas.width = cliW;
canvas.height = cliH;
let ctx = canvas.getContext('2d');

// 生产小圆圈
function exhibition(data) {
  ctx.beginPath();
  ctx.arc(data.x, data.y, data.r, 0, 2 * Math.PI);
  ctx.fillStyle = data.color;
  ctx.fill();
}

// 随机位置和半径
function randomPositionSize() {
  let x = Math.floor(Math.random() * cliW);
  let y = Math.floor(Math.random() * cliH);
  let r = Math.floor(Math.random() * (MAXRADIUS - MINRADIUS) + MINRADIUS + 1);
  if ((x - r) < 0) {
    x = r;
  }
  if ((x + r) > cliW) {
    x = cliW - r;
  }
  if ((y - r) < 0) {
    y = r;
  }
  if ((y + r) > cliH) {
    y = cliH - r;
  }
  return { x, y, r};
}

//随机步长
function randomStep () {
  let randomDX = Math.random() * 3 < 1 ? '-' : '';
  let randomDY = Math.random() * 3 < 1 ? '-' : '';
  // return {
  //   stepX: Number(randomDX + Math.floor(Math.random() * (MAXSTEP - MINSTEP) + MINSTEP + 1)),
  //   stepY: Number(randomDY + Math.floor(Math.random() * (MAXSTEP - MINSTEP) + MINSTEP + 1))
  // };
  return {
    stepX: parseFloat(randomDX + Math.random() * (MAXSTEP - MINSTEP) + MINSTEP),
    stepY: parseFloat(randomDY + Math.random() * (MAXSTEP - MINSTEP) + MINSTEP)
  };
}

// 创建随机十六进制颜色值
function randomColor() {
  let str = '';
  for (let i = 0; i < 6; i++) {
    str += Math.floor(Math.random() * 16).toString(16);
  }
  return ('#' + str);
}

// 批量生产圆圈
function batchCreateCircles() {
  let arr = [];
  let num = Math.floor(Math.random() * (MAX - MIN) + MIN);
  for (let i = 0; i < num; i++) {
    let data = randomPositionSize();
    data.color = randomColor();
    data = Object.assign(randomStep(), data);
    arr.push(data);
  }
  return arr;
}

// 改变小球的位置
function changePosition (list) {
  let len = list.length;
  for (let i = 0; i < len; i++) {
    let currentX = list[i].x + list[i].stepX;
    let currentY = list[i].y + list[i].stepY;
    if (currentX < list[i].r) {
      currentX = list[i].r;
      list[i].stepX = -list[i].stepX;
    }
    if (currentX > (cliW - list[i].r)) {
      currentX = cliW - list[i].r;
      list[i].stepX = -list[i].stepX;
    }
    if (currentY < list[i].r) {
      currentY = list[i].r;
      list[i].stepY = -list[i].stepY;
    }
    if (currentY > (cliH - list[i].r)) {
      currentY = cliH - list[i].r;
      list[i].stepY = -list[i].stepY;
    }
    list[i].x = currentX;
    list[i].y = currentY;
  }
  return list;
}

// 绘制所有小球
function showAllCircle(list) {
  let len = list.length;
  for (let i = 0; i < len; i++) {
    exhibition(list[i])
  }
}

// 绘制小球与鼠标间的连线
function drawLine(data) {
  ctx.beginPath();
  ctx.strokeStyle = data.lineColor;
  ctx.moveTo(data.x, data.y);
  ctx.lineTo(pageX, pageY);
  ctx.closePath();
  ctx.stroke();
}

// 测量小球和鼠标间的距离
function positionMeasure(list, event) {
  let len = list.length;
  for (let i = 0; i < len; i++) {
    if (pageX !== null && pageY !== null) {
      let diffX = list[i].x - pageX;
      let diffY = list[i].y - pageY;
      let dist = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
      if (dist < MDISTANCE) {
        if (!list[i].lineColor) {
          list[i].lineColor = randomColor();
        }
        drawLine(list[i])
      } else {
        list[i].lineColor = null;
      }
    }
  }
  return list;
}

function drawEachLine(dataA, dataB, keyName) {
  ctx.beginPath();
  ctx.strokeStyle = dataA[keyName];
  ctx.moveTo(dataA.x, dataA.y);
  ctx.lineTo(dataB.x, dataB.y);
  ctx.closePath();
  ctx.stroke();
}

function measureEachPos(list) {
  let len = list.length;
  for (let i = 0; i < len; i++) {
    let s = i + 1;
    for (let j = s; j < len; j++) {
      let diffX = list[i].x - list[j].x;
      let diffY = list[i].y - list[j].y;
      let dist = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
      if (dist < EACHDISTANCE) {
        if (!list[i]['eachColor' + j]) {
          list[i]['eachColor' + j] = randomColor();
        }
        drawEachLine(list[i], list[j], 'eachColor' + j);
      } else {
        list[i]['eachColor' + j] = null;
      }
    }
  }
  return list;
}


function run() {
  ctx.clearRect(0, 0, cliW, cliH);
  showAllCircle(circles);
  circles = positionMeasure(circles);
  circles = changePosition(circles);
  circles = measureEachPos(circles);
  animation = requestAnimationFrame(run);
}


document.onmousemove = function(ev) {
  ev = ev || window.event;
  pageX = ev.pageX;
  pageY = ev.pageY;
}

document.onmouseleave = function(ev) {
  pageX = null;
  pageY = null;
}

document.onclick = function () {
  if (isRun) {
    isRun = false;
    cancelAnimationFrame(animation)
  } else {
    isRun = true;
    run();
  }
}

circles = batchCreateCircles();
showAllCircle(circles);