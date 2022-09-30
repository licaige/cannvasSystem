import { drawPath } from './drawPath';

let ismousedown = false;

export function turnOnBrush(ele) {
  let { context } = ele;
  let canvas = context.canvas;
  context.save();

  context.strokeStyle = '#333';

  canvas.addEventListener('mousedown', pencilStart);

  document.body.addEventListener('mouseup', mouseup);

  let start = {};
  let points = [];
  function pencilStart(e) {
    ismousedown = true;
    start = convertPos(e.x, e.y);
    points.push(start);
    context.beginPath();
    context.moveTo(start.x, start.y);
    canvas.addEventListener('mousemove', mousemove);
  }

  function mousemove(e) {
    let target = convertPos(e.x, e.y);
    points.push(target);
    if (ismousedown) {
      context.lineTo(target.x, target.y);
      context.stroke();
    }
  }

  function mouseup(e) {
    if (ismousedown) {
      context.restore();
      ele.pathStack.push({
        method: drawPath,
        params: [points],
      });
      points = [];
      canvas.removeEventListener('mousemove', mousemove);
    }
    ismousedown = false;
  }

  function convertPos(x, y) {
    let box = canvas.getBoundingClientRect();

    return {
      x: x - (box.left * canvas.width) / box.width,
      y: y - (box.top * canvas.height) / box.height,
    };
  }
}
