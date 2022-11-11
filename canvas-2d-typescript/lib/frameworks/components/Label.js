var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from './Component';
import { InvalidateProperties } from './DisplayObject';
export class Label extends Component {
    constructor() {
        super();
    }
    paint(g) {
        const { family = '宋体', color = 'black', textAlign = 'left' } = this.font;
        const { width, height } = this.innerBound;
        var x = 0;
        if (textAlign == 'right' || textAlign == 'end') {
            x = x + width;
        }
        else if (textAlign == 'center') {
            x = x + width / 2;
        }
        g.font = `${height}px ${family} blod`;
        g.textBaseline = 'hanging';
        g.fillStyle = color;
        g.textAlign = textAlign;
        g.fillText(this.text, x, 0);
    }
    getText() {
        return this.text;
    }
    setText(text) {
        this.text = text;
    }
}
__decorate([
    InvalidateProperties,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Label.prototype, "setText", null);
//# sourceMappingURL=Label.js.map