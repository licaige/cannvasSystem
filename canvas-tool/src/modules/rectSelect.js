let ismousedown = false;

export function rectSelect(ele) {
  let { context } = ele;

  let copyState = [];
  ele.pathStack.forEach(element => {
    copyState.push(element);
  });
  console.log(copyState);
  context.save();
  let canvas = context.canvas;

  canvas.addEventListener('mousedown', rectStart);

  document.body.addEventListener('mouseup', mouseup);

  let start = {};

  function rectStart(e) {
    ismousedown = true;

    start = convertPos(e.x, e.y);
    context.beginPath();
    context.moveTo(start.x, start.y);
    canvas.addEventListener('mousemove', mousemove);
  }

  function mousemove(e) {
    let target = convertPos(e.x, e.y);
    if (ismousedown) {
      ele.pathStack = copyState;
      ele.recover();
      context.setLineDash([4, 2]);
      context.strokeRect(start.x, start.y, target.x - start.x, target.y - start.y);
      context.restore();
      context.setLineDash([]);
    }
  }

  function mouseup(e) {
    ismousedown = false;
    canvas.removeEventListener('mousemove', mousemove);
  }

  function convertPos(x, y) {
    let box = canvas.getBoundingClientRect();

    return {
      x: x - (box.left * canvas.width) / box.width,
      y: y - (box.top * canvas.height) / box.height,
    };
  }
}
