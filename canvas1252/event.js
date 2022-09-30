export class Bus {
  constructor() {
    Object.defineProperty(this, "handles", {
      value: {},
    });
  }
  on(eventName, listener) {
    if (typeof listener !== "function") {
      console.error("请传入正确的回调函数");
      return;
    }
    if (!this.handles[eventName]) {
      this.handles[eventName] = [listener];
    } else {
      this.handles[eventName].push(listener);
    }
  }
  emit(eventName, ...args) {
    let listeners = this.handles[eventName];
    if (!listeners) return;
    for (const listener of listeners) {
      listener(...args);
    }
  }
  off(eventName, listener) {
    if (!listener) {
      delete this.handles[eventName];
      return;
    }
    let listeners = this.handles[eventName];
    if (listeners && listeners.length) {
      let index = listeners.findIndex((item) => item === listener);
      listeners.splice(index, 1);
    }
  }
  once(eventName, listener) {
    if (typeof listener !== "function") {
      console.error("请传入正确的回调函数");
      return;
    }
    const onceListener = (...args) => {
      listener(...args);
      this.off(eventName, listener);
    };
    this.on(eventName, onceListener);
  }
}
