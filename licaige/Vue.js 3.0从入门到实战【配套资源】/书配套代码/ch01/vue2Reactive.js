// 对Object.defineProperty方法进行封装
function defineReactive(obj, key, value){
  // 通过递归调用，解决多层对象嵌套的属性侦测问题
  observer(value);
  Object.defineProperty(obj, key, {
    get(){
      return value;
    }, 
    set(newValue){
      if(newValue !== value){
        // 如果newValue是对象类型，则继续侦测该对象的所有属性变化
        // observer函数中已经有对参数是否是对象类型的判断代码，此处可以省略
        observer(newValue);
        updateView(); //在set方法中触发更新
        value = newValue;
      }
    }
  });
}

const arrayPrototype = Array.prototype;
// 使用数组的原型对象创建一个新对象
const proto = Object.create(arrayPrototype); 

// 改变数组自身内容的方法只有如下7个，对它们进行拦截
['push','pop','shift','unshift', 'splice', 'sort', 'reverse']
.forEach(method => {
  Object.defineProperty(proto, method,{
    get(){
      updateView();
      // 返回数组原有的方法      
      return arrayPrototype[method];
    }    
  });
});

// 对一个对象中所有属性的变化进行侦测
function observer(target){
  // 如果不是对象数据类型直接返回
  if(typeof target !== 'object'){
    return target;
  }
  if(Array.isArray(target)){
    // 如果target是数组，则将数组的原型对象设置为proto
    Object.setPrototypeOf(target, proto);
    // 对数组中的元素进行侦测
    for(let i = 0; i < target.length; i++){
      observer(target[i])
    }
    return;
  }
  
  // 循环遍历对象的所有属性，并将它们转换为getter和setter形式
  for(let key in target){
    defineReactive(target, key, target[key]);
  }
}


// 模拟更新视图的方法
function updateView(){
  console.log("更新视图");
}


/* let user = {name: '张三', address: {city: '北京'}};
// 对user对象的所有属性变化进行侦测
observer(user);
//user.address.city = '天津';
user.address = {city: '天津'};
user.address.city = '成都'; */

let user = {name: '张三', address: {city: '北京'}, emails: [{email: 'zhang@163.com'}]};
// 对user对象的所有属性变化进行侦测
observer(user);
 user.emails.push({email: 'zhang@sina.com'});
 console.log(user.emails[1].email);
