<!-- starTravel.vue - 星际旅行 -->
<template>
    <div class="container">
        <canvas ref='sky-canvas' ></canvas><!-- @mousemove.stop='mousemoveHandle($event)' @mouseleave.stop='mouseleaveHandle($event)' -->
    </div>
</template>
<style scoped>
    
</style>
<script>
    import utils from '@/utils/utils.js' ;
    export default {
        data(){
            return {
                canvas:null , // canvas元素
                width:1000 , // canvas宽度
                height:600 , // canvas高度
                background:'#333', // canvas的背景色
                ctx:null , // canvas的绘制上下文
                focusDistans:700 , // 焦点距离（透视关系中的灭点）
                sky:{ // 天空的配置
                    background:'#5500ff' , // 颜色基调，实际显示时，将之降低了亮度，以使天空亮度降低
                    type:2,  // 1 纯色，2 渐变色
                    colorAnimate:true , // 是否开启颜色改变的动画
                },
                stars:{ // 星星的配置
                    count:150,
                    color:'#f0f0f0',
                    r:6, // 半径的基准值（参考值，会有一定波动，以及根据景深不同而有大小不同等）
                    alpha:1 , // alpha 基准值，会根据z距离而变化，产生远距离模糊 和 近距离清晰的感觉 ；
                    alphaMin:0.2 ,// alpha最小值，对应灭点处的alpha值
                    list:[], // 保存所有星星的数组
                    speedArg:1, // 速度值系数，基准值为1 ，z越大，系数越小。由于飞机飞行时，实际在运动的是星星（飞机保持不动），所以最终影响速度的值是飞机的速度*该系数。
                },
                plane:{ // 飞机对象的配置
                    angle:0 , // 初始角度0，(指向正右边)；取值在正负PI之间，指向右边是0度，顺时针方向旋转；即在x轴下方的是正PI之间，在x轴上面的是负PI之间取值  Math.atan2(y,x)得到
                    speed:3 , // 初始速度基准值，
                    speedX:3 , // x方向是速度分量，和speed一样，水平向右，初始值；
                    speedY:0 , // y方向是速度分量，为0，水平向右，初始值；
                    maxSpeed:12 ,// 最大速度
                    color:"#f05060" , // 飞机颜色
                    fireColor:'#f0f066' , // 喷出的火焰的颜色
                    fireWaveAngle:0  // 火焰摆动的幅度的角度，从0到360，速度越快，摆动越大由该值和speed来决定；火焰端点所在位置则由该值出现的sin值产生（1到-1之间）的系数来决定使火焰产生摆动感
                },

                animationFrame:null, // 定时器1
                timer:null,   // 定时器2
            }
        },
        methods:{
            init(){ // 初始化canvas状态
                console.log(this.sky)
                this.canvas = this.$refs['sky-canvas'] ;
                this.canvas.width = this.width ;
                this.canvas.height = this.height ;
                this.canvas.style.background = this.background ;
                if(this.canvas.getContext){
                    this.ctx = this.canvas.getContext('2d') ;
                }else{
                    this.$message('您的浏览器不支持canvas绘画环境');
                }
            },
            madeStar(){
                /*stars:{ // 星星的配置
                    count:100,
                    color:'#fff',
                    r:5, // 半径的基准值（参考值，会有一定波动，以及根据景深不同而有大小不同等）
                    alpha:1 , // alpha 基准值，会根据z距离而变化，产生远距离模糊 和 近距离清晰的感觉 ；
                    alphaMin:0.4 ,// alpha最小值，对应灭点处的alpha值
                    list:[], // 保存所有星星的数组
                    speedArg:1, // 速度值系数，基准值为1 ，z越大，系数越小。由于飞机飞行时，实际在运动的是星星（飞机保持不动），所以最终影响速度的值是飞机的速度*该系数。
                },*/
                let $vue = this ; 
                function Stars(x,y,z){
                    this.x = x ;
                    this.y = y ;
                    this.z = z ;
                    let arg = Math.random()>0.5?Math.random():-Math.random() ; // 正负1之间
                    let r = $vue.stars.r + arg ; // r值根据基准值再加上正负1的随机大小变化；
                    // 根据z的关系，计算此时应该显示的r值（3d拍平）：
                    // r/$vue.focusDistans = x /($vue.focusDistans - z)
                    this.r = ($vue.focusDistans - this.z)*r / $vue.focusDistans ;
                    let alphaArg = ($vue.stars.alpha-$vue.stars.alphaMin)/$vue.focusDistans ; // 每单位z距离上的alpha变化值 ；
                    this.alpha = $vue.stars.alpha - alphaArg*this.z ;
                    this.color = utils.updateAlpha($vue.stars.color,this.alpha) ; // 根据alpha和color配置，确定每个star的color ；
                    this.speedArg = ($vue.focusDistans-this.z)*$vue.stars.speedArg/$vue.focusDistans ;
                }
                for(let i=0;i<this.stars.count;i++){
                    let x = Math.floor(Math.random()*($vue.width+1)) ;
                    let y = Math.floor(Math.random()*($vue.height+1)) ;
                    let z = Math.floor(Math.random()*($vue.focusDistans+1)) ; // 景深（灭点）决定z坐标范围
                    this.stars.list.push(new Stars(x,y,z)) ; 
                }
            },
            drawStars(){
                let list = this.stars.list ;
                list.forEach((item,index)=>{
                    this.ctx.save() ;
                    this.ctx.beginPath() ;
                    this.ctx.arc(item.x,item.y,item.r,0,2*Math.PI) ;
                    this.ctx.closePath();
                    let fill = this.ctx.createRadialGradient(item.x,item.y,item.r/5,item.x,item.y,item.r) ;
                    fill.addColorStop(0.1,utils.updateAlpha(item.color,0.9))
                    fill.addColorStop(0.2,utils.updateAlpha(item.color,0.6))
                    fill.addColorStop(0.9,utils.updateAlpha(item.color,0))

                    this.ctx.fillStyle = fill ; 
                    this.ctx.fill() ;
                    this.ctx.restore() ;
                })
            },
            drawBackground(){ // 绘制背景颜色
                this.ctx.save() ;
                if(this.sky.type==2){
                    // 渐变：
                    let fill = this.ctx.createLinearGradient(0,this.height,0,0);
                    if(this.sky.colorAnimate){
                        // 启动了颜色渐变变化；
                        this.sky.background = utils.colorChange(this.sky.background,1) ; // 按照规则改变颜色rgb，实现颜色渐变
                    }
                    
                    fill.addColorStop(0,utils.colorBright(this.sky.background,-0.35)) ; // 颜色变暗35%
                    fill.addColorStop(1,utils.colorBright(this.sky.background,-0.9)) ; // 颜色变暗90%
                    this.ctx.fillStyle = fill ;
                    this.ctx.fillRect(0,0,this.width,this.height) ;
                }else{
                    // 纯色 :
                    this.ctx.fillStyle = utils.colorBright(this.sky.background,-0.6) ; // 颜色变暗60%
                    this.ctx.fillRect(0,0,this.width,this.height) ;
                }
                this.ctx.restore() ;
            },
            drawPlane(){

                this.ctx.save() ;
                this.ctx.translate(this.width/2,this.height/2) ; // 偏移，使飞机处于画布中间
                this.ctx.rotate(this.plane.angle)
                this.ctx.beginPath() ;
                this.ctx.moveTo(20,0) ;
                this.ctx.lineTo(-10,-15) ;
                this.ctx.lineTo(-10,15) ;
                this.ctx.closePath() ;
                this.ctx.fillStyle = this.plane.color ;
                this.ctx.fill() ;
                // 画飞机的喷火：
                this.ctx.beginPath() ;
                // 火焰摆动的幅度由正1到负1之间不断变化，计算该值：
                var rNum = Math.sin(this.plane.fireWaveAngle/180*Math.PI) ;
                this.ctx.moveTo(-10-(this.plane.speed*0.6+3),rNum*this.plane.speed/2) ; // 最远端点决定了火焰的喷出长度，而飞机速度越快，喷出火焰越多，所以最远端点的x值根据飞机速度来取值,而火焰的摆动则体现在y值的左右变化，速度越快，摆动幅度越大，所以y值也有speed的一半来决定。
                this.ctx.lineTo(-10,-10) ;
                this.ctx.lineTo(-10,10) ;
                this.ctx.closePath() ;
                this.ctx.fillStyle = this.plane.fireColor ;
                this.ctx.fill() ;
                this.ctx.restore() ;

                // 更新火焰的摆动：
                this.plane.fireWaveAngle += 90 ; // 每帧，角度增加90度，
                if(this.plane.fireWaveAngle>=360){ // 超过360度，重置为0度
                    this.plane.fireWaveAngle = 0 ;
                }
            },
            mousemoveHandler(evt){
                let e = evt || window.event ;
                let x = e.offsetX ;
                let y = e.offsetY ;
                /*plane:{ // 飞机对象的配置
                    angle:(45*Math.PI/180) , // 初始角度0，取值范围：0~2*PI ，0到2PI之间；
                    speed:1 , // 初始速度基准值，
                    
                    color:"#f04050" , // 颜色
                }*/
                // 计算距离：
                let distance = Math.sqrt(Math.pow((x - this.width/2) ,2 )+Math.pow((y - this.height/2) ,2 ))
                // 最远处的距离：
                let distanceMax = Math.sqrt(Math.pow(this.width/2 ,2 )+Math.pow(this.height/2 ,2 )) ;
                // 根据距离改变速度参数：
                // this.plane.maxSpeed / distanceMax = this.speed/distance
                this.plane.speed = distance/distanceMax * this.plane.maxSpeed ;
                // 计算出x和y方向的速度分量：
                if(this.plane.speed===0){
                    this.plane.speedX = 0 ;
                    this.plane.speedY = 0 ;
                }else{ // 由于speed有可能为0（distance为0造成），而distance作为分母不应该为0 ，所以要另外判断、
                    this.plane.speedX = (x - this.width/2)/distance * this.plane.speed ;
                    this.plane.speedY = (y - this.height/2)/distance * this.plane.speed ;
                }
                
                // 角度的改变：
                this.plane.angle = Math.atan2(y-this.height/2,x-this.width/2) ;
            },
            updateStars(){
                let list = this.stars.list ; // 全部星星；
                let newStar = [] ; // 新增加的星星保存在这里 ；
                for(let i=0;i<list.length;i++){
                    let item = list[i] ;
                    let starSpeedX = item.speedArg*(-this.plane.speedX) ;// 乘以飞机的速度取反（负号），因为星星的运动方向和飞机相反，而飞机实际上保持不动。
                    let starSpeedY = item.speedArg*(-this.plane.speedY) ;// 乘以飞机的速度取反（负号），因为星星的运动方向和飞机相反，而飞机实际上保持不动。
                    item.x += starSpeedX ; 
                    item.y += starSpeedY ;

                    // 判断飞出可视区：
                    if(item.x<=0-item.r||item.x>=this.width+item.r||item.y<0-item.r||item.y>this.height+item.r){
                        // 说明跑出了可视区，根据他跑出去的位置，在反方向的地方将他放在那里：
                        // 判断跑出去的位置：
                        if(item.x<=0-item.r){
                            // 从左边跑出去的，那么将他放在右边：
                            let x = this.width + item.r ; // 可视区右边
                            let y = Math.floor(Math.random()*(this.height+1)) ; // y随机
                            item.x = x ; 
                            item.y = y ;
                        }else if(item.x>=this.width+item.r){
                            // 从右边跑出了可视区，那么将它放在左边：
                            let x = 0 - item.r ; // 可视区左边
                            let y = Math.floor(Math.random()*(this.height+1)) ; // y随机
                            item.x = x ; 
                            item.y = y ;
                        }else if(item.y<0-item.r){
                            // 从可视区上面跑出了可视区，那么将它放在下面：
                            let x = Math.floor(Math.random()*(this.width+1)) ; // x随机
                            let y = this.height+item.r ;
                            item.x = x ; 
                            item.y = y ;
                        }else if(item.y>this.height+item.r){
                            // 从可视区下面跑出了可视区，那么将它放在上面：
                            let x = Math.floor(Math.random()*(this.width+1)) ; // x随机
                            let y = 0-item.r ;
                            item.x = x ; 
                            item.y = y ;
                        }
                    }
                }
            },
            move(){
                this.ctx.clearRect(0,0,this.width,this.height);
                this.drawBackground() ;
                this.drawStars() ;
                this.drawPlane() ;
                this.updateStars() ;

                let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ;
                if(requestAnimationFrame){
                    this.animationFrame = requestAnimationFrame(()=>{
                        this.move();
                    })
                }else{
                    this.timer = setTimeout(()=>{
                        this.move();
                    },1000/60)
                }
            }
        },
        mounted(){
            this.init() ;
            if(!this.ctx) return ;
            this.madeStar() ; // 创建星星
            this.move(); // 执行动画
            // 添加鼠标事件：
            this.canvas.addEventListener('mousemove',this.mousemoveHandler,false) ;
        },
        beforeDestroy(){
            // 移除鼠标事件：
            this.canvas.removeEventListener('mousemove',this.mousemoveHandler) ;

            // 清除定时器：
            if(this.animationFrame){
                window.cancelAnimationFrame(this.animationFrame) ;
            }else if(this.timer){
                window.clearTimeout(this.timer) ;
            }
        }
    }
</script>