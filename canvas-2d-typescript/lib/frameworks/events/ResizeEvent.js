import { CoreEvent } from '../components/Core';
export class ResizeEvent extends CoreEvent {
    constructor(target, size) {
        super(target, ResizeEvent.NAME);
        this.size = size;
    }
}
ResizeEvent.NAME = 'resize';
//# sourceMappingURL=ResizeEvent.js.map