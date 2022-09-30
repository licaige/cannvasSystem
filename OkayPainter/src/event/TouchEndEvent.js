/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: TouchStart 事件
 */
import Event from './Event';

export default class TouchEndEvent extends Event {
  constructor(callback) {
    super(Event.EVENT_TOUCH_END, callback);
    setTimeout(() => {
      this.doEvent();
    }, 0);
  }

  /**
   * 事件处理
   */
  doEvent() {
    if (!this.isProcessed) {
      this.callback(this);
    }
    super.doEvent();
  }
}
