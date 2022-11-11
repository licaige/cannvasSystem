import { Register } from './Register';
import { MouseEvent } from '../events/MouseEvent';
import { Point } from '../types/Point';
export class MouseRegister extends Register {
    constructor() {
        super();
    }
    enable() {
        console.log('Mouse Control Registered.');
        const { dom, application } = this;
        application.complete();
        dom.addEventListener(MouseEvent.MOUSE_CLICK, (e) => {
            let p = new Point({ x: e.clientX, y: e.clientY });
            let c = application.findMouseEventHandler(p);
            if (c) {
                this.triggerEvent(c, MouseEvent.MOUSE_CLICK, p);
            }
        });
        dom.addEventListener(MouseEvent.MOUSE_MOVE, (e) => {
            let t = this.target;
            let p = new Point({ x: e.clientX, y: e.clientY });
            let c = application.findMouseEventHandler(p);
            if (t == undefined) {
                this.triggerEvent(c, MouseEvent.MOUSE_ENTER, p);
            }
            else {
                if (c != t) {
                    this.triggerEvent(t, MouseEvent.MOUSE_LEAVE, p);
                    this.triggerEvent(c, MouseEvent.MOUSE_ENTER, p);
                }
                else {
                    this.triggerEvent(c, MouseEvent.MOUSE_MOVE, p);
                }
            }
            this.target = c;
        });
    }
    triggerEvent(target, type, point) {
        target.trigger(new MouseEvent(target, type, point));
    }
}
//# sourceMappingURL=MouseRegister.js.map