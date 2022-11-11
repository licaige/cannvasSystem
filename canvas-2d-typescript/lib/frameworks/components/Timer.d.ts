import { EventDispatcher } from './EventDispatcher';
import { CoreEvent, IEventDispatcher } from './Core';
export interface TimerOptions {
    delay: number;
    repeat?: number;
}
export declare class Timer extends EventDispatcher {
    private delay;
    private repeat;
    private handler;
    constructor(options?: TimerOptions);
    setDelay(delay: number): void;
    start(options?: TimerOptions): Timer;
    stop(): void;
    on(type: string, listener: (event: CoreEvent) => void): IEventDispatcher;
}
//# sourceMappingURL=Timer.d.ts.map