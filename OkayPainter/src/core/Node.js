/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 基础框架——节点
 */
import Point from './Point';
import Scheduler from './Scheduler';
import Action from './Action';
import Event from '../event/Event';
import Listener from '../event/Listener';

export default class Node {
  constructor(canvas) {
    this.position = new Point(0, 0);
    this.visible = true;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.alpha = 1;
    this.schedulers = [];
    this.canvas = canvas || null;
    this.isSelected = false;
    this.isDraggable = false;
    this.locked = false;
    this.ext = null; // 附加数据
  }

  setColor(color) {
    this.color = color;
  }

  /**
   * 设置节点位置
   * @param _x
   * @param _y
   */
  setPosition(_x, _y = 0) {
    if (_x instanceof Point) {
      this.position = _x;
    } else {
      this.position.x = parseInt(_x);
      this.position.y = parseInt(_y);
    }
  }

  /**
   * 线程更新
   * @param dt
   */
  scheduleUpdate(dt) {
    this.updateScheduler = setInterval((dt) => {
      this.update(dt);
    }, dt);
  }

  /**
   * 取消线程更新
   */
  unschedulerUpdate() {
    clearInterval(this.updateScheduler);
  }

  /**
   * 更新接口，用于继承实现
   * @param dt
   */
  update(dt) {
    // 用于继承
  }

  /**
   * 添加线程
   * @param callback
   * @param dt
   */
  schedule(callback, dt) {
    const scheduler = setInterval(callback(dt), dt);
    this.schedulers.push(new Scheduler(scheduler, callback));
  }

  /**
   * 运行动画
   * @param action
   * @param callback
   */
  runAction(action, callback) {
    if (action instanceof Action) {
      action.reset(this);
      action.run(this, callback);
    } else {
      throw new Error('Error Arguments: action is not a instance of class Action');
    }
  }

  /**
   * 停止动画
   * @param action
   */
  stopAction(action) {
    if (action instanceof Action) {
      action.stop();
    } else {
      throw new Error('Error Arguments: action is not a instance of class Action');
    }
  }

  /**
   * 移除动画
   * @param callback
   */
  unscheduler(callback) {
    for (const i in this.schedulers) {
      const scheduler = this.schedulers[i];
      if (scheduler.callback === callback) {
        this.schedulers.slice(i, 1);
        clearInterval(scheduler.scheduler);
        break;
      }
    }
  }

  /**
   * 点击检测，用于继承
   * @param point
   * @returns {boolean}
   */
  containsPoint(point) {
    return false;
  }

  /**
   * 添加事件监听
   * @param event
   * @param callback
   */
  addEventListener(event, callback) {
    if (this.canvas === undefined || this.canvas === null) {
      throw new Error('No Canvas Found');
    }
    const ev = new Event(event, callback);
    const listener = new Listener(this, ev);
    this.canvas.eventManager.addEventListener(listener);
  }

  /**
   * 移除事件监听
   * @param event
   * @param callback
   */
  removeEventListener(event, callback) {
    if (this.canvas === undefined || this.canvas === null) {
      throw new Error('No Canvas Found');
    }
    const ev = new Event(event, callback);
    const listener = new Listener(this, ev);
    this.canvas.eventManager.removeEventListener(listener);
  }

  /**
   * 清除事件监听
   */
  clearEventListener() {
    const listeners = this.canvas.eventManager.listeners.filter(item => item.obj === this);
    if (listeners) {
      for (const l of listeners) {
        this.canvas.eventManager.listeners.splice(this.canvas.eventManager.listeners.indexOf(l), 1);
      }
    }
  }

  /**
   * 渲染函数，用于继承
   * @param painter
   */
  draw(painter) {
    // Node 绘制函数
  }

  /**
   * 绘制函数
   * @param config
   */
  paint(config) {
    if (this.visible) {
      const { painter } = this.canvas;
      config.before && config.before(this, painter);
      painter.save();
      painter.globalAlpha = this.alpha;
      painter.translate(0, this.scaleY * (this.canvas.height - this.canvas.ratio * this.position.y));
      painter.rotate(this.rotation * Math.PI / 180);
      painter.scale(this.scaleX, this.scaleY);
      this.draw(painter);
      painter.restore();
      config.after && config.after(this, painter);
    }
  }
}
