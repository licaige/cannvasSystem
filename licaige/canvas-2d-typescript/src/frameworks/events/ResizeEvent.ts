import { CoreEvent, IEventDispatcher } from '../components/Core';
import { Size } from '../types/Size';

export class ResizeEvent extends CoreEvent {
    size: Size;
    constructor(target: IEventDispatcher, size: Size) {
        super(target, ResizeEvent.NAME);
        this.size = size;
    }
    public static NAME: string = 'resize';
}
