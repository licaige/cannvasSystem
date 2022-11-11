import { ColorStyle } from './ColorStyle';
interface IFontStyle {
    family?: string;
    color?: ColorStyle;
    textAlign?: CanvasTextAlign;
}
export declare class FontStyle {
    readonly family: string;
    readonly color: ColorStyle;
    readonly textAlign: CanvasTextAlign;
    constructor(param?: IFontStyle);
}
export {};
//# sourceMappingURL=FontStyle.d.ts.map