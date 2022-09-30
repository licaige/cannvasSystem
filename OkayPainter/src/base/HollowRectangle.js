/*
 * @Date: 2019-12-2
 * @Author: xuechengwu <xuechengwu@erayt.com>
 * @Description: 基本图形-空心长方形
 */
import Rectangle from './Rectangle';

export default class HollowRectangle extends Rectangle {
  constructor(canvas, option) {
    super(canvas, option);
    this.borderWidth = option.borderWidth;
  }

  /**
   * 设置Border宽度
   * @param width
   */
  setBorderWidth(width) {
    this.borderWidth = width;
  }

  /**
   * 绘制函数
   * @param painter
   */
  draw(painter) {
    painter.strokeStyle = this.color.getColor();
    painter.lineWidth = this.borderWidth;
    painter.strokeRect(this.position.x, this.position.y + this.height, this.width, this.height);
  }
}
