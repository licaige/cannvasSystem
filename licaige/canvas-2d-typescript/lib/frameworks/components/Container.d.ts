import { Component } from './Component';
import { IContainer, IComponent } from './Core';
import { Point } from '../types/Point';
export declare class Container extends Component implements IContainer {
    _children: Array<IComponent>;
    constructor();
    findMouseEventHandler(p: Point): IComponent;
    onPaint(): void;
    addChild(c: IComponent): void;
    getChildren(): Array<IComponent>;
    removeChild(child: IComponent): void;
    contains(c: IComponent): boolean;
    measure(): void;
}
//# sourceMappingURL=Container.d.ts.map