/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 基本图形-空心圆
 */
import HollowSector from './HollowSector';

export default class HollowCircle extends HollowSector {
  constructor(canvas, radius) {
    super(canvas, { radius });
  }

  /**
   * 检测点击点
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

  /**
   * 绘制函数
   * @param painter
   */
  draw(painter) {
    painter.beginPath();
    painter.strokeStyle = this.color.getColor();
    painter.lineWidth = this.lineWidth;
    painter.arc(
      this.position.x / this.scaleX,
      this.position.y / this.scaleY,
      this.radius,
      this.start, this.stop
    );
    painter.stroke();
  }
}
