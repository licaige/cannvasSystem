/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 鼠标按下事件
 */
import Event from './Event';

export default class MouseDownEvent extends Event {
  constructor(callback) {
    super(Event.EVENT_MOUSE_DOWN, callback);
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
