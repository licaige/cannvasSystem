import { IDisplayText, Graphics } from './Core';
import { Component } from './Component';
export declare class Label extends Component implements IDisplayText {
    private text;
    constructor();
    paint(g: Graphics): void;
    getText(): string;
    setText(text: string): void;
}
//# sourceMappingURL=Label.d.ts.map