import { drawGrid } from './modules/grid';
import { drawAxis } from './modules/axis';
import { turnOnBrush } from './modules/pencil';
import { rectSelect } from './modules/rectSelect';

class BaseTool {
  constructor(context) {
    this.context = context;
    this.pathStack = [];
  }
  static init(ele) {
    let canvas = document.createElement('canvas');
    canvas.width = ele.offsetWidth;
    canvas.height = ele.offsetHeight;
    ele.appendChild(canvas);
    return new BaseTool(canvas.getContext('2d'));
  }
  drawGrid() {
    drawGrid(this, ...arguments);
    this.pathStack.push({
      method: drawGrid,
      params: [...arguments],
    });
  }
  drawAxis() {
    drawAxis(this, ...arguments);
    this.pathStack.push({
      method: drawAxis,
      params: [...arguments],
    });
  }
  turnOnBrush() {
    turnOnBrush(this, ...arguments);
  }
  rectSelect() {
    rectSelect(this, ...arguments);
  }
  clear() {
    this.pathStack = [];
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }
  repeal() {
    console.log(this);
    if (this.pathStack.length > 0) this.pathStack.pop();
    this.recover();
  }
  recover() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    for (let i of this.pathStack) {
      i.method(this, ...i.params);
    }
  }
}

export default BaseTool;
