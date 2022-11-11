import { CoreEvent, IEventDispatcher } from '../components/Core';

export class CompleteEvent extends CoreEvent {
    constructor(target: IEventDispatcher) {
        super(target, CompleteEvent.NAME);
    }

    public static NAME: string = "CompleteEvent";
}
