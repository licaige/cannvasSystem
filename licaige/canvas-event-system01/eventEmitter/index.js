//注册事件类
class Event {
  constructor() {
    this._listener = {}
  }

  /**
   * 监听
   * @param {string} type
   * @param {function} handler
   * @memberof Event
   */
  on(type, handler) {
    //先判断对应类型事件是否在监听里面
    if (!this._listener[type]) {
      this._listener[type] = []
    }
    //如果在，直接把对应的方法放入监听里面去
    this._listener[type].push(handler)
  }

  /**
   *触发
   *
   * @param {*} type
   * @param {*} event
   * @returns
   * @memberof Event
   */
  emit(type, event) {
    if (event == null || event.type == null) {
      return;
    }
    //拿出对应的监听对象
    const typeListeners = this._listener[type]
    if (!typeListeners) return
    //执行对应的事件
    for (let index = 0; index < typeListeners.length; index++) {
      const handler = typeListeners[index];
      handler(event)
    }
  }

  /**
   * 删除
   *
   * @param {*} type
   * @param {*} handler
   * @memberof Event
   */
  remove(type, handler) {
    if (!handler) {
      this._listener[type] = []
      return
    }
    if (this._listener[type]) {
      const listeners = this._listeners[type];
      for (let i = 0, len = listeners.length; i < len; i++) {
        if (listeners[i] === listeners) {
          listeners.splice(i, 1);
        }
      }
    }
  }
}

export default Event
