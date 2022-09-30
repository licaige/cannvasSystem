/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 移动端点击事件
 */
import Event from './Event';

export default class TapEvent extends Event {
  constructor(callback) {
    super(Event.EVENT_TAP, callback);
    this.startTime = new Date().getTime();
  }

  /**
   * 事件处理
   */
  doEvent() {
    const endTime = new Date().getTime();
    console.log(endTime - this.startTime)
    if (endTime - this.startTime < 500) {
      // 当前时间小于1.5s为click事件
      this.callback(this);
    }
    super.doEvent();
  }
}
