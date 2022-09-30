export default class Vector {
  static fromPoints(p1, p2) {
    return new Vector(p2.x - p1.x, p2.y - p1.y);
  }
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  square() {
    const { x, y } = this;
    return x * x + y * y;
  }
  length() {
    return Math.sqrt(this.square());
  }
  add(q) {
    const { x, y } = this;
    return new Vector(x + q.x, y + q.y);
  }
  minus() {
    const { x, y } = this;
    return new Vector(x - q.x, y - q.y);
  }
  multipy(scale) {
    const { x, y } = this;
    return new Vector(x * scale, y * scale);
  }
  // 求单位矢量
  normalize(len) {
    len = len ?? 1;
    return this.multipy(len / this.length());
  }
}
