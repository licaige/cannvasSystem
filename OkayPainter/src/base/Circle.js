/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 基本图形-半圆
 */
import Sector from './Sector';

export default class Circle extends Sector {
  constructor(canvas, radius) {
    super(canvas, { radius });
  }

  /**
   * 点击检测
   * @param _p
   * @returns {boolean}
   */
  containsPoint(_p) {
    const dist = (_p.x - this.position.x)
      * (_p.x - this.position.x)
      + (_p.y - this.position.y)
      * (_p.y - this.position.y);
    return dist <= (this.radius + 15) * (this.radius + 15);
  }
}
