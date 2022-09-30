/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: TouchMove
 */
import Event from './Event';

export default class TouchMoveEvent extends Event {
  constructor(callback) {
    super(Event.EVENT_TOUCH_MOVE, callback);
    this.curPoint = null;
  }

  /**
   * 移动处理函数
   * @param point
   */
  moving(point) {
    if (!this.isProcessed) {
      this.curPoint = point;
      setTimeout(() => {
        this.callback(this);
        this.eventPoint = point;
      }, 0);
    }
  }

  /**
   * 事件处理
   */
  doEvent() {
    // 将事件从管理器中移除
    this.manager.moveQueue.splice(this.manager.moveQueue.indexOf(this), 1);
    super.doEvent();
  }
}
