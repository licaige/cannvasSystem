import { idToRgba } from '../helpers';
import Base from './Base';

interface RectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
}

export default class Rect extends Base {
  constructor(private props: RectProps) {
    super();
    this.props.fillColor = this.props.fillColor || '#fff';
    this.props.strokeColor = this.props.strokeColor || '#000';
    this.props.strokeWidth = this.props.strokeWidth || 1;
  }

  draw(ctx: CanvasRenderingContext2D, osCtx: OffscreenCanvasRenderingContext2D) {
    const { x, y, width, height, strokeColor, strokeWidth, fillColor } = this.props;

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.fillStyle = fillColor;
    ctx.rect(x, y, width, height);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    //这个id就是通过r, g, b, a拼装出来的，可以相互进行查找
    const [r, g, b, a] = idToRgba(this.id);
    // 为保持两个画布的同步，每当在 ctx 绘制一个矩形时，也要在 osCtx 同步绘制
    osCtx.save();
    osCtx.beginPath();
    osCtx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    osCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    osCtx.rect(x, y, width, height);
    osCtx.fill();
    osCtx.stroke();
    osCtx.restore();
  }
}
