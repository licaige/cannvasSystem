import { EventNames, Listener, Shape } from './types';
import { createId } from '../helpers';

export default class Base implements Shape {
  private listeners: { [eventName: string]: Listener[] };
  public id: string;
  // 每当创建一个实例时，实例内部均会默认添加一个 id，可通过 getId 获取
  constructor() {
    this.id = createId();
    this.listeners = {};
  }
  //用于绘制内容，需要将 canvas 上下文 CanvasRenderingContext2D 传入，需要多传入一个影子画布的上下文
  draw(ctx: CanvasRenderingContext2D, osCtx: OffscreenCanvasRenderingContext2D): void {
    throw new Error('Method not implemented.');
  }
  //用于事件监听，收集到的事件回调会以事件名eventName为 key，回调函数数组为 value 的形式存放在一个对象当中，此外我们还用了枚举类型定义了所有事件
  // typescript export enum EventNames { click = 'click', mousedown = 'mousedown',
  // mousemove = 'mousemove', mouseup = 'mouseup', mouseenter = 'mouseenter', mouseleave = 'mouseleave', }
  on(eventName: EventNames, listener: Listener): void {
    if (this.listeners[eventName]) {
      //如果某类型实例的事件已经有了，就再添加
      this.listeners[eventName].push(listener);
    } else {
      //如果没有，就创建新的
      this.listeners[eventName] = [listener];
    }
  }
  // 获取此形状上所有的监听事件
  getListeners(): { [name: string]: Listener[] } {
    return this.listeners;
  }

  getId(): string {
    return this.id;
  }
}
