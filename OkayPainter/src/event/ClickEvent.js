/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 点击事件
 */
import Event from './Event';

export default class ClickEvent extends Event {
  constructor(_callback) {
    super(Event.EVENT_CLICK, _callback);
    this.startTime = new Date().getTime();
  }

  /**
   * 事件处理
   */
  doEvent() {
    const endTime = new Date().getTime();
    if (endTime - this.startTime < 1500) {
      // 当前时间小于1.5s为click事件
      this.callback(this);
    }
    super.doEvent();
  }
}
