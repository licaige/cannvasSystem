import { Register } from './Register';
import { MouseEvent } from '../events/MouseEvent';
import { MouseEventType } from '../events/MouseEvent';
import { IComponent } from '../components/Core';
import { Point } from '../types/Point';

export class MouseRegister extends Register {
    private target: IComponent;

    constructor() {
        super();
    }

    enable(): void {
        console.log('Mouse Control Registered.');

        const { dom, application } = this;
        application.complete();

        dom.addEventListener(MouseEvent.MOUSE_CLICK, (e) => {
            let p: Point = new Point({ x: e.clientX, y: e.clientY });
            let c: IComponent = application.findMouseEventHandler(p);
            if (c) {
                this.triggerEvent(c, MouseEvent.MOUSE_CLICK, p);
            }
        });

        dom.addEventListener(MouseEvent.MOUSE_MOVE, (e) => {
            let t: IComponent = this.target;
            let p: Point = new Point({ x: e.clientX, y: e.clientY });
            let c: IComponent = application.findMouseEventHandler(p);
            if (t == undefined) {
                this.triggerEvent(c, MouseEvent.MOUSE_ENTER, p);
            } else {
                if (c != t) {
                    this.triggerEvent(t, MouseEvent.MOUSE_LEAVE, p);
                    this.triggerEvent(c, MouseEvent.MOUSE_ENTER, p);
                } else {
                    this.triggerEvent(c, MouseEvent.MOUSE_MOVE, p);
                }
            }
            this.target = c;
        });
    }

    triggerEvent(target: IComponent, type: MouseEventType, point: Point) {
        target.trigger(new MouseEvent(target, type, point));
    }
}
