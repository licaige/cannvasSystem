//引入事件类
import Event from '../eventEmitter/index.js'
//通过声明Rect类，方便后面直接进行类的实例化，方便方法等统一调用
class Rect extends Event {
    constructor(opts, canvas) {
        super()
        this.canvas = canvas
        //这个地方，相当于把Rect实例需要的参数，集中放置到对应的对象中，后面可以直接从对象中解构使用
        this.config = opts
        //不可以添加自定义属性？
        this.li=opts.id
        this.isClick=opts.isClick
        console.log('opts',opts)
    }
    // 绘制rect方法
    draw() {
        const ctx = this.canvas.ctx
        const { x, y, width, height, fillStyle } = this.config
        ctx.fillStyle = fillStyle
        ctx.fillRect(x, y, width, height)
        console.log('this.config',this.config)
        //不可以添加自定义属性？
         this.li=this.config.id
    }

    // canvas坐标系中的x和y
    isHit(cx, cy) {
        const { x, y, width, height } = this.config
        if (
            x < cx
            && cx < x + width
            && y < cy
            && cy < y + height
        ) {
            return true
        }
        return false
    }

    clearShape(){
      // console.log('清楚画布')
      // const ctx = this.canvas.ctx
      // ctx.clearRect(0,0,ctx.width,ctx.height)
    }

}

export default Rect
