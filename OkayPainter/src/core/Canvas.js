/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 核心Canvas
 */
import Node from './Node';
import EventManager from '../event/EventManager';
import Layer from './Layer';
export default class Canvas {
  constructor(config) {
    if (config.ele === undefined) {
      throw new Error('Not found config of canvas element');
    }
    this.container = config.ele;
    this.canAction = config.canAction;
    this.canvas = document.createElement('canvas');
    this.childs = [];
    this.eventManager = new EventManager(this);
    this.ratio = config.ratio || 2;
    this.init();
  }

  /**
   * 重新定义Canvas的大小
   */
  repaint() {
    this.container.innerHTML = '';
    this.canvas = document.createElement('canvas');
    this.init();
  }

  /**
   * 滚轮动作设置
   * @param func
   */
  set onmousewheel(func) {
    this.canvas.onmousewheel = func;
  }

  /**
   * 鼠标点击
   * @param func
   */
  set onmousedown(func) {
    this.canvas.onmousedown = func;
  }

  /**
   * 鼠标弹起动画
   * @param func
   */
  set onmouseup(func) {
    this.canvas.onmouseup = func;
  }

  /**
   * 鼠标移动
   * @param func
   */
  set onmousemove(func) {
    this.canvas.onmousemove = func;
  }

  /**
   * Touch开始
   * @param func
   */
  set ontouchstart(func) {
    this.canvas.ontouchstart = func;
  }

  /**
   * Touch结束
   * @param func
   */
  set ontouchend(func) {
    this.canvas.ontouchend = func;
  }

  /**
   * Touch移动
   * @param func
   */
  set ontouchmove(func) {
    this.canvas.ontouchmove = func;
  }

  /**
   * 画布宽度
   * @returns {number}
   */
  get width() {
    return this.canvas.width;
  }

  /**
   * 宽度高度
   * @returns {number}
   */
  get height() {
    return this.canvas.height;
  }

  /**
   * Canvas初始化
   */
  init() {
    const styles = getComputedStyle(this.container, null);
    const width = parseInt(styles.width);
    const height = parseInt(styles.height);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.canvas.width = this.ratio * width;
    this.canvas.height = this.ratio * height;
    this.canvas.style.outline = 'none';
    this.canvas.onclick = (e) => { this.canvas.focus(); };
    this.container.appendChild(this.canvas);
    this.painter = this.canvas.getContext('2d');
  }

  /**
   * 添加子节点函数
   */
  addChild() {
    for (const i in arguments) {
      if (arguments[i] instanceof Node) {
        if (this.childs.indexOf(arguments[i]) === -1) {
          arguments[i].canvas = this;
          this.childs.push(arguments[i]);
          if (arguments[i] instanceof Layer) {
            arguments[i].build();
          }
        }
      }
    }
  }

  /**
   * 移除子节点
   */
  removeChild() {
    for (const i in arguments) {
      if (arguments[i] instanceof Node) {
        if (this.childs.indexOf(arguments[i]) !== -1) {
          arguments[i].canvas = this;
          this.childs.splice(this.childs.indexOf(arguments[i]), 1);
        }
      }
    }
  }

  /**
   * 停止动画
   */
  stopAction() {
    this.canAction = false;
  }

  /**
   * 开启动画
   */
  startAction() {
    this.canAction = true;
    this.paint();
  }

  /**
   * 绘制函数
   * @param before
   * @param after
   */
  paint(before, after) {
    this.painter.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.childs.length; i++) {
      before && before(this);
      this.childs[i].paint({ before, after });
      after && after(this);
    }
    if (this.canAction) {
      setTimeout(() => {
        this.paint(before, after);
      }, Math.round(this.fps ? Math.round(1000 / this.fps) : Math.round(1000 / 60)));
    }
  }
}
