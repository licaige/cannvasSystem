import { CoreEvent, IEventDispatcher } from "../components/Core";

export class TimerEvent extends CoreEvent {
    public repeat: number;
    constructor(target: IEventDispatcher, repeat: number) {
        super(target, TimerEvent.NAME);
        this.repeat = repeat;
    }
    static NAME: string = "timer";
}
