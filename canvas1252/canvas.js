import { Bus } from "./event.js";
import { drawtext } from "./utils.js";

export class Canvas {
  constructor(
    el,
    { type = "2d", color = "#000", lineWidth = 1, lineCap = "butt" } = {}
  ) {
    this.elements = []; // 缓存节点数据
    this.mouse = {
      status: "up",
    };
    this.color = color;
    this.lineWidth = lineWidth;
    this.lineCap = lineCap;
    this.canvas = document.querySelector(el);
    this.ctx = this.canvas.getContext(type);
    this.imgData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.bus = new Bus();
    this.canvas.addEventListener("mousedown", this.eventSystem("mousedown"));
    this.canvas.addEventListener("mouseup", this.eventSystem("mouseup"));
    this.canvas.addEventListener("mousemove", this.eventSystem("mousemove"));
  }
  eventSystem(event) {
    return (e) => {
      if (event === "mousedown") this.mouse.status = "down";
      if (event === "mouseup") this.mouse.status = "up";
      this.bus.emit(event, {
        x: e.offsetX,
        y: e.offsetY,
        ctx: this.ctx,
        mouse: this.mouse,
        elements: this.elements,
      });
    };
  }
  collections({ id, type, props }) {
    const index = this.findIndex(id);
    if (index > -1) {
      this.elements.splice(index, 1, { id, type, props });
    } else {
      this.elements.push({ id, type, props });
    }
  }
  drag(id) {
    this.on("mousemove", (e) => {
      if (e.mouse.status === "down") {
        this.clear();
        const element = this.find(id);
        element.props.x = e.x;
        element.props.y = e.y;
        this.draw();
      }
    });
  }
  /**
   * 矩形框
   * @param {} param0
   * @returns
   */
  rect({ x, y, w, h, fillStyle }, id) {
    this.ctx.fillStyle = fillStyle ?? this.color;
    this.ctx.fillRect(x, y, w, h);
    this.collections({
      id,
      type: "rect",
      props: { x, y, w, h, fillStyle },
    });
    return this;
  }
  /**
   * 线框
   * @param {lineWidth} 线宽
   * @param {lineCap} 闭合类型 butt(直角)round(圆角)square(外直角)
   * @returns
   */
  stroke({ x, y, w, h, strokeStyle, lineWidth, lineCap }, id) {
    this.ctx.strokeStyle = strokeStyle ?? this.color;
    this.ctx.lineWidth = lineWidth ?? this.lineWidth;
    this.ctx.lineCap = lineCap ?? this.lineCap;
    this.ctx.strokeRect(x, y, w, h);
    this.collections({
      id,
      type: "stroke",
      props: { x, y, w, h, strokeStyle, lineWidth, lineCap },
    });
    return this;
  }
  /**
   * 圆角矩形线框
   * @param {fill} 圆角矩形或框
   * @param {clip} 圆是否裁剪
   * @returns
   */
  roundrect(
    { x, y, w, h, r, fillStyle, strokeStyle, lineWidth = 1, clip = false },
    id
  ) {
    if (w < 2 * r) {
      r = w / 2;
    }
    if (h < 2 * r) {
      r = h / 2;
    }
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = fillStyle;
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.lineWidth = lineWidth ?? this.lineWidth;
    this.ctx.arc(x + r, y + r, r, this.getAngle(180), this.getAngle(270));
    this.ctx.moveTo(x + r, y);
    this.ctx.lineTo(x + w - r, y);
    this.ctx.arc(x + w - r, y + r, r, this.getAngle(270), this.getAngle(360));
    this.ctx.lineTo(x + w, y + h - r);
    this.ctx.arc(x + w - r, y + h - r, r, 0, this.getAngle(90));
    this.ctx.lineTo(x + r, y + h);
    this.ctx.arc(x + r, y + h - r, r, this.getAngle(90), this.getAngle(180));
    this.ctx.lineTo(x, y + r);
    if (fillStyle) this.ctx.fill();
    if (strokeStyle) this.ctx.stroke();
    if (clip) {
      this.ctx.clip();
    }
    this.ctx.closePath();
    this.collections({
      id,
      type: "roundrect",
      props: { x, y, w, h, r, fillStyle, strokeStyle, lineWidth, clip },
    });
    return this;
  }
  /**
   * 划线
   * @param {path} 路径
   * @param {lineWidth} 线宽
   * @param {lineJoin} 设置末端为 round(圆角) bevel(平角)
   * @param {lineCap} 设置末端为 round(圆角) square(平角)
   * @returns
   */
  line(
    {
      path = [],
      strokeStyle,
      lineWidth,
      lineCap = "round",
      lineJoin = "round",
    },
    id
  ) {
    this.ctx.beginPath();
    path.forEach((i, k) => {
      this.ctx.strokeStyle = i.strokeStyle ?? strokeStyle ?? this.color;
      this.ctx.lineWidth = i.lineWidth ?? lineWidth ?? this.lineWidth;
      this.ctx.lineJoin = i.lineJoin ?? lineJoin;
      this.ctx.lineCap = i.lineCap ?? lineCap ?? this.lineCap;
      this.ctx.moveTo(i.x, i.y);
      if (path[k + 1]) {
        this.ctx.lineTo(path[k + 1].x, path[k + 1].y);
      }
      this.ctx.stroke();
    });
    this.collections({
      id,
      type: "line",
      props: { path, strokeStyle, lineWidth, lineCap, lineJoin },
    });
    return this;
  }
  /**
   * 圆弧绘制
   * @param {startAngle} 开始的弧度
   * @param {endAngle} 结束的弧度
   * @param {anticlockwise} true为逆时针，false为顺时针
   * @param {close} 是否封闭
   */
  arc(
    {
      x,
      y,
      r,
      fillStyle,
      strokeStyle,
      startAngle,
      endAngle,
      anticlockwise = false,
      close = false,
      lineWidth,
      lineCap,
    },
    id
  ) {
    this.ctx.fillStyle = fillStyle;
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.lineWidth = lineWidth ?? this.lineWidth;
    this.ctx.lineCap = lineCap ?? this.lineCap;
    this.ctx.beginPath();
    this.ctx.arc(
      x - r,
      y - r,
      r,
      this.getAngle(startAngle),
      this.getAngle(endAngle),
      anticlockwise
    );
    if (close) {
      this.ctx.closePath();
    }
    if (fillStyle) this.ctx.fill();
    if (strokeStyle) this.ctx.stroke();
    this.collections({
      id,
      type: "arc",
      props: {
        x,
        y,
        r,
        fillStyle,
        strokeStyle,
        startAngle,
        endAngle,
        anticlockwise,
        close,
        lineWidth,
        lineCap,
      },
    });
    return this;
  }
  /**
   * 文本绘制
   * @param {style} param0
   * @returns
   */
  text(
    {
      x,
      y,
      t,
      fillStyle,
      maxWidth,
      style = "normal",
      variant = "small-caps",
      weight = "700",
      size = 14,
      lineHeight = 16,
      family = "Microsoft YaHei",
    },
    id
  ) {
    this.ctx.fillStyle = fillStyle;
    this.ctx.font = `${style} ${variant} ${weight} ${size}px ${family}`;
    drawtext(t, maxWidth ?? this.canvas.width).forEach((i, k) => {
      this.ctx.fillText(i.content, x, y + k * lineHeight);
    });
    this.collections({
      id,
      type: "text",
      props: {
        x,
        y,
        t,
        fillStyle,
        maxWidth,
        style,
        variant,
        weight,
        size,
        lineHeight,
        family,
      },
    });
    return this;
  }
  /**
   * 贝塞尔曲线
   * @param {*} param0
   */
  bezierCurveTo(
    {
      x1,
      y1,
      x2,
      y2,
      anglex1,
      angley1,
      anglex2,
      angley2,
      strokeStyle,
      lineWidth,
    },
    id
  ) {
    this.ctx.strokeStyle = strokeStyle ?? this.color;
    this.ctx.lineWidth = lineWidth ?? this.lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.bezierCurveTo(anglex1, angley1, anglex2, angley2, x2, y2);
    this.ctx.stroke();
    this.collections({
      id,
      type: "bezierCurveTo",
      props: {
        x1,
        y1,
        x2,
        y2,
        anglex1,
        angley1,
        anglex2,
        angley2,
        strokeStyle,
      },
    });
    return this;
  }
  /**
   * 图片绘制
   * @param {src} 图片源
   * @param {x} 在画布上放置图像的 x 坐标位置。
   * @param {y} 在画布上放置图像的 y 坐标位置。
   * @returns image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
   */
  img({ src = "", x, y }, id) {
    if (!src) return this;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      this.ctx.drawImage(img, x, y);
    };
    this.collections({
      id,
      type: "img",
      props: { src, x, y },
    });
    return this;
  }
  on(name, callback) {
    this.bus.on(name, callback);
    return this;
  }
  clear({ x = 0, y = 0, w, h } = {}) {
    this.ctx.clearRect(x, y, w ?? this.canvas.width, h ?? this.canvas.height);
    return this;
  }
  download(compress = 1) {
    const dataURL = this.canvas.toDataURL("image/png", compress);
    const a = document.createElement("a");
    const event = new MouseEvent("click");
    a.download = "压缩图片";
    a.href = dataURL;
    a.dispatchEvent(event);
    return this;
  }
  up(id) {
    const index = this.findIndex(id);
    const item = this.elements.splice(index, 1);
    this.elements.push(...item);
  }
  down(id) {
    const index = this.findIndex(id);
    const item = this.elements.splice(index, 1);
    this.elements.unshift(...item);
  }
  find(id) {
    return this.elements.find((i) => i.id === id);
  }
  findIndex(id) {
    return this.elements.findIndex((i) => i.id === id);
  }
  draw(arr) {
    (arr || this.elements).forEach((i) => {
      this[i.type](i.props, i.id);
    });
  }
  /**
   * canvas转换为文件
   * @param {*} filename
   * @returns
   */
  file(filename = "canvas") {
    const dataURL = this.canvas.toDataURL("image/png", 1);
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  // 角度转换成弧度
  getAngle(arc) {
    return Math.PI * (arc / 180);
  }
}
