// 判断某个值是否是对象的辅助方法
function isObject(val){
  return val !== null && typeof val === 'object';
}

// 判断当前对象上是否有指定属性
function hasOwn(target, property){
  return target.hasOwnProperty(property);
}
const toProxy = new WeakMap(); // 存放目标对象=>代理对象
const toRaw = new WeakMap();   // 存放代理对象=>目标对象
// 响应式核心方法
function reactive(target){
  return createReactiveObject(target);
}
// 创建响应式对象的方法
function createReactiveObject(target){
  // 如果target不是对象则直接返回
  if(!isObject(target)){
    return target;
  }
  const proxy = toProxy.get(target);
  // 如果目标对象已经有代理对象，则直接返回该代理对象
  if(proxy){
    return proxy;
  }
  
  // 如果目标对象是代理对象，并且有对应的真实对象，那么直接返回
  if(toRaw.has(target)){  
    return target;  // 这里的target是代理对象
  }

  const baseHandler = {
    get(target, property, receiver){
      const result = Reflect.get(target, property, receiver);
      // 收集依赖
      track(target, property); 
      return isObject(result) ? reactive(result) : result;
    },
    set(target, property, value, receiver){
      // 判断目标对象上是否已经存在该属性
      const hasProperty = hasOwn(target, property); 
      const oldValue = Reflect.get(target, property);
      const result = Reflect.set(target, property, value, receiver);
      
      if(!hasProperty){
        trigger(target, 'add', property);
      }
      else if(oldValue !== value){ 
        trigger(target, 'set', property);
      }
      return result;
    },
    deleteProperty(target, property){
      return Reflect.deleteProperty(target, property);
    }
  }
  const observed = new Proxy(target, baseHandler);
  toProxy.set(target, observed);
  toRaw.set(observed, target);
  return observed;
}

// 保存effect的数组，以栈的形式存储
const effectStack = []; 
// 保存对象与其属性依赖关系的Map，key是对象，value是Map
const targetMap = new WeakMap();
// 跟踪依赖
function track(target, property){ 
  // 获取全局数组effectStack中的依赖
  const effect = effectStack[effectStack.length - 1];
  // 如果存在依赖
  if(effect){  
    // 取出该对象对应的Map
    let depsMap = targetMap.get(target);
    // 如果不存在，则以目标对象为key，新建的Map为value，保存到targetMap中
    if(!depsMap){
      targetMap.set(target, depsMap = new Map());
    }
    // 从Map中取出该属性对应的所有effect
    let deps = depsMap.get(property);
    // 如果不存在，则以属性为key，新建的Set为value，保存到depsMap中
    if(!deps){
      depsMap.set(property, deps = new Set());
    }
    // 判断Set中是否已经存在effect，如果没有，则添加到deps中
    if(!deps.has(effect)){
      deps.add(effect);
    }
  }
}
// 执行属性关联的所有effect
// 参数type在本例中并没有使用，只是模拟Vue 3.0中的代码，用于区分修改属性还是新增属性
function trigger(target, type, property){
  const depsMap = targetMap.get(target);
  if(depsMap){
    let deps = depsMap.get(property);
    // 将当前属性关联的所有effect依次执行
    if(deps){
      deps.forEach(effect => {
        effect();
      });
    }
  }
}
function effect(fn){
  // 创建响应式effect
  const effect = createReactiveEffect(fn);
  // 默认先执行一次effect，本质上调用的是传入的fn函数
  effect(); 
}
// 创建响应式effect
function createReactiveEffect(fn){
  // 响应式effect
  const effect = function(){  
    try{
      // 将effect保存到全局数组effectStack中，以栈的形式存储
      effectStack.push(effect);
      return fn();
    } finally{
      // 调用完依赖后，删除effect
      effectStack.pop();
    }
  }
  return effect;
}
/* const proxy = reactive({name: '张三'});
proxy.name = '李四';
console.log(proxy.name); */

/* const proxy = reactive({name: 'vue.js', address: {city: '北京'}});
proxy.address.city = '天津'; */

// 第一种情况：
/* const target = {name: '张三'};
const proxy1 = reactive(target);
const proxy2 = reactive(target); */

// 第二种情况：
/* const target = {name: '张三'};
const proxy1 = reactive(target);
const proxy2 = reactive(proxy1); */

/* const proxy = reactive([1, 2, 3]);
proxy.push(4); */

const proxy = reactive({name: '张三'});
effect(()=>{
  console.log(proxy.name);
});
proxy.name = '李四';




