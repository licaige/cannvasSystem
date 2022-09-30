/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 基本图形-虚线
 */
import Line from './Line';

export default class DashLine extends Line {
  constructor(canvas, option) {
    super(canvas, option);
    this.dashLine = option.dashLine || [1, 4];
  }

  /**
   * 设置虚线样式
   * @param dash
   */
  setLineDash(dash) {
    this.dashLine = dash;
  }

  /**
   * 绘制函数
   * @param painter
   */
  draw(painter) {
    painter.beginPath();
    painter.fillStyle = this.color.getColor();
    painter.strokeStyle = this.color.getColor();
    painter.lineWidth = this.width;
    painter.setLineDash(this.dashLine);
    painter.moveTo(this.from.x, -this.from.y);
    painter.lineTo(this.to.x, -this.to.y);
    painter.closePath();
    painter.stroke();

  }
}
