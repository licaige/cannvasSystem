/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 长点击函数
 */
import Event from './Event';

export default class LongClickEvent extends Event {
  constructor(callback) {
    super(Event.EVENT_LONG_CLICK, callback);
    this.startTime = new Date().getTime();
    // 两秒之后未进行处理，则执行长点击处理
    setTimeout(() => {
      if (!this.isProcessed) {
        this.doEvent();
      }
    }, 1200);
  }

  /**
   * 事件处理
   */
  doEvent() {
    const endTime = new Date().getTime();
    if (endTime - this.startTime > 1000) {
      this.callback(this);
    }
    super.doEvent();
  }
}
