/*
* @Date: 2020/3/12
* @Author: XueChengwu <xuechengwu@erayt.com>
* @Copyright: 2015-2019 Erayt, Inc.
* @Description: If you have some questions, please contact: xuechengwu@erayt.com.
*/
import Node from '../core/Node';
import Color from "ochart/core/Color";
import Point from "ochart/core/Point";

export default class Star extends Node {
  constructor(canvas, option) {
    super(canvas);
    this.color = new Color(option.color || '#000000FF');
    this.from = option.from || new Point(0, 0);
    this.to = option.to || new Point(0, 0);
    this.width = option.width || 1;
  }

  draw(painter) {
    painter.fillStyle = this.color.getColor();
    painter.beginPath();
    painter.arc(
      this.position.x / this.scaleX,
      this.position.y / this.scaleY,
      this.radius,
      this.start,
      this.stop
    );
    painter.lineTo(
      this.position.x / this.scaleX,
      this.position.y / this.scaleY
    );
    painter.closePath();
    painter.fill();
  }
}
