import { CoreEvent } from '../components/Core';
export class MouseEvent extends CoreEvent {
    constructor(target, type, p) {
        super(target, type);
        this.point = p;
    }
}
MouseEvent.MOUSE_CLICK = 'click';
MouseEvent.MOUSE_MOVE = 'mousemove';
MouseEvent.MOUSE_ENTER = 'mouseenter';
MouseEvent.MOUSE_LEAVE = 'mouseleave';
//# sourceMappingURL=MouseEvent.js.map