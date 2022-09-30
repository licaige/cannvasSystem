/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 基本图形-折线
 */
import Node from '../core/Node';
import Color from '../core/Color';

export default class MultiLine extends Node {
  constructor(canvas, points) {
    super(canvas)
    this.color = new Color(0, 0, 0, 255)
    this.points = points;
    this.lineWidth = 1;
  }

  /**
   * 设置线宽
   * @param _w
   */
  setLineWidth(_w) {
    this.lineWidth = _w;
  }

  /**
   * 设置颜色
   * @param _c
   */
  setColor(_c) {
    this.color = _c;
  }

  /**
   * 绘制函数
   * @param painter
   */
  draw(painter) {
    if (this.points.length === 0) {
      return;
    }
    painter.beginPath();
    painter.fillStyle = this.color.getColor();
    painter.strokeStyle = this.color.getColor();
    painter.lineWidth = this.lineWidth;
    painter.moveTo(this.points[0].x, -this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      painter.lineTo(this.points[i].x, -this.points[i].y);
    }
    painter.stroke();
    painter.closePath();
  }
}
