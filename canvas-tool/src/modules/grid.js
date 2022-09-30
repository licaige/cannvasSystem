/**
 *
 * @param {*} centext canvas context对象
 * @param {*} color 线条颜色
 * @param {*} stepx x轴上间隔
 * @param {*} stepy y轴上间隔
 */
export function drawGrid(ele, color, stepx, stepy) {
  let { context } = ele;
  context.save();
  context.strokeStyle = color;
  context.lineWidth = 0.5;

  for (let i = stepx + 0.5; i < context.canvas.width; i += stepx) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, context.canvas.height);
    context.stroke();
  }
  for (let i = stepy + 0.5; i < context.canvas.height; i += stepy) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(context.canvas.width, i);
    context.stroke();
  }
  context.restore();
}
