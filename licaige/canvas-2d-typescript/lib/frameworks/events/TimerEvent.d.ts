import { CoreEvent, IEventDispatcher } from "../components/Core";
export declare class TimerEvent extends CoreEvent {
    repeat: number;
    constructor(target: IEventDispatcher, repeat: number);
    static NAME: string;
}
//# sourceMappingURL=TimerEvent.d.ts.map