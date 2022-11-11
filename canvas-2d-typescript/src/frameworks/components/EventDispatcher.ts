import { IEventDispatcher, CoreEvent } from "./Core";

class ListenerHolder extends Array<(event: CoreEvent) => void> {
    public trigger(event?: CoreEvent): boolean {
        let result: boolean = false;

        this.forEach((listener) => {
            listener(event);
        });

        result = true;
        return result;
    }
}

let ID: number = 0;
export class EventDispatcher implements IEventDispatcher {
    private _id: number;
    constructor() {
        this.listeners = new Map<string, ListenerHolder>();
        this._id = ++ID;
    }
    listeners: Map<string, ListenerHolder>;

    trigger(event?: CoreEvent): IEventDispatcher {
        // requestAnimationFrame(() => {
        //     let holder: ListenerHolder = this.listeners.get(event.type);
        //     if (holder) {
        //         holder.trigger(event);
        //     }
        // });
        let handle = setTimeout(()=>{
            let holder: ListenerHolder = this.listeners.get(event.type);
            if (holder) {
                holder.trigger(event);
            }
            clearTimeout(handle);
        }, 0)
        return this;
    }

    has(type: string, listener?: (event: CoreEvent) => void): boolean {
        return this.listeners.has(type) && (listener == undefined || this.listeners.get(type).indexOf(listener) >= 0);
    }

    on(type: string, listener: (event: CoreEvent) => void): IEventDispatcher {
        if (!this.has(type)) {
            this.listeners.set(type, new ListenerHolder());
        }
        let holder: ListenerHolder = this.listeners.get(type);
        holder.push(listener);

        return this;
    }

    off(type: string, listener?: (event: CoreEvent) => void): IEventDispatcher {
        if (this.has(type, listener)) {
            if (!listener) {
                this.listeners.delete(type);
            } else {
                let holder: ListenerHolder = this.listeners.get(type);
                holder.splice(holder.indexOf(listener), 1);
            }
        }
        return this;
    }

    get id(): number {
        return this._id;
    }
}
