var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PropertyChangedEvent } from '../events/PropertyChangedEvent';
import { EventDispatcher } from './EventDispatcher';
import { CompleteEvent } from '../events/CompleteEvent';
import { BackgroundStyle } from '../types/BackgroundStyle';
export const propertyEquals = (a, b) => {
    if (a == undefined && b == undefined)
        return true;
    if (a == undefined || b == undefined)
        return false;
    return a == b;
};
const Invalidate = (sizeOrPosition) => {
    return (target, propertyKey, descriptor) => {
        if (!propertyKey.startsWith('set'))
            throw Error('@Invalidate must be descriped to setter method.');
        let setter = descriptor.value;
        descriptor.value = function (...args) {
            let c = this;
            let getterKey = 'g' + propertyKey.substring(1);
            let getter = this[getterKey];
            if (!getter)
                throw Error(`@Invalidate method must has a getter ${getterKey}.`);
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
                        let trigger = sizeOrPosition ? c.parent || c : c;
                        trigger.trigger(new PropertyChangedEvent(c, propKey, oldValue, newValue));
                    }
                    else {
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
export class DisplayObject extends EventDispatcher {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.width = 1;
        this.height = 1;
        this.background = new BackgroundStyle();
        this.initializeListeners();
    }
    initializeListeners() {
        this.on(PropertyChangedEvent.NAME, (e) => this.onPropertyChanged(e)).on(CompleteEvent.NAME, () => this.onComplete());
    }
    onPropertyChanged(event) {
        this.render();
    }
    onComplete() { }
    render() { }
    onPaint() {
        this.beforePaint(this.graphics);
        this.paint(this.graphics);
        this.afterPaint(this.graphics);
    }
    complete() {
        this.trigger(new CompleteEvent(this));
        return true;
    }
    get graphics() {
        return this._graphics;
    }
    set graphics(g) {
        this._graphics = g;
    }
    get parentObject() {
        return this._parentObject;
    }
    set parentObject(parent) {
        if (parent) {
            this.graphics = parent.graphics;
        }
        this._parentObject = parent;
    }
    getX() {
        return this.x;
    }
    setX(x) {
        this.x = x;
    }
    getY() {
        return this.y;
    }
    setY(y) {
        this.y = y;
    }
    getWidth() {
        return this.width;
    }
    setWidth(width) {
        this.width = width;
    }
    getHeight() {
        return this.height;
    }
    setHeight(height) {
        this.height = height;
    }
    getBackgroundStyle() {
        return this.background.color;
    }
    getBackground() {
        return this.background;
    }
    setBackground(background) {
        this.background = background;
    }
}
__decorate([
    InvalidateSizeOrPosition,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DisplayObject.prototype, "setX", null);
__decorate([
    InvalidateSizeOrPosition,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DisplayObject.prototype, "setY", null);
__decorate([
    InvalidateSizeOrPosition,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DisplayObject.prototype, "setWidth", null);
__decorate([
    InvalidateSizeOrPosition,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DisplayObject.prototype, "setHeight", null);
__decorate([
    InvalidateProperties,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BackgroundStyle]),
    __metadata("design:returntype", void 0)
], DisplayObject.prototype, "setBackground", null);
//# sourceMappingURL=DisplayObject.js.map