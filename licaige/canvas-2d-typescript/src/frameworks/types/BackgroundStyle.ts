import { CloneableDescriptor } from '../core/Cloneable';
import { ColorStyle } from './ColorStyle';

interface IBackgroundStyle {
    enable?: boolean;
    color?: ColorStyle;
}

@CloneableDescriptor
export class BackgroundStyle {
    readonly enable: boolean;
    readonly color: ColorStyle;

    constructor(param?: IBackgroundStyle) {
        let { enable = true, color = 'white' } = param || {};
        this.enable = enable;
        this.color = color;
    }
}
