/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 基本图形-矩形
 */
import Node from '../core/Node';
import Color from '../core/Color';

export default class Rectangle extends Node {
  constructor(canvas, option) {
    super(canvas);
    this.width = option.width || 0;
    this.height = option.height || 0;
    this.color = new Color(option.color || '#000000FF');
  }

  /**
   * 设置颜色
   * @param _c
   */
  setColor(_c) {
    this.color = _c;
  }

  /**
   * 设置大小
   * @param width
   * @param height
   */
  setSize(width, height) {
    this.width = width;
    this.height = height || this.height;
  }

  /**
   * 绘制函数
   * @param painter
   */
  draw(painter) {
    painter.fillStyle = this.color.getColor();
    painter.fillRect(this.position.x, this.position.y - this.height, this.width, this.height);
  }

  /**
   * 点击检测
   * @param point
   * @returns {boolean}
   */
  containsPoint(point) {
    return point.x <= this.position.x + this.width
        && point.x >= this.position.x
        && point.y >= this.position.y
        && point.y <= this.position.y + this.height;
  }
}
