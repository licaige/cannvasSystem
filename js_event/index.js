/*
 * Copyright (c) [2022] Zhang Yansen.All rights reserved.
 *
 * js_event is licensed under the Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *
 *     http://license.coscl.org.cn/MulanPSL2
 *
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */


export default function createEvent() {
  const events = {}
  
  function addEventListener(name, handler) {
    const list = events[name] || []
    list.push(handler)
    events[name] = list;
  }

  function removeEventListener(name, handler) {
    const list = events[name] || []
    events[name] = list.filter(x => x !== handler)
  }

  function dispatchEvent(...args) {
    const [name, ...params] = args

    const list = events[name] || []
    list.forEach(fn => fn(...params));
  }

  return {
    addEventListener,
    dispatchEvent,
    removeEventListener,
  }
}