// 处理器对象
const baseHandler = {
  // 陷阱函数，读取属性值时触发
  // 参数target是目标对象
  // 参数property是要获取的属性名
  // 参数receiver是Proxy对象或者继承Proxy的对象
  get(target, property, receiver){
    console.log("获取值");
  },
  // 陷阱函数，写入属性值时触发
  // 参数value是新的属性值
  set(target, property, value, receiver){
    console.log("设置值");
  },
  // 陷阱函数，删除属性时触发
  deleteProperty(target, property){
    console.log("删除属性");
  }
}
// 目标对象
const target = {name: '张三'};
// 为目标对象创建代理对象
const proxy = new Proxy(target, baseHandler);
// 读取属性值
proxy.name;
// 设置属性值
proxy.name = '李四';
// 删除属性
delete proxy.name;
