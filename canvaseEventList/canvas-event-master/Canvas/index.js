import Event from '../eventEmitter/index.js'
import * as Shapes from '../shape/index.js'
import {upperFirst} from '../utils/index.js'
//声明事件类型
const eventList = [
  'click',
  'mousedown',
  'mouseup',
  // ...
]

//声明对应Canvas类
class Canvas extends Event {
  defaultOpts = {}

  constructor(c) {
    super()
    this.canvas = c
    this.ctx = c.getContext('2d')
    this.children = []
    // 在canvas上监听eventList的事件
    this.initEvent()
  }

  //注册事件
  initEvent() {
    eventList.forEach(eventName => {
      //事件机制处理对应的事件，此处相当于注册
      this.canvas.addEventListener(eventName, this.handleEvent)
    })
  }

  handleEvent = (event) => {
    console.log('event', event)
    // // shape emit event
    // this.children
    //   // TODO: 优化点，每个图形都需要判断事件发生的位置是否在自己的区域内
    //   .filter(shape => shape.isEventInRegion(event.x, event.y))
    //   .forEach(shape => shape.emit(event.type, event))
    // canvas emit event
    // this.emit(event.type, event)
    // shape emit event
    // 获取事件的当前点的信息
    // clientPoint and canvasPoint
    const pointInfo = this.getPointInfo(event);
    console.log('pointInfo', pointInfo)
    // 判断事件点落在哪个图形中
    const shape = this.getShape(pointInfo.x, pointInfo.y);
    console.log('拿到对应的shape图层', shape)
    if (shape) {
      //如果当前图形被选中，就触发对应的事件（因为这个shape是比如Rect类的实例，在对应的类中，继承了Event原型中的方法
      shape.emit(event.type, event)
    }
  }

  // 找到命中的shape
  getShape(x, y) {
    let shape = null;
    const children = this.children
    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i];
      // 具体判断方法在每个shape中实现，不同shape判断原理不同
      if (child.isHit(x, y)) {
        //比如Rect类原型上，会存在一个判断是否在内部的方法
        shape = child;
      }
      if (shape) {
        break;
      }
    }
    return shape;
  }

  //得到canvas系统中的数据
  getPointInfo(event) {
    const clientPoint = this.getClientByEvent(event)
    const point = this.getPointByClient(clientPoint.x, clientPoint.y)
    return {
      x: point.x,
      y: point.y,
      clientX: clientPoint.x,
      clientY: clientPoint.y,
    };
  }

  //得到对应的client数据
  getClientByEvent(event) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  // 基于canvas坐标的point
  getPointByClient(clientX, clientY) {
    const bbox = this.canvas.getBoundingClientRect();
    return {
      x: clientX - bbox.left,
      y: clientY - bbox.top,
    };
  }

  //用于获取图层的，比如Rect类的实例
  addChild(shape) {
    this.children.push(shape)
    // console.log('this.children',this.children)
  }

  // 通过children中的实例，对应的上面存在draw方法在原型上面
  draw() {
    console.log('454545', this.children)
    this.children.forEach(shape => shape.draw())
  }

  addShape(type, attrs) {
    console.log('9999999999')
    //type类型先转换大小写统一
    const ShapeType = upperFirst(type)
    //确定下要新建的是那个类型的数据，如Rect类
    const Cons = Shapes[ShapeType]
    const shape = new Cons(attrs, this)
    //此处可以打印出Rect类上自定义的属性
    // console.log('shape',shape)
    //把对应的图层，放入到children数组中
    this.addChild(shape)
    return shape
  }
  //因为涉及到shape对应颜色变动，需要更新children中，对应shape的数据
  changeShape(shape,opts) {
    let current = this.children.indexOf(shape)
    console.log('changeShape current',current)
    if (current !== -1) {
      // 动态修改对应参数
      this.children.forEach((item, index) => {
        //当前被选中的item进行数据变动
        if (index === current) {
          console.log('当前需要操作项',item,opts,shape)
          item.config=opts
          item.isClick=opts.isClick
        }else {
        //  其他的，为了防止已经有被点击的了，就把其他的shape对应的isClick修改为默认，这样减轻场景判断
          item.isClick=false
          //参数配置要归位,这样children里面的数据就对了
          item.config={
            ...item.config,
            isClick:false,
            fillStyle: 'red',
          }
        }
      })
      console.log('this.children 李琦', this.children)
    }
  }
}

export default Canvas
