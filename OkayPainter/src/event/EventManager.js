/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 核心库——事件管理类
 */
import Listener from './Listener';
import Point from '../core/Point';
import Node from '../core/Node';
import Event from './Event';
import ClickEvent from "./ClickEvent";
import LongClickEvent from "./LongClickEvent";
import MouseDownEvent from "./MouseDownEvent";
import DragEvent from './DragEvent';
import MouseMoveEvent from './MouseMoveEvent';
import TapEvent from './TapEvent';
import LongTapEvent from './LongTapEvent';
import TouchStartEvent from './TouchStartEvent';
import TouchMoveEvent from './TouchMoveEvent';
import ScaleEvent from './ScaleEvent';
import TouchEndEvent from './TouchEndEvent';
import DragEndEvent from './DragEndEvent';
import MouseWheelEvent from './MouseWheelEvent';
import MouseUpEvent from './MouseUpEvent';

export default class EventManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.listeners = [];
    this.processQueue = []; // 事件处理队列
    this.moveQueue = []; // 拖动事件处理队列
    this.canvas.onmousedown = (e) => {
      this.mouseDown(e);
    };
    this.canvas.onmouseup = (e) => {
      this.mouseUp(e);
    };
    this.canvas.onmousemove = (e) => {
      this.mouseMove(e);
    };
    this.canvas.ontouchstart = (e) => {
      this.touchStart(e);
    };
    this.canvas.ontouchend = (e) => {
      this.touchEnd(e);
    }
    this.canvas.ontouchmove = (e) => {
      this.touchMove(e);
    };
    this.canvas.onmousewheel = (e) => {
      this.mouseWheel(e);
    }
  }

  /**
   * 事件处理类入队列
   * @param event
   */
  pushEvent(event) {
    event.manager = this;
    this.processQueue.unshift(event);
  }

  /**
   * 移动相关事件入队列
   * @param event
   */
  pushMoveEvent(event) {
    event.manager = this;
    this.moveQueue.unshift(event);
  }

  /**
   * 移动相关事件出列
   */
  popMoveEvent() {
    this.moveQueue.pop();
  }

  /**
   * 事件出列
   * @returns {*}
   */
  popEvent() {
    return this.processQueue.pop();
  }

  /**
   * 添加事件监听
   * @param listener
   */
  addEventListener(listener) {
    const indexs = this.listeners.findIndex((item) => {
      return item.event.event === listener.event.event
        && item.obj === listener.obj;
    });
    if (indexs >= 0) {
      return;
    }
    if (listener instanceof Listener) {
      this.listeners.push(listener);
    } else {
      throw new Error('Error arguments of addEventListener');
    }
  }

  /**
   * 移除事件监听
   * @param listener
   */
  removeEventListener(listener) {
    for (let i = 0; i < this.listeners.length; i++) {
      const l = this.listeners[i];
      if (l.event.event === listener.event.event) {
        this.listeners.splice(i, 1)
        break;
      }
    }
  }

  /**
   * 鼠标按钮按下处理函数
   * @param e
   */
  mouseDown(e) {
    const box = this.canvas.canvas.getBoundingClientRect();
    const mouseX = (e.clientX - box.left) * this.canvas.width / box.width;
    const mouseY = (e.clientY - box.top) * this.canvas.height / box.height;
    const point = new Point(mouseX, this.canvas.height - mouseY);
    for (const listener of this.listeners) {
      if (listener.obj !== null && listener.obj instanceof Node) {
        if (listener.obj.containsPoint(point) && listener.obj.visible) {
          let event = null;
          if (listener.event.event === Event.EVENT_CLICK) {
            event = new ClickEvent(listener.event.callback);
          } else if (listener.event.event === Event.EVENT_LONG_CLICK) {
            event = new LongClickEvent(listener.event.callback);
          } else if (listener.event.event === Event.EVENT_MOUSE_DOWN) {
            event = new MouseDownEvent(listener.event.callback);
          } else if (listener.event.event === Event.EVENT_DRAG) {
            event = new DragEvent(listener.event.callback);
            this.pushMoveEvent(event);
          } else if (listener.event.event === Event.EVENT_MOUSE_MOVE) {
            event = new MouseMoveEvent(listener.event.callback);
            this.pushMoveEvent(event);
          } else if (listener.event.event === Event.EVENT_DRAG_END) {
            event = new DragEndEvent(listener.event.callback);
            this.pushMoveEvent(event);
          }
          if (event) {
            event.node = listener.obj;
            event.eventPoint = point;
            this.pushEvent(event);
          }
        }
      }
    }
  }

  /**
   * 滚轮处理函数
   * @param e
   */
  mouseWheel(e) {
    const box = this.canvas.canvas.getBoundingClientRect();
    const mouseX = (e.clientX - box.left) * this.canvas.width / box.width;
    const mouseY = (e.clientY - box.top) * this.canvas.height / box.height;
    const point = new Point(mouseX, this.canvas.height - mouseY);
    for (const listener of this.listeners) {
      if (listener.obj !== null && listener.obj instanceof Node) {
        if (listener.obj.containsPoint(point) && listener.obj.visible) {
          let event = null;
          if (listener.event.event === Event.EVENT_MOUSE_WHEEL) {
            event = new MouseWheelEvent(listener.event.callback, e);
          }
          if (event) {
            event.node = listener.obj;
            event.eventPoint = point;
            event.doEvent();
          }
        }

      }
    }
  }

  /**
   * 鼠标移动处理函数
   * @param e
   */
  mouseMove(e) {
    if (this.moveQueue.length > 0) {
      e.preventDefault();
      e.stopPropagation();
    }
    const box = this.canvas.canvas.getBoundingClientRect();
    const mouseX = (e.clientX - box.left) * this.canvas.width / box.width;
    const mouseY = (e.clientY - box.top) * this.canvas.height / box.height;
    const point = new Point(mouseX, this.canvas.height - mouseY);
    for (const event of this.moveQueue) {
      if (!event.isProcessed) {
        if (event instanceof MouseMoveEvent) {
          setTimeout(() => {
            event.moving(point);
          }, 0);
        } else if (event instanceof DragEvent) {
          setTimeout(() => {
            event.dragging(point);
          }, 0);
        } else if (event instanceof DragEndEvent) {
          const point = new Point(mouseX, mouseY);
          setTimeout(() => {
            event.setEndPoint(point);
          }, 0);
        }
      }
    }
  }

  /**
   * 鼠标弹起处理函数
   * @param e
   */
  mouseUp(e) {
    for (const listener of this.listeners) {
      if (listener.obj !== null
        && listener.obj instanceof Node
        && listener.event.event === Event.EVENT_MOUSE_UP
        && listener.obj.visible
      ) {
        let event = new MouseUpEvent(listener.event.callback);
        event.eventPoint = null;
        event.node = listener.obj;
        this.pushEvent(event);
      }
    }
    // 事件结束机制
    while (this.processQueue.length > 0) {
      const event = this.popEvent();
      if (!event.isProcessed) {
        setTimeout(() => {
          event.doEvent();
        }, 0);
      }
    }
  }

  /**
   * Touch开始函数
   * @param e
   */
  touchStart(e) {
    if (e.touches.length > 1) {
      const box = this.canvas.canvas.getBoundingClientRect();
      const mouse1X = (e.touches[0].clientX - box.left) * this.canvas.width / box.width;
      const mouse1Y = (e.touches[0].clientY - box.top) * this.canvas.height / box.height;
      const mouse2X = (e.touches[1].clientX - box.left) * this.canvas.width / box.width;
      const mouse2Y = (e.touches[1].clientY - box.top) * this.canvas.height / box.height;
      const point1 = new Point(mouse1X, this.canvas.height - mouse1Y);
      const point2 = new Point(mouse2X, this.canvas.height - mouse2Y);
      for (const listener of this.listeners) {
        if (listener.obj !== null
          && listener.obj instanceof Node
          && listener.event.event === Event.EVENT_SCALE
          && listener.obj.visible
        ) {
          const scaleEvent = new ScaleEvent(listener.event.callback);
          scaleEvent.eventPoint = [point1, point2];
          scaleEvent.node = listener.obj;
          this.pushMoveEvent(scaleEvent);
          this.pushEvent(scaleEvent);
        }
      }
    } else {
      const box = this.canvas.canvas.getBoundingClientRect();
      const mouseX = (e.touches[0].clientX - box.left) * this.canvas.width / box.width;
      const mouseY = (e.touches[0].clientY - box.top) * this.canvas.height / box.height;
      const point = new Point(mouseX, this.canvas.height - mouseY);
      for (const listener of this.listeners) {
        if (listener.obj !== null && listener.obj instanceof Node) {
          if (listener.obj.containsPoint(point) && listener.obj.visible) {
            let event = null;
            if (listener.event.event === Event.EVENT_TAP) {
              event = new TapEvent(listener.event.callback);
            } else if (listener.event.event === Event.EVENT_LONG_TAP) {
              event = new LongTapEvent(listener.event.callback);
            } else if (listener.event.event === Event.EVENT_DRAG) {
              event = new DragEvent(listener.event.callback);
              this.pushMoveEvent(event);
            } else if (listener.event.event === Event.EVENT_TOUCH_START) {
              event = new TouchStartEvent(listener.event.callback);
            } else if (listener.event.event === Event.EVENT_TOUCH_MOVE) {
              event = new TouchMoveEvent(listener.event.callback);
              this.pushMoveEvent(event);
            } else if (listener.event.event === Event.EVENT_DRAG_END) {
              event = new DragEndEvent(listener.event.callback);
              event.endPoint = point;
              this.pushMoveEvent(event);
            }
            if (event) {
              event.node = listener.obj;
              event.eventPoint = point;
              this.pushEvent(event);
            }
          }
        }
      }
    }
  }

  /**
   * Touch结束处理函数
   * @param e
   */
  touchEnd(e) {
    for (const listener of this.listeners) {
      if (listener.obj !== null
        && listener.obj instanceof Node
        && listener.event.event === Event.EVENT_TOUCH_END
        && listener.obj.visible
      ) {
        let event = new TouchEndEvent(listener.event.callback);
        event.eventPoint = null;
        event.node = listener.obj;
        this.pushEvent(event);
      }
    }
    // 事件结束机制
    while (this.processQueue.length > 0) {
      const event = this.popEvent();
      if (!event.isProcessed) {
        setTimeout(() => {
          event.doEvent();
          if (event.event === Event.EVENT_DRAG_END && this.moveQueue.indexOf(event) >= 0) {
            this.moveQueue.splice(this.moveQueue.indexOf(event), 1);
          }
        }, 0);
      }
    }
  }

  /**
   * Touch移动处理函数
   * @param e
   */
  touchMove(e) {
    if (this.moveQueue.length > 0) {
      e.preventDefault();
      e.stopPropagation();
    }
    // 结束长按事件
    for (let event of this.processQueue) {
      if (event.event === Event.EVENT_LONG_TAP) {
        const box = this.canvas.canvas.getBoundingClientRect();
        const mouseX = (e.touches[0].clientX - box.left) * this.canvas.width / box.width;
        const mouseY = (e.touches[0].clientY - box.top) * this.canvas.height / box.height;
        if (Math.abs(mouseX - event.eventPoint.x) + Math.abs(mouseY - event.eventPoint.y) > 20) {
          event.isProcessed = true;
        }
      }
    }
    /**
     * 移动队列中提取事件
     */
    for (const event of this.moveQueue) {
      if (!event.isProcessed) {
        if (event instanceof TouchMoveEvent) {
          const box = this.canvas.canvas.getBoundingClientRect();
          const mouseX = (e.touches[0].clientX - box.left) * this.canvas.width / box.width;
          const mouseY = (e.touches[0].clientY - box.top) * this.canvas.height / box.height;
          const point = new Point(mouseX, this.canvas.height - mouseY);
          setTimeout(() => {
            event.moving(point);
          }, 0);
        } else if (event instanceof DragEvent) {
          const box = this.canvas.canvas.getBoundingClientRect();
          const mouseX = (e.touches[0].clientX - box.left) * this.canvas.width / box.width;
          const mouseY = (e.touches[0].clientY - box.top) * this.canvas.height / box.height;
          const point = new Point(mouseX, mouseY);
          setTimeout(() => {
            event.dragging(point);
          }, 0);
        } else if (event instanceof ScaleEvent) {
          const box = this.canvas.canvas.getBoundingClientRect();
          const mouse1X = (e.touches[0].clientX - box.left) * this.canvas.width / box.width;
          const mouse1Y = (e.touches[0].clientY - box.top) * this.canvas.height / box.height;
          const mouse2X = (e.touches[1].clientX - box.left) * this.canvas.width / box.width;
          const mouse2Y = (e.touches[1].clientY - box.top) * this.canvas.height / box.height;
          const point = new Point(mouse1X, mouse1Y);
          const point2 = new Point(mouse2X, mouse2Y);
          setTimeout(() => {
            event.scaling([point, point2]);
          }, 0);
        } else if (event instanceof DragEndEvent) {
          const box = this.canvas.canvas.getBoundingClientRect();
          const mouseX = (e.touches[0].clientX - box.left) * this.canvas.width / box.width;
          const mouseY = (e.touches[0].clientY - box.top) * this.canvas.height / box.height;
          const point = new Point(mouseX, mouseY);
          setTimeout(() => {
            event.setEndPoint(point);
          }, 0);
        }
      }
    }
  }
}
