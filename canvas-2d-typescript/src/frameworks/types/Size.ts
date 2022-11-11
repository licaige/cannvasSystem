import { CloneableDescriptor } from '../core/Cloneable';

interface ISize {
    width?: number;
    height?: number;
}
@CloneableDescriptor
export class Size {
    readonly width: number;
    readonly height: number;

    constructor(param?: ISize) {
        let { width = 1, height = 1 } = param || {};
        this.width = width;
        this.height = height;
    }
}
