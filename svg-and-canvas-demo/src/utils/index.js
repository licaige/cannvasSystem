// 1, 6
export function random(min, max) {
  // [0, 1)
  let temp = Math.floor(Math.random() * (max - min + 1)) + min;
  return temp;
}

export function randomRGB() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
}

export function drawStar(ctx, x, y, scale, style) {
  ctx.beginPath();
  ctx.save();
  // ctx.fillStyle = style;
  ctx.scale(scale, scale);
  ctx.fillText("*", x, y, style);
  ctx.fill();
  ctx.restore();
}
