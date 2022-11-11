import { CoreEvent, IEventDispatcher } from '../components/Core';
import { Point } from '../types/Point';

export type MouseEventType = 'click' | 'mousemove' | 'mouseenter' | 'mouseleave';

export class MouseEvent extends CoreEvent {
    point: Point;
    constructor(target: IEventDispatcher, type: MouseEventType, p: Point) {
        super(target, type);
        this.point = p;
    }

    public static MOUSE_CLICK: MouseEventType = 'click';
    public static MOUSE_MOVE: MouseEventType = 'mousemove';
    public static MOUSE_ENTER: MouseEventType = 'mouseenter';
    public static MOUSE_LEAVE: MouseEventType = 'mouseleave';
}
