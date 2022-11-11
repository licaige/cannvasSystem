import 'reflect-metadata';
import { BackgroundStyle } from '../types/BackgroundStyle';
import { Rectangle } from '../types/Rectangle';
import { BorderStyle } from '../types/BorderStyle';
import { Padding } from '../types/Padding';
import { FontStyle } from '../types/FontStyle';
import { Point } from '../types/Point';
export declare function hex(i: number): string;
export declare function rgb(r: number, g: number, b: number): string;
export interface IEventDispatcher {
    on(type: string, listener: (event: CoreEvent) => void): IEventDispatcher;
    off(type: string, listener: (event: CoreEvent) => void): IEventDispatcher;
    trigger(event: CoreEvent): IEventDispatcher;
    has(type: string, listener?: (event: CoreEvent) => void): boolean;
}
export declare class CoreEvent {
    type: string;
    target: IEventDispatcher;
    bubbles: boolean;
    constructor(target: IEventDispatcher, type: string);
    stopPropagation(): void;
}
export interface Graphics extends CanvasRenderingContext2D {
    readonly canvas: HTMLCanvasElement;
    renderer: IComponent;
}
export interface IDisplayObject extends IEventDispatcher {
    graphics: Graphics;
    parentObject: IDisplayObject;
    complete(): boolean;
    render(): void;
    onPaint(): void;
    beforePaint(g: Graphics): void;
    paint(g: Graphics): void;
    afterPaint(g: Graphics): void;
    getX(): number;
    setX(x: number): void;
    getY(): number;
    setY(y: number): void;
    getWidth(): number;
    setWidth(width: number): void;
    getHeight(): number;
    setHeight(height: number): void;
    getBackgroundStyle(): string | CanvasGradient | CanvasPattern;
    getBackground(): BackgroundStyle;
    setBackground(background: BackgroundStyle): void;
}
export interface IComponent extends IDisplayObject {
    parent: IComponent;
    readonly outerBound: Rectangle;
    readonly innerBound: Rectangle;
    getEnable(): boolean;
    setEnable(enable: boolean): void;
    getBorder(): BorderStyle;
    setBorder(border: BorderStyle): void;
    getMargin(): Padding;
    setMargin(margin: Padding): void;
    getPadding(): Padding;
    setPadding(padding: Padding): void;
    getFont(): FontStyle;
    setFont(font: FontStyle): void;
    measure(): void;
    findMouseEventHandler(p: Point): IComponent;
    isPointInPath(p: Point): boolean;
    contains(c: IComponent): boolean;
}
export interface IContainer extends IComponent {
    addChild(c: IComponent): any;
    getChildren(): Array<IComponent>;
}
export interface IDisplayText {
    getText(): string;
    setText(text: string): void;
}
//# sourceMappingURL=Core.d.ts.map