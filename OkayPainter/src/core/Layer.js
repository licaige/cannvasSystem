/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 基础框架-层
 */
import Node from './Node';

export default class Layer extends Node {
  constructor(canvas) {
    super(canvas);
    this.childs = [];
  }

  /**
   * 添加子函数
   */
  addChild() {
    for (const i in arguments) {
      if (arguments[i] instanceof Node) {
        if (this.childs.indexOf(arguments[i]) === -1) {
          arguments[i].canvas = this.canvas;
          this.childs.push(arguments[i]);
          if (arguments[i] instanceof Layer) {
            arguments[i].build()
          }
        }
      }
    }
  }

  /**
   * 移除子节点
   * @param child
   */
  removeChild(child) {
    if (this.childs.indexOf(child) !== -1) {
      this.childs.splice(this.childs.indexOf(child), 1);
    }
  }

  /**
   * 清除层节点下的所有监听的事件
   */
  clearEventListener() {
    for (let i = 0; i < this.childs.length; i++) {
      this.childs[i].clearEventListener();
    }
    super.clearEventListener();
  }

  build() {
    return false;
  }

  /**
   * 递归绘制函数
   * @param config
   */
  paint(config) {
    if (this.visible) {
      config.before && config.before(this);
      this.beforePaint && this.beforePaint();
      for (const child of this.childs) {
        child.paint(config);
      }
      config.after && config.after(this);
    }
    super.paint(config);
  }
}
