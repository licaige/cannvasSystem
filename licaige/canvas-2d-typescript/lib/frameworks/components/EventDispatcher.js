class ListenerHolder extends Array {
    trigger(event) {
        let result = false;
        this.forEach((listener) => {
            listener(event);
        });
        result = true;
        return result;
    }
}
let ID = 0;
export class EventDispatcher {
    constructor() {
        this.listeners = new Map();
        this._id = ++ID;
    }
    trigger(event) {
        // requestAnimationFrame(() => {
        //     let holder: ListenerHolder = this.listeners.get(event.type);
        //     if (holder) {
        //         holder.trigger(event);
        //     }
        // });
        let handle = setTimeout(() => {
            let holder = this.listeners.get(event.type);
            if (holder) {
                holder.trigger(event);
            }
            clearTimeout(handle);
        }, 0);
        return this;
    }
    has(type, listener) {
        return this.listeners.has(type) && (listener == undefined || this.listeners.get(type).indexOf(listener) >= 0);
    }
    on(type, listener) {
        if (!this.has(type)) {
            this.listeners.set(type, new ListenerHolder());
        }
        let holder = this.listeners.get(type);
        holder.push(listener);
        return this;
    }
    off(type, listener) {
        if (this.has(type, listener)) {
            if (!listener) {
                this.listeners.delete(type);
            }
            else {
                let holder = this.listeners.get(type);
                holder.splice(holder.indexOf(listener), 1);
            }
        }
        return this;
    }
    get id() {
        return this._id;
    }
}
//# sourceMappingURL=EventDispatcher.js.map