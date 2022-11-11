import { Stage, Rect, Circle, EventNames } from './canvas-event-system';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
//创建舞台
const stage = new Stage(canvas);
// 生成形状
const rect = new Rect({
  x: 50,
  y: 50,
  width: 250,
  height: 175,
  fillColor: 'green',
});

const circle = new Circle({
  x: 200,
  y: 200,
  radius: 100,
  fillColor: 'red',
});
// 监听点击事件
rect.on(EventNames.mousedown, () => console.log('rect mousedown'));
rect.on(EventNames.mouseup, () => console.log('rect mouseup'));
rect.on(EventNames.mouseenter, () => console.log('rect mouseenter'));
rect.on(EventNames.click, () => console.log('rect click'));

circle.on(EventNames.click, () => console.log('circle click!!'));
circle.on(EventNames.mouseleave, () => console.log('circle mouseleave!'));
// 将形状添加至舞台，即可渲染到画布上
stage.add(rect);
stage.add(circle);

