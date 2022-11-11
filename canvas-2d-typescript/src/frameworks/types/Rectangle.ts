import { CloneableDescriptor } from '../core/Cloneable';

interface IRectangle {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

@CloneableDescriptor
export class Rectangle {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    constructor(param?: IRectangle) {
        let { x = 0, y = 0, width = 1, height = 1 } = param || {};
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
