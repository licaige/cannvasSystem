import { CoreEvent } from '../components/Core';
export class CompleteEvent extends CoreEvent {
    constructor(target) {
        super(target, CompleteEvent.NAME);
    }
}
CompleteEvent.NAME = "CompleteEvent";
//# sourceMappingURL=CompleteEvent.js.map