/**
 *
 * @param {*} context canvas2d
 * @param {*} margin 坐标边距
 */

export function drawAxis(ele, margin) {
  let context = ele.context;
  context.save();
  context.strokeStyle = '#000';
  const ORIGIN = { x: margin, y: context.canvas.height - margin };
  context.beginPath();
  context.moveTo(ORIGIN.x, ORIGIN.y);
  context.lineTo(context.canvas.width - margin, ORIGIN.y);
  drawAngle(context, { x: context.canvas.width - margin, y: ORIGIN.y }, 'right');
  context.moveTo(ORIGIN.x, ORIGIN.y);
  context.lineTo(ORIGIN.x, margin);
  drawAngle(context, { x: ORIGIN.x, y: margin }, 'top');
  context.stroke();
}

/**
 *
 * @param {*} context canvas2d
 * @param {*} origin 箭头起始位置
 * @param {*} direction 箭头方向
 */
function drawAngle(context, origin, direction) {
  context.moveTo(origin.x, origin.y);
  switch (direction) {
    case 'left':
      context.lineTo(
        origin.x + 5 * Math.cos((1 / 6) * Math.PI),
        origin.y + Math.sin((1 / 6) * Math.PI) * 5,
      );
      context.moveTo(origin.x, origin.y);
      context.lineTo(
        origin.x + 5 * Math.cos((1 / 6) * Math.PI),
        origin.y - Math.sin((1 / 6) * Math.PI) * 5,
      );
      break;
    case 'right':
      context.lineTo(
        origin.x - 5 * Math.cos((1 / 6) * Math.PI),
        origin.y + Math.sin((1 / 6) * Math.PI) * 5,
      );
      context.moveTo(origin.x, origin.y);
      context.lineTo(
        origin.x - 5 * Math.cos((1 / 6) * Math.PI),
        origin.y - Math.sin((1 / 6) * Math.PI) * 5,
      );
      break;
    case 'top':
      context.lineTo(
        origin.x - 5 * Math.sin((1 / 6) * Math.PI),
        origin.y + Math.cos((1 / 6) * Math.PI) * 5,
      );
      context.moveTo(origin.x, origin.y);
      context.lineTo(
        origin.x + 5 * Math.sin((1 / 6) * Math.PI),
        origin.y + Math.cos((1 / 6) * Math.PI) * 5,
      );
      break;
    case 'bottom':
      context.lineTo(
        origin.x - 5 * Math.sin((1 / 6) * Math.PI),
        origin.y - Math.cos((1 / 6) * Math.PI) * 5,
      );
      context.moveTo(origin.x, origin.y);
      context.lineTo(
        origin.x + 5 * Math.sin((1 / 6) * Math.PI),
        origin.y - Math.cos((1 / 6) * Math.PI) * 5,
      );
      break;
    default:
      break;
  }
  context.restore();
}
