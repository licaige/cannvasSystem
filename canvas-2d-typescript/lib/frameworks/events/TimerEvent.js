import { CoreEvent } from "../components/Core";
export class TimerEvent extends CoreEvent {
    constructor(target, repeat) {
        super(target, TimerEvent.NAME);
        this.repeat = repeat;
    }
}
TimerEvent.NAME = "timer";
//# sourceMappingURL=TimerEvent.js.map