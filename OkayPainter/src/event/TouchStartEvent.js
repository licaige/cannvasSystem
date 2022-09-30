/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: TouchStart
 */
import Event from './Event';

export default class TouchStartEvent extends Event {
  constructor(callback) {
    super(Event.EVENT_TOUCH_START, callback);
    setTimeout(() => {
      this.doEvent();
    }, 0);
  }

  /**
   * 事件处理
   */
  doEvent() {
    this.callback(this);
    super.doEvent();
  }
}
