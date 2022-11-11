import { ColorStyle } from './ColorStyle';
interface IBorderStyle {
    enable?: boolean;
    size?: number;
    color?: ColorStyle;
}
export declare class BorderStyle {
    readonly enable: boolean;
    readonly size: number;
    readonly color: ColorStyle;
    constructor(param?: IBorderStyle);
}
export {};
//# sourceMappingURL=BorderStyle.d.ts.map