/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 动作基类，其他动作需要继承该类
 */
export default class Action {
  constructor(_duration) {
    this.running = true;
    this.duration = _duration * 60;
    this.currentFrame = _duration * 60;
    this.runSpeed = 1;
  }

  /**
   * 运行函数
   * @param node
   * @param callback
   */
  run(node, callback) {
    callback && callback(node, this);
    if (this.running) {
      this.update(node, this.currentFrame);
      this.currentFrame = this.currentFrame - this.runSpeed;
      if (this.currentFrame > 0 && this.running) {
        setTimeout(() => {
          this.run(node, callback);
        }, node.canvas.fps ? (1000 / node.canvas.fps) : (1000 / 60));
      }
    }
  }

  /**
   * 停止动画
   */
  stop() {
    this.running = false;
    this.currentFrame = this.duration;
  }

  /**
   * 更新接口，需要子类实现
   * @param node
   * @param frame
   */
  update(node, frame) {

  }

  /**
   * 动作重启函数
   * @param node
   */
  restart(node) {
    this.running = true;
    this.run(node);
  }

  /**
   * 动作重置
   * @param node
   */
  reset(node) {
    this.currentFrame = this.duration;
    this.running = true;
    this.run(node);
  }
}
