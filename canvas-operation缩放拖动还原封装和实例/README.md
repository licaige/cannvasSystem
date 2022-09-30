# canvas-operation

#### 介绍
canvas 缩放/拖动/还原/封装和实例

#### 创建

```js
// 创建对象并进行配置
var canvas = new CanvasOperation({
  ele: document.getElementById("canvas"), // 画布对象
  draw: userDraw, // 用户绘图方法
  width: 500, // 画布宽
  height: 500, // 画布高
  cssWidth: 500, // css设置的宽(对应css style的width)
  cssHeight: 500, // css设置的高(对应css style的height)
  maxScale: 8, // 缩放最大倍数（缩放比率倍数）
  minScale: 0.4, // 缩放最小倍数（缩放比率倍数）
  scaleStep: 0.2, // 缩放比率
});

canvas.addMusewheelEvent(); // 添加滚轮放大缩小事件
canvas.addDragEvent(); // 添加拖动事件
canvas.draw();
```

#### 方法
canvas.addMusewheelEvent(); // 添加滚轮放大缩小事件

canvas.addDragEvent(); // 添加拖动事件

canvas.draw(); // 绘图

canvas.zoomIn(true); // 中心放大

canvas.zoomOut(true); // 中心缩小

canvas.reset(); // 还原

canvas.clear(); // 清除画布
