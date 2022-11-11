import { CloneableDescriptor } from '../core/Cloneable';

interface IPoint {
    x?: number;
    y?: number;
}

@CloneableDescriptor
export class Point {
    public x: number;
    public y: number;
    constructor(param?: IPoint) {
        let { x = 0, y = 0 } = param || {};
        this.x = x;
        this.y = y;
    }
}
