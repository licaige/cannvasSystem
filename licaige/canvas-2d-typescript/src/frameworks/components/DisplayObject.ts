import { IComponent, IEventDispatcher, IDisplayObject, Graphics } from './Core';
import { PropertyChangedEvent } from '../events/PropertyChangedEvent';
import { EventDispatcher } from './EventDispatcher';
import { CompleteEvent } from '../events/CompleteEvent';
import { BackgroundStyle } from '../types/BackgroundStyle';

export const propertyEquals = (a: any, b: any): boolean => {
    if (a == undefined && b == undefined) return true;
    if (a == undefined || b == undefined) return false;
    return a == b;
};

const Invalidate = (sizeOrPosition: boolean) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (!propertyKey.startsWith('set')) throw Error('@Invalidate must be descriped to setter method.');
        let setter: Function = descriptor.value;
        descriptor.value = function (...args: any[]) {
            let c: IComponent = this as IComponent;

            let getterKey = 'g' + propertyKey.substring(1);
            let getter: Function = this[getterKey];
            if (!getter) throw Error(`@Invalidate method must has a getter ${getterKey}.`);
            let oldValue = getter.apply(this, []);
            let newValue = args[0];

            if (!propertyEquals(oldValue, newValue)) {
                let propKey = propertyKey.substr(3, 1).toLocaleLowerCase() + propertyKey.substring(4);
                setter.apply(this, args);
                const frame = () => {
                    if (c.graphics) {
                        if (sizeOrPosition) {
                            c.measure();
                        }
                        let trigger: IEventDispatcher = sizeOrPosition ? c.parent || c : c;
                        trigger.trigger(new PropertyChangedEvent(c, propKey, oldValue, newValue));
                    } else {
                        // requestAnimationFrame(frame);
                        setTimeout(frame, 1);
                    }
                };
                setTimeout(frame, 1);
                // requestAnimationFrame(frame);
            }
        };
    };
};

export const InvalidateSizeOrPosition = Invalidate(true);
export const InvalidateProperties = Invalidate(false);

export abstract class DisplayObject extends EventDispatcher implements IDisplayObject {
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;
    protected background: BackgroundStyle;
    private _graphics: Graphics;
    private _parentObject: IDisplayObject;

    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.width = 1;
        this.height = 1;
        this.background = new BackgroundStyle();
        this.initializeListeners();
    }

    protected initializeListeners(): void {
        this.on(PropertyChangedEvent.NAME, (e) => this.onPropertyChanged(<PropertyChangedEvent>e)).on(CompleteEvent.NAME, () => this.onComplete());
    }

    protected onPropertyChanged(event: PropertyChangedEvent): void {
        this.render();
    }

    protected onComplete(): void {}

    render(): void {}

    onPaint(): void {
        this.beforePaint(this.graphics);
        this.paint(this.graphics);
        this.afterPaint(this.graphics);
    }

    complete(): boolean {
        this.trigger(new CompleteEvent(this));
        return true;
    }

    abstract beforePaint(g: Graphics): void;

    abstract paint(g: Graphics): void;

    abstract afterPaint(g: Graphics): void;

    get graphics(): Graphics {
        return this._graphics;
    }
    set graphics(g: Graphics) {
        this._graphics = g;
    }

    get parentObject(): IDisplayObject {
        return this._parentObject;
    }
    set parentObject(parent: IDisplayObject) {
        if (parent) {
            this.graphics = parent.graphics;
        }
        this._parentObject = parent;
    }

    getX(): number {
        return this.x;
    }

    @InvalidateSizeOrPosition
    setX(x: number): void {
        this.x = x;
    }

    getY(): number {
        return this.y;
    }
    @InvalidateSizeOrPosition
    setY(y: number): void {
        this.y = y;
    }

    getWidth(): number {
        return this.width;
    }
    @InvalidateSizeOrPosition
    setWidth(width: number): void {
        this.width = width;
    }

    getHeight(): number {
        return this.height;
    }
    @InvalidateSizeOrPosition
    setHeight(height: number): void {
        this.height = height;
    }

    getBackgroundStyle(): string | CanvasGradient | CanvasPattern {
        return this.background.color;
    }
    getBackground(): BackgroundStyle {
        return this.background;
    }
    @InvalidateProperties
    setBackground(background: BackgroundStyle): void {
        this.background = background;
    }
}
