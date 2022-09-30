<!-- fireWork.vue - 烟花 -->
<template>
    <div class="container">
        <canvas ref='sky-canvas' ></canvas><!--  @mousemove.stop='mousemoveHandle($event)' @mouseleave.stop='mouseleaveHandle($event)' -->

    </div>
</template>
<style scoped>
    .container{

    }
</style>
<script>
    import utils from '@/utils/utils.js' ;

    function FireWork(sx,sy,r,color,speed,airArg,g,type){ // 参数分别是：开始x，开始y，半径，颜色，速度，空气阻力系数，重力加速度系数，类型
        this.sx = sx ; // 开始x
        this.sy = sy ; // 开始y
        this.x = this.sx ; // 烟花当前的坐标x，初始化时，与开始的x一致
        this.y = this.sy ; // 烟花当前的坐标y，初始化时，与开始的y一致
        this.r = r ;
        this.color = color ;
        this.path = [] ; // 烟花路径的点保存在此，以此形成飞行轨迹粒子
        this.speed = speed ;
        this.airArg = airArg ; // 空气阻力系数
        this.g = g ;
        this.type = type ; 
        
        if(type==1){ // type为1，是爆炸前的烟花炮弹，此时速度分量是固定的竖直向上，即x速度为0，y速度为负的speed（向上）
            this.speedX = 0 ;
            this.speedY = -speed ;
        }else{ // 不是炮弹的类型，则为爆炸碎片等粒子，速度分量向四周随机
            // 随机产生x方向的速度分量,随机正负的速度值范围
            this.speedX = Math.random()*(speed-(-speed))-speed ; 
            let speedY = Math.sqrt(Math.pow(speed,2)-Math.pow(this.speedX,2)) ; // Y方向的速度分量（勾股定理）
            speedY = Math.random()>0.5?speedY:-speedY ; // Y方向速度分量的正负号随机
            this.speedY = speedY ;// 速度的y分量初始值

            // 不是炮弹的话，存活N帧开始消失
            let n = Math.floor(Math.random()*20+30) ; // 30-50帧后,开始逐渐消失
            this.limitP = n ; 
            this.p = 0 ;
        }
        
        // 计算空气阻力的初始分量：
        this.airX = Math.abs(this.speedX)*this.airArg/this.speed ;
        this.airY = Math.abs(this.speedY)*this.airArg/this.speed ;
    }

    export default {
        
        data(){
            return {
                canvas:null , // canvas元素
                width:800 , // canvas宽度
                height:600 , // canvas高度
                background:'#333', // canvas的背景色
                ctx:null , // canvas的绘制上下文
                focusDistans:700 , // 焦点距离（透视关系中的灭点）
                g:.1, // 重力加速度 
                sky:{ // 天空的配置，背景
                    type:2, // 1 纯色， 2 渐变
                    color:'#26d', // 该颜色作为颜色基调，实际显示时，将该颜色降低了亮度，以降低天空亮度
                    colorAnimate:false , // 颜色变化动画是否开启
                    light:0 , // 天空亮度，初始是0 （取值在0到1之间）
                    lightDirect: 1,// 亮度方向, 1为正，0为负
                    lightMax:0.2 ,// 最大亮度
                },
                fireWork:{
                    list:[], // 保存烟花的数组；
                    speed:10, // 初始飞行速度,
                    airArg:.2, // 空气阻力参数，使speed减少的量
                    r:4, // 半径
                    color:['#1f9','#f61','#f16','#f2a','#5f1','#f22','#2f5'] , 
                },

                animationFrame:null, // 定时器1
                timer:null, // 定时器2
            }
        },
        methods:{
            init(){ // 初始化canvas状态
                this.canvas = this.$refs['sky-canvas'] ;
                this.canvas.width = this.width ;
                this.canvas.height = this.height ;
                this.canvas.style.background = this.background ;
                if(this.canvas.getContext){
                    this.ctx = this.canvas.getContext('2d') ;
                }else{
                    this.$message('您的浏览器不支持canvas绘画环境') ;
                }
            },
            drawSky(){ // 绘制背景色
                this.ctx.save() ;
                if(this.sky.type==2){
                    // 渐变：
                    let fill = this.ctx.createLinearGradient(0,this.height,0,0);
                    if(this.sky.colorAnimate){
                        // 启动了颜色渐变变化；
                        this.sky.color = utils.colorChange(this.sky.color,1) ; // 按照规则改变颜色rgb，实现颜色渐变
                    }
                    
                    fill.addColorStop(0,utils.colorBright(this.sky.color,-0.75)) ; // 颜色变暗75%
                    fill.addColorStop(1,utils.colorBright(this.sky.color,-0.9)) ; // 颜色变暗90%
                    this.ctx.fillStyle = fill ;
                    this.ctx.fillRect(0,0,this.width,this.height) ;
                }else{
                    // 纯色 :
                    this.ctx.fillStyle = utils.colorBright(this.sky.color,-0.85) ; // 颜色变暗85%
                    if(this.sky.colorAnimate){
                        // 启动了颜色渐变变化；
                        this.sky.color = utils.colorChange(this.sky.color,1) ; // 按照规则改变颜色rgb，实现颜色渐变
                    }
                    this.ctx.fillRect(0,0,this.width,this.height) ;
                }

                // 天空亮度，如果天空亮度有值。在背景上再绘制一层亮光覆盖
                if(this.sky.light){
                    this.ctx.fillStyle = utils.updateAlpha('#ffc',this.sky.light) ;
                    this.ctx.fillRect(0,0,this.width,this.height) ;
                }

                this.ctx.restore() ;
            },
            madeFirework(){ // 生成随机位置的烟花
                // 随机一个速度，炮弹出膛速度不同，使其达到的高度不同
                let randomNum = Math.floor(Math.random()*5+4)  //5-10之间的随机数
                let speed = this.fireWork.speed + randomNum ;
                let colorNum = Math.floor(Math.random()*(this.fireWork.color.length))
                let obj = new FireWork(this.width/2,this.height,this.fireWork.r,utils.colorBright(this.fireWork.color[colorNum],0.3),speed,this.fireWork.airArg*2,this.g,1) ; // 最后一个参数type为1，表示是子弹（爆炸前的烟花）
                this.fireWork.list.push(obj) ;
            },
            drawFirework(){ // 绘制烟花
                this.ctx.save() ;
                this.fireWork.list.forEach(item=>{
                    this.ctx.beginPath() ;
                    let grd = this.ctx.createRadialGradient(item.x,item.y,item.r/10,item.x,item.y,item.r); // 径向渐变
                    let alpha ;
                    if(item.color.indexOf("rgba")>=0){
                        alpha = item.color.match(/,([^,]+)\)$/)[1] ;
                    }else{
                        alpha = 1 ;
                    }
                    grd.addColorStop(0,item.color)
                    grd.addColorStop(0.5,utils.updateAlpha(item.color,alpha/2.5))
                    grd.addColorStop(0.9,utils.updateAlpha(item.color,0))
                    this.ctx.fillStyle = grd ;
                    this.ctx.arc(item.x,item.y,item.r,0,Math.PI*2) ;
                    this.ctx.closePath() ;
                    this.ctx.fill() ;
                })
                this.ctx.restore() ;
                this.updateFirework();
            },
            updateFirework(){
                let list = this.fireWork.list ;
                for(let i=0;i<list.length;i++){
                    let item = list[i] ;
                    // x 方向的速度和坐标变动
                    if(item.speedX<0){
                        item.speedX += item.airX;
                        if(item.speedX>=0){
                            item.speedX = 0 ;
                        }
                    }else if(item.speedX>0){
                        item.speedX -= item.airX
                        if(item.speedX<=0){
                            item.speedX = 0 ;
                        }
                    }
                    item.x += item.speedX ; 

                    // y方向的速度受重力加速度和空气阻力影响
                    if(item.speedY>0){
                        item.speedY -= item.airY ;
                    }else if(item.speedY<0){
                        item.speedY += item.airY ;
                    }
                    item.speedY += item.g ; // y方向的速度受重力加速度影响
                    item.y += item.speedY ;
                    
                    // 更新亮度，当烟花达到一定高度，越高，速度越慢，亮度逐渐降低，最终消失
                    if(item.type==1){ // 爆炸前的烟花炮弹，方向竖直向上
                        if(Math.abs(item.speedY)<=Math.abs(item.speed)/3){ // 向上的速度小于1/3时，视为上升到一定高度了。此时炮弹亮度开始下降
                            if(item.color.indexOf("rgba")>=0){
                                let alpha = Number(item.color.match(/,([^,]+)\)$/)[1]) ;
                                if(alpha<=0.05){ // 亮度低到一定程度，直接将亮度视为0
                                    item.color = utils.updateAlpha(item.color,0)
                                }else{
                                    item.color = utils.updateAlpha(item.color,alpha*0.95) ;// 亮度降低
                                }
                            }else{
                                item.color = utils.updateAlpha(item.color,1)
                            }
                        }
                        if(item.speedY>=0){ // 纵向速度变为正值，即达到最高点了，此时该炮弹爆炸，然后消失
                            // 产生爆炸：
                            let num = Math.floor(Math.random()*31+20) // 20到50之间的随机数， 破片数量 ；
                            let x = item.x ;
                            let y = item.y ;
                            list.splice(i--,1) ; 
                            let colorNum = Math.floor(Math.random()*(this.fireWork.color.length))
                            for(let j=0;j<num;j++){
                                let speed = (Math.random()*0.5+0.3)*this.fireWork.speed ;
                                let obj = new FireWork(x,y,0.5,utils.colorBright(this.fireWork.color[colorNum],0.1),speed,this.fireWork.airArg,this.g,2) ;
                                list.push(obj) ;
                            }

                            // 产生爆炸的瞬间，照亮天空
                            if(this.sky.light == 0){ // 如果天空本身没有亮度，此时直接设置一个亮度
                                this.sky.light = 0.05 ;
                                this.sky.lightDirect = 1 ; // 亮度方向为正，即越来越亮
                            }else{ // 如果此时天空已有亮度，即上一个烟花产生的亮度还有值
                                this.sky.lightDirect = 1 ; // 亮度方向为正，即越来越亮
                                this.sky.light += 0.5 ; // 此次爆炸瞬间加速亮度的提高 ;
                                if(this.sky.light>=this.sky.lightMax){
                                    this.sky.light = this.sky.lightMax ;
                                }
                            }
                            
                        }
                    }else{
                        // 如果亮度一直较高，也在达到一定帧的时候消失
                        item.p+=1 ;
                        if(item.p>=item.limitP){
                            // 达到存活帧数限制，开始逐渐消失
                            // 亮度降低（直至消失）
                            if(item.color.indexOf("rgba")>=0){
                                let alpha = Number(item.color.match(/,([^,]+)\)$/)[1]) ;
                                if(alpha<=0.05){ // 两地小到一定值，删除该点
                                    list.splice(i--,1) ;
                                    continue ;
                                }else{ // 否则，继续变暗，使亮度继续下降
                                    let num = Math.random()*0.05+0.85 ; 
                                    item.color = utils.updateAlpha(item.color,alpha*num) ;
                                }
                            }else{
                                item.color = utils.updateAlpha(item.color,1)
                            }
                        }
                    }
                    
                    // 生成火花粒子（炮弹和爆破碎片周围及运动轨迹周围，均能产生火花粒子）
                    if(item.type==2){
                        // 一定概率，产生火花粒子碎片
                        let random = Math.floor((Math.random()*100)+1) ;  // 1 - 100 之间的随机数
                        if(random<=15){
                            // 当random数字小于等于10时，才产生粒子（即概率为15%）
                            let brightNum = Math.random()*1.7-0.2 ; // 亮度系数，-0.2到1.5之间的随机数
                            let obj = new FireWork(item.x+(Math.random()*16-8),item.y+(Math.random()*16-8),Math.random()*2+0.5,utils.colorBright(item.color,brightNum),0.1,0,this.g/8,3) ; // 产生的小火花，速度很慢，空气阻力忽略不计，传0，质量很轻，下落速度受重力影响小，g取一半
                            this.fireWork.list.push(obj) ;       
                        }
                        if(random<=35){ 
                            let bright = -(Math.random()*0.2+0.1)
                            let obj1 = new FireWork(item.x,item.y,Math.random()*2+1,utils.colorBright(item.color,bright),0.1,0,this.g/8,3) ; // 炮弹或碎片的运动轨迹视觉残留，速度接近0 空气阻力和重力系数均为0
                            this.fireWork.list.push(obj1) ;  
                        } 
                    }else if(item.type==1){
                        let random = Math.floor((Math.random()*100)+1) ;  // 1 - 100 之间的随机数
                        let bright = -(Math.random()*0.2+0.1)
                        if(random<=35){ 
                            let obj1 = new FireWork(item.x,item.y,Math.random()+1,utils.colorBright(item.color,bright),0.1,0,this.g/8,3) ; // 炮弹或碎片的运动轨迹视觉残留，速度接近0 空气阻力和重力系数均为0
                            this.fireWork.list.push(obj1) ;  
                        } 
                    }
                    
                }
                
                // 更新天空亮度
                if(this.sky.light>0){
                    if(this.sky.lightDirect == 1){
                        // 亮度越来越亮
                        this.sky.light += 0.03 ;
                        if(this.sky.light >= this.sky.lightMax){ // 超过最大值了，
                            this.sky.light = this.sky.lightMax ; // 设为最大值
                            this.sky.lightDirect = 0 ; // 方向开始反过来，即越来越暗
                        }
                    }else if(this.sky.lightDirect == 0){
                        this.sky.light -= 0.01 ;
                        if(this.sky.light<=0){
                            this.sky.light = 0 ;
                        }
                    }
                }
            },
            move(){
                this.ctx.clearRect(0,0,this.width,this.height) ;
                this.drawSky() ;
                this.drawFirework() ;

                let requestAnimationFrame = window.requestAnimationFrame||window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame||window.msRequestAnimationFrame ;
                
                if(requestAnimationFrame){
                    this.animationFrame = requestAnimationFrame(this.move) ;
                }else{
                    this.timer = setTimeout(()=>{
                       this.move() ;
                    },1000/60)
                }
            },
            clickHandler(evt){ // 鼠标点击事件
                let e = evt || window.event ;
                let x = e.offsetX ;
                let randomNum = Math.floor(Math.random()*5+4)
                // 颜色随机
                let colorNum = Math.floor(Math.random()*(this.fireWork.color.length))
                let obj = new FireWork(x,this.height,this.fireWork.r,utils.colorBright(this.fireWork.color[colorNum],0.3),this.fireWork.speed+randomNum,this.fireWork.airArg,this.g,1) ; // 最后一个参数type为1，表示是子弹（爆炸前的烟花）
                this.fireWork.list.push(obj) ;
            }
        },
        mounted(){
            this.init() ;
            if(!this.ctx) return false ;
            this.canvas.addEventListener('click',this.clickHandler,false)
            this.madeFirework() ;
            this.move() ;
        },
        beforeDestroy(){
            // 清除定时器：
            if(this.animationFrame){
                window.cancelAnimationFrame(this.animationFrame) ;
            }else if(this.timer){
                window.clearTimeout(this.timer) ;
            }
            // 解绑鼠标事件：
            this.canvas.removeEventListener('click',this.clickHandler)
        }
    }
</script>