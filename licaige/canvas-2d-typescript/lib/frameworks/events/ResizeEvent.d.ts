import { CoreEvent, IEventDispatcher } from '../components/Core';
import { Size } from '../types/Size';
export declare class ResizeEvent extends CoreEvent {
    size: Size;
    constructor(target: IEventDispatcher, size: Size);
    static NAME: string;
}
//# sourceMappingURL=ResizeEvent.d.ts.map