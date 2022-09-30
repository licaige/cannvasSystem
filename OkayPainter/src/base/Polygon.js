/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 基本图形-多边形
 */
import Node from '../core/Node';
import Color from '../core/Color';

export default class Polygon extends Node {
  constructor(canvas, options) {
    super(canvas);
    this.points = options.points || [];
    this.color = new Color(options.color);
  }

  /**
   * 绘制函数
   * @param painter
   */
  draw(painter) {
    if (this.points.length === 0) {
      return;
    }
    painter.fillStyle = this.color.getColor();
    painter.beginPath();
    painter.moveTo(this.position.x + this.points[0].x, -this.points[0].y + this.position.y);
    for (let i = 1; i < this.points.length; i++) {
      painter.lineTo(this.points[i].x + this.position.x, -this.points[i].y + this.position.y);
    }
    painter.closePath();
    painter.fill();
  }
  /**
   * 点击检测
   * @param point
   * @returns {boolean}
   */
  containsPoint(point) {
    let maxX = this.points[0].x, minX = this.points[0].x;
    let maxY = this.points[0].y, minY = this.points[0].y;
    for (let i = 0; i < this.points.length; i++) {
      if (maxX < this.points[i].x) {
        maxX = this.points[i].x;
      }
      if (minX > this.points[i].x) {
        minX = this.points[i].x;
      }
      if (maxY < this.points[i].y) {
        maxY = this.points[i].y;
      }
      if (minY > this.points[i].y) {
        minY = this.points[i].y;
      }
    }
    return point.x <= this.position.x + maxX
      && point.x >= this.position.x + minX
      && point.y >= this.position.y + minY
      && point.y <= this.position.y + maxY;
  }
}
