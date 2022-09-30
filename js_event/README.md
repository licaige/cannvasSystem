# js_event
事件模式的 js 极简实现

## 安装
```js
npm install -S @zjxpcyc/js_event
```


## 使用
```
// 引入
import createEvent from '@zjxpcyc/js_event'
```

### 事件源(触发者)
事件源, 或者触发者的形式, 多种多样, 这里使用OOP思想示意一下。可能实际业务中更多的是函数编程。

```
// 事件触发者
class Foo() {
  _evt;

  constructor() {
    _evt = createEvent();
  }

  addEventListener(name, handler) {
    _evt.addEventListener(name, handler)
  }

  removeEventListener(name, handler) {
    _evt.removeEventListener(name, handler)
  }

  someFunc() {
    _evt.dispatchEvent('change', 'some value');
  }

}

```


### 事件监听者

```js
// 事件监听者
class Bar() {
  _foo;

  constructor(foo) {
    _foo = foo;
  }

  someBizFunc() {
    _foo.addEventListener('change', val => console.log('----listen change---->', val))
  }
}

```


### 演示使用
```
const foo = new Foo();
const bar = new Bar(foo);
// 建立监听
bar.someBizFunc();
// 然后, 每次执行 someFunc 都会被 bar 监听到
foo.someFunc()
```
