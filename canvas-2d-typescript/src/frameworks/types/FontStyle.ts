import { CloneableDescriptor } from '../core/Cloneable';
import { ColorStyle } from './ColorStyle';

interface IFontStyle {
    family?: string;
    color?: ColorStyle;
    textAlign?: CanvasTextAlign;
}

@CloneableDescriptor
export class FontStyle {
    readonly family: string;
    readonly color: ColorStyle;
    readonly textAlign: CanvasTextAlign;
    constructor(param?: IFontStyle) {
        let { family = '宋体', color = 'black', textAlign = 'left' } = param || {};
        this.family = family;
        this.color = color;
        this.textAlign = textAlign;
    }
}
