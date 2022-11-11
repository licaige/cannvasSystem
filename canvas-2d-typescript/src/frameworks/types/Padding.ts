import { CloneableDescriptor } from '../core/Cloneable';

interface IPadding {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}

@CloneableDescriptor
export class Padding {
    readonly left: number;
    readonly right: number;
    readonly top: number;
    readonly bottom: number;

    constructor(param?: IPadding) {
        let { top = 0, bottom = 0, left = 0, right = 0 } = param || {};
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
    }
}
