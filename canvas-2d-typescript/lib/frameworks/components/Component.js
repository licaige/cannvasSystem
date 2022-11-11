var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DisplayObject, InvalidateProperties } from './DisplayObject';
import { MouseEvent } from '../events/MouseEvent';
import { Rectangle } from '../types/Rectangle';
import { Padding } from '../types/Padding';
import { FontStyle } from '../types/FontStyle';
import { BorderStyle } from '../types/BorderStyle';
export const mergeBound = (bound, offset, border = 0) => {
    let { top, bottom, left, right } = offset;
    top += border;
    bottom += border;
    left += border;
    right += border;
    return new Rectangle({
        x: bound.x + left,
        y: bound.y + top,
        width: bound.width - (left + right),
        height: bound.height - (top + bottom),
    });
};
export class Component extends DisplayObject {
    constructor() {
        super();
        this.margin = new Padding();
        this.padding = new Padding();
        this.font = new FontStyle();
        this.border = new BorderStyle();
        this.enable = true;
        this.setMargin(new Padding({ top: 1, bottom: 1, left: 1, right: 1 }));
    }
    initializeListeners() {
        super.initializeListeners();
        if (this.mouseEnabled) {
            this.on(MouseEvent.MOUSE_CLICK, (e) => this.handleMouseEvent(e))
                .on(MouseEvent.MOUSE_MOVE, (e) => this.handleMouseEvent(e))
                .on(MouseEvent.MOUSE_ENTER, (e) => this.handleMouseEvent(e))
                .on(MouseEvent.MOUSE_LEAVE, (e) => this.handleMouseEvent(e));
        }
    }
    handleMouseEvent(event) {
        switch (event.type) {
            case MouseEvent.MOUSE_CLICK:
                this.onMouseClick(event);
                break;
            case MouseEvent.MOUSE_MOVE:
                this.onMouseMove(event);
                break;
            case MouseEvent.MOUSE_ENTER:
                this.onMouseEnter(event);
                break;
            case MouseEvent.MOUSE_LEAVE:
                this.onMouseLeave(event);
                break;
        }
    }
    onMouseClick(event) { }
    onMouseMove(event) { }
    onMouseEnter(event) { }
    onMouseLeave(event) { }
    findMouseEventHandler(p) {
        return this.isPointInPath(p) ? this : undefined;
    }
    isPointInPath(p) {
        const { x, y, width, height } = this.outerBound;
        const g = this.graphics;
        g.beginPath();
        g.rect(x, y, width, height);
        return this.mouseEnabled && this.enable && this.graphics && g.isPointInPath(p.x, p.y);
    }
    render() {
        // graphicsManager.render(this);
        this.graphics.renderer.onPaint();
    }
    onPaint() {
        const g = this.graphics;
        this.drawBackground(g);
        this.drawBorder(g);
        this.beforePaint(g);
        this.paint(g);
        this.afterPaint(g);
    }
    drawBackground(g) {
        let { enable } = this.background;
        if (enable) {
            const { x, y, width, height } = this.outerBound;
            g.save();
            g.translate(x, y);
            g.beginPath();
            g.rect(0, 0, width, height);
            g.fillStyle = this.getBackgroundStyle();
            g.fill();
            g.restore();
        }
    }
    drawBorder(g) {
        let { enable, size, color } = this.border;
        if (enable && size > 0) {
            const { x, y, width, height } = this.outerBound;
            let outX = size * 0.5;
            let outY = size * 0.5;
            g.save();
            g.translate(x, y);
            g.beginPath();
            g.strokeStyle = color;
            g.lineWidth = size * 0.5;
            g.rect(outX, outY, width - size, height - size);
            g.stroke();
            g.restore();
        }
    }
    beforePaint(g) {
        const { x, y, width, height } = this.innerBound;
        g.save();
        g.translate(x, y);
        g.beginPath();
        g.rect(0, 0, width, height);
        g.clip();
    }
    paint(g) { }
    afterPaint(g) {
        g.restore();
    }
    measure() {
        const { parent, margin, padding, border } = this;
        const px = this.getX(), py = this.getY(), pw = this.getWidth(), ph = this.getHeight();
        let g = this.graphics;
        let pBound = parent == undefined ? new Rectangle({ x: 0, y: 0, width: g.canvas.width, height: g.canvas.height }) : parent.innerBound;
        let x = pBound.x + pBound.width * Math.min(1, px);
        let y = pBound.y + pBound.height * Math.min(1, py);
        let w = pBound.width * Math.min(1, pw);
        let h = pBound.height * Math.min(1, ph);
        this.outerBound = mergeBound({ x: x, y: y, width: w, height: h }, margin, 0);
        this.innerBound = mergeBound(this.outerBound, padding, border.enable ? border.size : 0);
    }
    contains(c) {
        return c == this;
    }
    getMargin() {
        return this.margin;
    }
    setMargin(margin) {
        this.margin = margin;
    }
    getPadding() {
        return this.padding;
    }
    setPadding(padding) {
        this.padding = padding;
    }
    getBorder() {
        return this.border;
    }
    setBorder(border) {
        this.border = border;
    }
    getEnable() {
        return this.enable;
    }
    setEnable(enable) {
        this.enable = enable;
    }
    get outerBound() {
        return this._outerBound;
    }
    set outerBound(val) {
        this._outerBound = val;
    }
    get innerBound() {
        return this._innerBound;
    }
    set innerBound(val) {
        this._innerBound = val;
    }
    getFont() {
        return this.font;
    }
    setFont(font) {
        this.font = font;
    }
    get mouseEnabled() {
        return false;
    }
    get parent() {
        return this.parentObject;
    }
    set parent(parent) {
        this.parentObject = parent;
    }
}
__decorate([
    InvalidateProperties,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Padding]),
    __metadata("design:returntype", void 0)
], Component.prototype, "setMargin", null);
__decorate([
    InvalidateProperties,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Padding]),
    __metadata("design:returntype", void 0)
], Component.prototype, "setPadding", null);
__decorate([
    InvalidateProperties,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BorderStyle]),
    __metadata("design:returntype", void 0)
], Component.prototype, "setBorder", null);
__decorate([
    InvalidateProperties,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], Component.prototype, "setEnable", null);
__decorate([
    InvalidateProperties,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FontStyle]),
    __metadata("design:returntype", void 0)
], Component.prototype, "setFont", null);
//# sourceMappingURL=Component.js.map