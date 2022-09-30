export function drawPath(ele, points) {
  let { context } = ele;
  let { x, y } = points[0];
  context.beginPath();
  context.moveTo(x, y);
  for (let i = 1; i < points.length; i++) {
    let { x, y } = points[i];
    context.lineTo(x, y);
  }
  context.strokeStyle = '#000';
  context.stroke();
}
