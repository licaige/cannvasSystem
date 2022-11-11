import { Component } from './Component';
export class Container extends Component {
    constructor() {
        super();
        this._children = [];
    }
    findMouseEventHandler(p) {
        if (this == super.findMouseEventHandler(p)) {
            for (let i = this._children.length - 1; i >= 0; i--) {
                let c = this._children[i];
                if (c.isPointInPath(p)) {
                    return c.findMouseEventHandler(p);
                }
            }
            return this;
        }
        return undefined;
    }
    onPaint() {
        super.onPaint();
        this._children.forEach((c) => {
            c.onPaint();
        });
    }
    addChild(c) {
        if (c != undefined) {
            c.graphics = this.graphics;
            this._children.push(c);
            c.parentObject = this;
            c.measure();
            c.render();
            c.complete();
        }
    }
    getChildren() {
        return this._children;
    }
    removeChild(child) {
        this._children = this._children.filter((c, i) => {
            return c != child;
        });
    }
    contains(c) {
        if (super.contains(c))
            return true;
        let exist = false;
        for (let i = 0; i < this._children.length; i++) {
            if (this._children[i].contains(c)) {
                exist = true;
                break;
            }
        }
        return exist;
    }
    measure() {
        super.measure();
        this._children.forEach((c) => c.measure());
    }
}
//# sourceMappingURL=Container.js.map