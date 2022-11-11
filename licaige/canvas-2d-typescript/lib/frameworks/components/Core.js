import 'reflect-metadata';
const HEX_STR = '0123456789ABCDEF';
export function hex(i) {
    let h = HEX_STR.charAt(i / 16), l = HEX_STR.charAt(i % 16);
    return `${h}${l}`;
}
export function rgb(r, g, b) {
    let hR = hex(r), hG = hex(g), hB = hex(b);
    return `#${hR}${hG}${hB}`;
}
export class CoreEvent {
    constructor(target, type) {
        this.bubbles = true;
        this.type = type;
        this.target = target;
    }
    stopPropagation() {
        this.bubbles = false;
    }
}
//# sourceMappingURL=Core.js.map