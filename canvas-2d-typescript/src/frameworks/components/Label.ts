import { IDisplayText, Graphics } from './Core';
import { Component } from './Component';
import { InvalidateProperties } from './DisplayObject';
export class Label extends Component implements IDisplayText {
    private text: string;

    constructor() {
        super();
    }

    paint(g: Graphics) {
        const { family = '宋体', color = 'black', textAlign = 'left' } = this.font;

        const { width, height } = this.innerBound;

        var x = 0;
        if (textAlign == 'right' || textAlign == 'end') {
            x = x + width;
        } else if (textAlign == 'center') {
            x = x + width / 2;
        }

        g.font = `${height}px ${family} blod`;
        g.textBaseline = 'hanging';
        g.fillStyle = color;
        g.textAlign = textAlign;
        g.fillText(this.text, x, 0);
    }

    getText(): string {
        return this.text;
    }

    @InvalidateProperties
    setText(text: string): void {
        this.text = text;
    }
}
