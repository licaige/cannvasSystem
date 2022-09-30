/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 基本图形-空心扇形
 */
import Sector from './Sector';

export default class HollowSector extends Sector {
  constructor(canvas, option) {
    super(canvas, option)
    this.lineWidth = option.width || 5;
  }

  /**
   * 设置线框
   * @param _w
   */
  setLineWidth(_w) {
    this.lineWidth = _w;
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
    painter.lineTo(
      this.position.x / this.scaleX,
      this.position.y / this.scaleY
    );
    painter.closePath();
    painter.stroke();
  }
}
