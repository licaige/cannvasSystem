import { CloneableDescriptor } from '../core/Cloneable';
import { ColorStyle } from './ColorStyle';

interface IBorderStyle {
    enable?: boolean;
    size?: number;
    color?: ColorStyle;
}

@CloneableDescriptor
export class BorderStyle {
    readonly enable: boolean;
    readonly size: number;
    readonly color: ColorStyle;
    constructor(param?: IBorderStyle) {
        let { enable = false, size = 0, color = 'black' } = param || {};
        this.enable = enable;
        this.size = size;
        this.color = color;
    }
}
