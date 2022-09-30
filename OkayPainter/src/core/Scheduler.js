/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 框架——线程类
 */
export default class Scheduler {
  constructor(_scheduler, _callback) {
    this.scheduler = _scheduler;
    this.callback = _callback;
  }
}
