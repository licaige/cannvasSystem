var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CloneableDescriptor } from '../core/Cloneable';
let Rectangle = class Rectangle {
    constructor(param) {
        let { x = 0, y = 0, width = 1, height = 1 } = param || {};
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
};
Rectangle = __decorate([
    CloneableDescriptor,
    __metadata("design:paramtypes", [Object])
], Rectangle);
export { Rectangle };
//# sourceMappingURL=Rectangle.js.map