import { EventDispatcher } from './EventDispatcher';
import { TimerEvent } from '../events/TimerEvent';
export class Timer extends EventDispatcher {
    constructor(options) {
        super();
        let { delay = 1, repeat = -1 } = options || {};
        this.delay = delay;
        this.repeat = repeat;
    }
    setDelay(delay) {
        this.delay = delay;
    }
    start(options) {
        let { delay = this.delay, repeat = this.repeat } = options || {};
        if (this.handler) {
            this.stop();
        }
        this.handler = setInterval(() => {
            if (repeat != 0) {
                if (repeat > 0)
                    repeat--;
                this.trigger(new TimerEvent(this, repeat));
            }
            else {
                this.stop();
            }
        }, delay);
        return this;
    }
    stop() {
        clearInterval(this.handler);
        this.handler = undefined;
    }
    on(type, listener) {
        this.off(type);
        return super.on(type, listener);
    }
}
//# sourceMappingURL=Timer.js.map