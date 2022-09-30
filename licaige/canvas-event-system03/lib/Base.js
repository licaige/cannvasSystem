import { creatId } from './utils.js';
//基类的意思
export default class Base {
  // 绘制上下文实例
  static context = null
  /**
   * eleIds: 已有元素的id,
   * ctx: 画布绘制上下文,
   * hideCtx: 影子画布上下文
   * options: 元素节点信息,
   * index: 元素绘制顺序下标
   * @param {*} props
   */
  constructor(props){
    Object.assign(this, props)
    // 实例上创建了id标识符
    this.id = this.creatId();
  }
  //生产实例上的id，并把对应实例
  creatId(){
    let id = creatId();
    //当前创建的实例如果在context中，就把对应新生产的id，修改到对应的实例中，主要为了保证数据的唯一性
    while(Base.context.eleIds[id]){
      this.id = creatId();
    }
    //把创建的新实例，放入到对应的context上面去
    Base.context.eleIds[id] = this;
    console.log('Base.context',Base.context)
    return id;
  }

  getId(){
    return this.id;
  }
}
