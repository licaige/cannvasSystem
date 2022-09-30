/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 基本图形-文本
 */
import Node from '../core/Node';
import Color from '../core/Color';

export default class Text extends Node{
  constructor(canvas, option) {
    super(canvas);
    this.text = option.text || '';
    this.font = option.font;
    this.size = option.size;
    this.color = new Color(option.color || '#000000FF');
  }

  /**
   * 设置颜色
   * @param color
   */
  setColor(color) {
    this.color = color;
  }

  /**
   * 设置大小
   * @param size
   */
  setSize(size) {
    this.size = size;
  }

  /**
   * 设置字体
   * @param font
   */
  setFont(font) {
    this.font = font;
  }

  /**
   * 点击检测
   * @param point
   * @returns {boolean}
   */
  containsPoint(point) {
    return point.x >= this.position.x
      && point.x <= this.position.x + this.text.length * parseInt(this.size)
      && point.y >= this.position.y
      && point.y <= this.position.y + parseInt(this.size);
  }

  draw(painter) {
    painter.font = `${this.size}px ${this.font}`;
    painter.fillStyle = this.color.getColor();
    painter.fillText(this.text, this.position.x / this.scaleX, this.position.y / this.scaleY);
  }
}
