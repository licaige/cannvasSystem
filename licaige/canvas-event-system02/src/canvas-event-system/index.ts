import { rgbaToId } from './helpers';
import { Shape } from './shapes/types';
import EventSimulator, { ActionType } from './EventSimulator';
export * from './shapes';

export class Stage {
  private canvas: HTMLCanvasElement;
  private osCanvas: OffscreenCanvas;
  private ctx: CanvasRenderingContext2D;
  private osCtx: OffscreenCanvasRenderingContext2D;
  private dpr: number;
  private shapes: Set<string>;
  private eventSimulator: EventSimulator;

  constructor(canvas: HTMLCanvasElement) {
    // 解决 canvas 在高清屏上的模糊问题
    const dpr = window.devicePixelRatio;
    canvas.width = parseInt(canvas.style.width) * dpr;
    canvas.height = parseInt(canvas.style.height) * dpr;

    this.canvas = canvas;
    this.osCanvas = new OffscreenCanvas(canvas.width, canvas.height);

    this.ctx = this.canvas.getContext('2d');
    this.osCtx = this.osCanvas.getContext('2d');

    this.ctx.scale(dpr, dpr);
    this.osCtx.scale(dpr, dpr);
    this.dpr = dpr;

    this.canvas.addEventListener('mousedown', this.handleCreator(ActionType.Down));
    this.canvas.addEventListener('mouseup', this.handleCreator(ActionType.Up));
    this.canvas.addEventListener('mousemove', this.handleCreator(ActionType.Move));
   // 通过一个 Set 保存所有 add 进来的形状元素
    this.shapes = new Set();
    this.eventSimulator = new EventSimulator();
  }

  add(shape: Shape) {
    const id = shape.getId();
    this.eventSimulator.addListeners(id, shape.getListeners());
    this.shapes.add(id);

    shape.draw(this.ctx, this.osCtx);
  }

  private handleCreator = (type: ActionType) => (evt: MouseEvent) => {
    const x = evt.offsetX;
    const y = evt.offsetY;
    // 根据 x, y 拿到当前被选中的 id
    const id = this.hitJudge(x, y);
    this.eventSimulator.addAction({ type, id }, evt);
  };
  /**
   * Determine whether the current position is inside a certain shape, if it is, then return its id
   * @param x
   * @param y
   */
  private hitJudge(x: number, y: number): string {
    const rgba = Array.from(this.osCtx.getImageData(x * this.dpr, y * this.dpr, 1, 1).data);

    const id = rgbaToId(rgba as [number, number, number, number]);
    return this.shapes.has(id) ? id : undefined;
  }
}
/*
*
*在 Stage 的实现中，我们做了三件事情：
解决了 canvas 在高清屏上的模糊问题，由于不是本文讨论范围，这里略过；
对画布监听了三个事件mousedown、 mouseup和mousemove，之所以监听是因为后面其他事件的模拟判断均和它们有关，
* 此外，由于三者接下来的处理逻辑相似度非常高，为代码复用，故使用handleCreator统一逻辑处理，并使用ActionType加以区分不同类型
实现了add方法，在案例中我们通过调用stage.add(rect)实现内容绘制，本质上add会在内部调用形状的draw方法，并把绘制上下文传入，由具体形状控制内部的内容展示
*
* */
//参考地址
// https://zhuanlan.zhihu.com/p/269437630
