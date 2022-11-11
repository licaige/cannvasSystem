import { CoreEvent, IEventDispatcher } from '../components/Core';
import { Point } from '../types/Point';
export declare type MouseEventType = 'click' | 'mousemove' | 'mouseenter' | 'mouseleave';
export declare class MouseEvent extends CoreEvent {
    point: Point;
    constructor(target: IEventDispatcher, type: MouseEventType, p: Point);
    static MOUSE_CLICK: MouseEventType;
    static MOUSE_MOVE: MouseEventType;
    static MOUSE_ENTER: MouseEventType;
    static MOUSE_LEAVE: MouseEventType;
}
//# sourceMappingURL=MouseEvent.d.ts.map