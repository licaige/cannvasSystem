import { EventDispatcher } from './EventDispatcher';
import { TimerEvent } from '../events/TimerEvent';
import { CoreEvent, IEventDispatcher } from './Core';
export interface TimerOptions {
    delay: number;
    repeat?: number;
}

export class Timer extends EventDispatcher {
    private delay: number;
    private repeat: number;
    private handler: any;

    constructor(options?: TimerOptions) {
        super();
        let { delay = 1, repeat = -1 } = options || {};
        this.delay = delay;
        this.repeat = repeat;
    }

    setDelay(delay: number): void {
        this.delay = delay;
    }

    public start(options?: TimerOptions): Timer {
        let { delay = this.delay, repeat = this.repeat } = options || {};
        if (this.handler) {
            this.stop();
        }
        this.handler = setInterval(() => {
            if (repeat != 0) {
                if (repeat > 0) repeat--;
                this.trigger(new TimerEvent(this, repeat));
            } else {
                this.stop();
            }
        }, delay);
        return this;
    }

    public stop(): void {
        clearInterval(this.handler);
        this.handler = undefined;
    }

    on(type: string, listener: (event: CoreEvent) => void): IEventDispatcher {
        this.off(type);
        return super.on(type, listener);
    }
}
