/*
 * @Author: zhoulei0232
 * @Date: 2021-12-31 14:38:28
 * @LastEditTime: 2022-01-03 22:09:15
 * @LastEditors: zhoulei0232
 * @Description:
 */
// Canvas类
export default class Canvas {
  sceneList;
  LineList;
  ctx;
  canvas;
  nowBlock;
  // 创造正方形的块
  createBlock(option) {
    option.Canvas = this;
    this.sceneList.push(new Block(option));
    this.painting();
  }
  // 创造正方形的块
  createGridLine(option) {
      option.Canvas = this;
      this.sceneList.push(new GridLine(option));
      this.painting();
  }
  // 创造线
  createLine(option) {
    option.Canvas = this;
    this.sceneList.push(new Line(option));
    this.painting();
  }
  // 创造线
  createPoint(option) {
    option.Canvas = this;
    this.sceneList.push(new Point(option));
    this.painting();
  }
  // 清空场景
  cleanScene() {
    this.sceneList = [];
  }
  painting() {
    // 将容器里的色块全部渲染到canvas
    // 清空画布（渲染之前应该将老的清空）
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.sceneList.forEach((ele) => {
      // this.rendering(ele);
      ele.rendering(this.ctx);
    });
  }
  // 鼠标点击
  mousedownEvent(e) {
    const x = e.offsetX * 2;
    const y = e.offsetY * 2;
    // 这里将点击的坐标传给所有色块，根据边界判断方法判断是否在点击在内部。是的话执行色块的事件方法。
    this.sceneList.forEach((ele) => {
      if (ele.checkBoundary(x, y)) ele.mousedownEvent(e, this.ctx);
    });
  }
  // 鼠标移动
  mousemoveEvent(e) {
    const x = e.offsetX * 2;
    const y = e.offsetY * 2;
    // 这里将点击的坐标传给所有色块，根据边界判断方法判断是否在点击在内部。是的话执行色块的事件方法。
    this.sceneList.forEach((ele) => {
      if (ele.checkBoundary(x, y)) {
        ele.mousemoveInEvent(this.ctx);
      } else {
        ele.mousemoveOutEvent(this.ctx);
      }
    });
  }
  constructor(ele) {
    // 初始化函数（输入的是canvas）
    // 设置canvas
    this.canvas = ele;
    this.ctx = this.canvas.getContext("2d");
    // 色块容器
    this.sceneList = [];
    // 事件绑定(这里有一个要注意的，我这里用了bind方法，是为了将“mousedownEvent”方法内的this指向切换到Canvas)
    this.canvas.addEventListener("click", this.mousedownEvent.bind(this)); // 点击事件
    this.canvas.addEventListener("mousemove", this.mousemoveEvent.bind(this)); // 鼠标移动事件
  }
}
/*
 * 正方形块
 */
class Block {
  data;
  lineWidth;
  name;
  color;
  borderColor;
  Canvas;
  hierarchy;
  constructor({ data, lineWidth, borderColor, name, color, Canvas }) {
    // 初始化设置色块相关属性
    this.data = data;
    this.lineWidth = lineWidth;
    this.borderColor = borderColor;
    this.name = name;
    this.color = color;
    this.Canvas = Canvas;
  }
  rendering(context) {
    // 渲染色块函数
    context.beginPath();
    this.data.forEach((item, index) => {
      if (index === 0) {
        context.moveTo(item[0], item[1]);
      } else {
        context.lineTo(item[0], item[1]);
      }
    });

    context.closePath();
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.borderColor;
    context.fillStyle = this.color;
    // context.fillStyle = 'yellow';
    context.fill();
    context.stroke();
  }
  checkBoundary(x, y) {
    // 判断边界方法
    return (
      x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h
    );
  }
  mousedownEvent() {
    // 点击事件
    console.log(`点击了颜色为${this.name}的色块`);
  }
  // 鼠标移动事件
  mousemoveInEvent() {}
  // 鼠标移动事件
  mousemoveOutEvent() {}
}
/*
 * 网格线
 */
class GridLine {
  data;
  lineWidth;
  name;
  color;
  borderColor;
  Canvas;
  hierarchy;
  constructor({ data, lineWidth, borderColor, name, color, Canvas }) {
    // 初始化设置色块相关属性
    this.data = data;
    this.lineWidth = lineWidth;
    this.borderColor = borderColor;
    this.name = name;
    this.color = color;
    this.Canvas = Canvas;
  }
  rendering(context) {
    // 渲染色块函数
    context.beginPath();
    this.data.forEach((item, index) => {
      if (index === 0) {
        context.moveTo(item[0], item[1]);
      } else {
        context.lineTo(item[0], item[1]);
      }
    });

    context.closePath();
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.borderColor;
    context.fillStyle = this.color;
    context.fill();
    context.stroke();
  }
  checkBoundary(x, y) {
    // 判断边界方法
    return (
      x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h
    );
  }
  mousedownEvent() {
    // 点击事件
    console.log(`点击了颜色为${this.name}的色块`);
  }
  // 鼠标移动事件
  mousemoveInEvent() {}
  // 鼠标移动事件
  mousemoveOutEvent() {}
}
/*
 * 绘制线
 */
