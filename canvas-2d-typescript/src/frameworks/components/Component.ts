import { DisplayObject, InvalidateProperties } from './DisplayObject';
import { IComponent, Graphics } from './Core';
import { MouseEvent } from '../events/MouseEvent';
import { Rectangle } from '../types/Rectangle';
import { Padding } from '../types/Padding';
import { FontStyle } from '../types/FontStyle';
import { BorderStyle } from '../types/BorderStyle';
import { Point } from '../types/Point';

export const mergeBound = (bound: Rectangle, offset: Padding, border = 0): Rectangle => {
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

export class Component extends DisplayObject implements IComponent {
    protected enable: boolean;
    protected font: FontStyle;
    protected margin: Padding;
    protected border: BorderStyle;
    protected padding: Padding;

    private _outerBound: Rectangle;
    private _innerBound: Rectangle;

    constructor() {
        super();
        this.margin = new Padding();
        this.padding = new Padding();
        this.font = new FontStyle();
        this.border = new BorderStyle();
        this.enable = true;

        this.setMargin(new Padding({ top: 1, bottom: 1, left: 1, right: 1 }));
    }

    protected initializeListeners(): void {
        super.initializeListeners();

        if (this.mouseEnabled) {
            this.on(MouseEvent.MOUSE_CLICK, (e) => this.handleMouseEvent(<MouseEvent>e))
                .on(MouseEvent.MOUSE_MOVE, (e) => this.handleMouseEvent(<MouseEvent>e))
                .on(MouseEvent.MOUSE_ENTER, (e) => this.handleMouseEvent(<MouseEvent>e))
                .on(MouseEvent.MOUSE_LEAVE, (e) => this.handleMouseEvent(<MouseEvent>e));
        }
    }

    private handleMouseEvent(event: MouseEvent): void {
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

    protected onMouseClick(event: MouseEvent): void {}

    protected onMouseMove(event: MouseEvent): void {}

    protected onMouseEnter(event: MouseEvent): void {}

    protected onMouseLeave(event: MouseEvent): void {}

    findMouseEventHandler(p: Point): IComponent {
        return this.isPointInPath(p) ? this : undefined;
    }

    isPointInPath(p: Point): boolean {
        const { x, y, width, height } = this.outerBound;
        const g: Graphics = this.graphics;

        g.beginPath();
        g.rect(x, y, width, height);
        return this.mouseEnabled && this.enable && this.graphics && g.isPointInPath(p.x, p.y);
    }

    render(): void {
        // graphicsManager.render(this);
        this.graphics.renderer.onPaint();
    }

    onPaint(): void {
        const g = this.graphics;

        this.drawBackground(g);
        this.drawBorder(g);
        this.beforePaint(g);
        this.paint(g);
        this.afterPaint(g);
    }

    protected drawBackground(g: Graphics): void {
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

    protected drawBorder(g: Graphics): void {
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

    beforePaint(g: Graphics): void {
        const { x, y, width, height } = this.innerBound;

        g.save();
        g.translate(x, y);
        g.beginPath();
        g.rect(0, 0, width, height);
        g.clip();
    }

    paint(g: Graphics): void {}

    afterPaint(g: Graphics): void {
        g.restore();
    }

    measure(): void {
        const { parent, margin, padding, border } = this;
        const px = this.getX(),
            py = this.getY(),
            pw = this.getWidth(),
            ph = this.getHeight();

        let g: Graphics = this.graphics;

        let pBound: Rectangle =
            parent == undefined ? new Rectangle({ x: 0, y: 0, width: g.canvas.width, height: g.canvas.height }) : parent.innerBound;

        let x: number = pBound.x + pBound.width * Math.min(1, px);
        let y: number = pBound.y + pBound.height * Math.min(1, py);
        let w: number = pBound.width * Math.min(1, pw);
        let h: number = pBound.height * Math.min(1, ph);

        this.outerBound = mergeBound({ x: x, y: y, width: w, height: h }, margin, 0);
        this.innerBound = mergeBound(this.outerBound, padding, border.enable ? border.size : 0);
    }

    contains(c: IComponent): boolean {
        return c == this;
    }

    getMargin(): Padding {
        return this.margin;
    }
    @InvalidateProperties
    setMargin(margin: Padding): void {
        this.margin = margin;
    }

    getPadding(): Padding {
        return this.padding;
    }
    @InvalidateProperties
    setPadding(padding: Padding): void {
        this.padding = padding;
    }

    getBorder(): BorderStyle {
        return this.border;
    }
    @InvalidateProperties
    setBorder(border: BorderStyle): void {
        this.border = border;
    }

    getEnable(): boolean {
        return this.enable;
    }
    @InvalidateProperties
    setEnable(enable: boolean): void {
        this.enable = enable;
    }

    get outerBound(): Rectangle {
        return this._outerBound;
    }
    set outerBound(val: Rectangle) {
        this._outerBound = val;
    }

    get innerBound(): Rectangle {
        return this._innerBound;
    }
    set innerBound(val: Rectangle) {
        this._innerBound = val;
    }

    getFont(): FontStyle {
        return this.font;
    }

    @InvalidateProperties
    setFont(font: FontStyle): void {
        this.font = font;
    }

    protected get mouseEnabled(): boolean {
        return false;
    }

    get parent(): IComponent {
        return this.parentObject as IComponent;
    }
    set parent(parent: IComponent) {
        this.parentObject = parent;
    }
}
