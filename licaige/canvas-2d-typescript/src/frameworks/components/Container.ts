import { Component } from './Component';
import { IContainer, IComponent } from './Core';
import { Point } from '../types/Point';

export class Container extends Component implements IContainer {
    _children: Array<IComponent>;
    constructor() {
        super();
        this._children = [];
    }

    findMouseEventHandler(p: Point): IComponent {
        if (this == super.findMouseEventHandler(p)) {
            for (let i = this._children.length - 1; i >= 0; i--) {
                let c: IComponent = this._children[i];
                if (c.isPointInPath(p)) {
                    return c.findMouseEventHandler(p);
                }
            }
            return this;
        }
        return undefined;
    }

    onPaint(): void {
        super.onPaint();

        this._children.forEach((c) => {
            c.onPaint();
        });
    }

    addChild(c: IComponent): void {
        if (c != undefined) {
            c.graphics = this.graphics;
            this._children.push(c);
            c.parentObject = this;
            c.measure();
            c.render();
            c.complete();
        }
    }

    getChildren(): Array<IComponent> {
        return this._children;
    }

    removeChild(child: IComponent) {
        this._children = this._children.filter((c, i) => {
            return c != child;
        });
    }

    contains(c: IComponent): boolean {
        if (super.contains(c)) return true;

        let exist: boolean = false;
        for (let i = 0; i < this._children.length; i++) {
            if (this._children[i].contains(c)) {
                exist = true;
                break;
            }
        }
        return exist;
    }

    measure(): void {
        super.measure();
        this._children.forEach((c) => c.measure());
    }
}