class Line {
  data;
  lineWidth;
  name;
  color;
  Canvas;
  hierarchy;
  constructor({ data, lineWidth, name, color, Canvas }) {
    // 初始化设置色块相关属性
    this.data = data;
    this.lineWidth = lineWidth;
    this.name = name;
    this.color = color;
    this.Canvas = Canvas;
  }
  rendering(context) {
    // 渲染色块函数
    context.lineWidth = this.lineWidth;
    context.beginPath();
    this.data.forEach((item, index) => {
      if (index === 0) {
        context.moveTo(item[0], item[1]);
      } else {
        context.lineTo(item[0], item[1]);
      }
    });
    context.lineTo(this.data[0][0], this.data[0][1]);
    context.strokeStyle = this.color;
    context.stroke();
  }
  checkBoundary(x, y) {
    // 判断边界方法
    return (
      x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h
    );
  }
  mousedownEvent() {
    // 点击事件
    console.log(`点击了颜色为${this.name}的色块`);
  }
  // 鼠标移动事件
  mousemoveInEvent() {}
  // 鼠标移动事件
  mousemoveOutEvent() {}
}

/*
 * 绘制圆点
 */
class Point {
  x;
  y;
  radius;
  params;
  name;
  color;
  Canvas;
  hierarchy;

  constructor({ x, y, radius, name, color, Canvas, params }) {
    // 初始化设置色块相关属性
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.params = params;
    this.name = name;
    this.oldColor = color;
    this.color = color;
    this.Canvas = Canvas;
    this.isSelected = null;
  }
  rendering(context, newColor = null) {
    // 渲染色块函数
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = newColor || this.color; //设置填充颜色
    context.fill(); //开始填充
    context.strokeStyle = newColor || this.color;
    context.stroke();
  }
  checkBoundary(x, y) {
    // 判断边界方法
    let oldCurrent = [this.x, this.y];
    let myCurrent = [x, y];
    return this.pointInsideCircle(myCurrent, oldCurrent, this.radius);
  }
  pointInsideCircle(point, circle, r) {
    if (r === 0) return false;
    var dx = circle[0] - point[0];
    var dy = circle[1] - point[1];
    return dx * dx + dy * dy <= r * r;
  }
  mousedownEvent() {
    // 点击事件
    console.log(`点击了颜色为的色块`);
    // alert(`点击了${this.name}的圆点，获取了${this.params.text}`);
  }
  // 鼠标移动事件
  mousemoveInEvent(context) {
    // 点击事件
    let rgbColor = `rgb(${changeColor(this.color, -0.2).join(",")})`;
    this.rendering(context, rgbColor);
  }
  // 鼠标移动事件
  mousemoveOutEvent(context) {
    // 点击事件
    this.rendering(context);
  }
}

/**
 * 获取颜色值
 */
function color2RGB(color) {
  if (typeof color !== "string" || (color.length !== 7 && color.length !== 4))
    return [0, 0, 0];
  color = color.substr(1);
  if (color.length === 3) {
    return color.split("").map((str) => parseInt(str + str, 16));
  }

  let result = [];
  for (let i = 0; i < 6; i += 2) {
    result.push(parseInt(color.substr(i, 2), 16));
  }

  return result;
}

/**
 * 加深：correctionFactor<0
   变亮：correctionFactor>0
   -1.0f <= correctionFactor <= 1.0f

   @colorStr  颜色值：#ff0000
 */
function changeColor(colorStr, correctionFactor) {
  let color = color2RGB(colorStr);
  let red = parseFloat(color[0]);
  let green = parseFloat(color[1]);
  let blue = parseFloat(color[2]);

  if (correctionFactor < 0) {
    correctionFactor = 1 + correctionFactor;
    red *= correctionFactor;
    green *= correctionFactor;
    blue *= correctionFactor;
  } else {
    red = (255 - red) * correctionFactor + red;
    green = (255 - green) * correctionFactor + green;
    blue = (255 - blue) * correctionFactor + blue;
  }

  if (red < 0) red = 0;

  if (red > 255) red = 255;

  if (green < 0) green = 0;

  if (green > 255) green = 255;

  if (blue < 0) blue = 0;

  if (blue > 255) blue = 255;

  red = parseInt(red);
  green = parseInt(green);
  blue = parseInt(blue);

  return [red, green, blue];
}
