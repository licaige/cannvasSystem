<!-- ball.vue - 球体 -->
<template>
    <div class="container">
        <canvas ref='ball-canvas' @mousemove.stop='mousemoveHandle($event)' @mouseleave.stop='mouseleaveHandle($event)'></canvas>
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
                width:800 , // canvas宽度
                height:600 , // canvas高度
                background:'#333', // canvas的背景色
                ctx:null , // canvas的绘制上下文
                focusDistans:700 , // 焦点距离（透视关系中的灭点）
                ball:{ // 球的一些配置
                    color:'#e91e63' ,
                    X:0 , // 球的初始球心坐标X
                    Y:0 , // 球的初始球心坐标Y
                    Z:0 ,  // 球的初始球心坐标Z（从屏幕垂直往里面是z轴正方向）
                    R:200 , //球的初始球半径
                },
                angleStep:10 , // 球体每10度，就切割一个切面（平行于屏幕的切面，圆形，大小将与其z位置挂钩），这个值越小，切面越密集 
                layers:[] , // 所有切面数据对象,
                points:[] ,// 所有的点数据
                pointR: 1 ,//点的半径标准，离我们越远，半径越小，反之越大，具体的r值需要根据该值和z值计算出来
                alphaMin:0.6 ,// 根据不同材质，透明度不同;假设我们的材质最小alpha值是该值（球背面离我们最远的那个点的alpha值）
                mousePos:[], // 鼠标坐标值
                rotateLimit:1 ,// 转动速度，限制值1度；
                moveFlag:true, // 正在运动的标记
                animationFrame:null, // 定时器1
                timer:null, // 定时器2
            }
        },
        methods:{
            init(){ // 初始化canvas状态
                this.canvas = this.$refs['ball-canvas'] ;
                this.canvas.width = this.width ;
                this.canvas.height = this.height ;
                this.canvas.style.background = this.background ;
                if(this.canvas.getContext){
                    this.ctx = this.canvas.getContext('2d') ;
                }else{
                    this.$message('您的浏览器不支持canvas绘画环境');
                }
            },
            calcLayer(){ // 假设将球用平行于屏幕的平面切割，形成很多切面（这些切面都是圆形，且平行于屏幕，大小将根据z轴位置有所不同），计算并返还这些切面的圆心坐标xyz和半径，
                // 由于这些切面是平行于屏幕的，圆心只有在z轴方向上有区别；x，y方向上都和球心是一样的
                let layers = [] ;
                // 背对我们的半球进行切面(angle可以等于0，即包含穿过球心的那个切面)：
                for(let angle=(90-this.angleStep);angle>=0;angle-=this.angleStep){
                    let obj = {
                        x:0,
                        y:0,
                        z:Math.sin((Math.PI/180)*angle)*this.ball.R ,
                        r:Math.cos((Math.PI/180)*angle)*this.ball.R ,
                    }
                    layers.push(obj);
                }
                // 面向我们的半球进行切面（不包含穿过球心的切面）：
                for(let angle=(0+this.angleStep);angle<90;angle+=this.angleStep){
                    let obj = {
                        x:0,
                        y:0,
                        z: - Math.sin((Math.PI/180)*angle)*this.ball.R ,
                        r:Math.cos((Math.PI/180)*angle)*this.ball.R ,
                    }
                    layers.push(obj);
                }
                this.layers = layers ;
            },
            calcPonit(){ // 从所有的切面上，围绕切面（圆）的圆周，生成点；
                var points = [] ;
                // 从12点钟方向，顺时针旋转，每隔angleStep度，定一个点，得到其坐标（由于该切面是平行于屏幕的，所以该点的坐标z值和该切面的z值是一样的，只需计算xy即可）：
                
                for(let i=0;i<this.layers.length;i++){
                    let layer = this.layers[i] ; // 取出每一个切面对象
                    for(let j=0;j<360;j+=this.angleStep){
                        let obj = {
                            x:layer.r * Math.sin(Math.PI/180*j) , //别忘了相对球心的偏移，球心的坐标是相对canvas坐标有偏移的
                            y:layer.r * Math.cos(Math.PI/180*j) ,//别忘了相对球心的偏移，球心的坐标是相对canvas坐标有偏移的
                            z:layer.z ,
                            color:this.ball.color
                        }
                        let newObj = this.calcRAndAlpha(obj); // 计算了r和alpha的点数据
                        
                        points.push(newObj) ;
                    }
                }
                this.points = points ;
            },
            calcRAndAlpha(point){ // 根据z值，计算这个点的r值和alpha值
                let z = point.z ;
                let r,alpha ;
                // z值的大小，影响点离我们的距离远近（z轴是垂直屏幕指向屏幕内的），所以，根据近大远小原则，z值越大，r越小，alpha越小
                r = this.pointR/this.focusDistans * (this.focusDistans - z) ;
                // alpha值则比较特别，面向我们这半球（z<=0,注意，屏幕处的z是0，以指向屏幕里为正方向），alpha值都是1；其他凡是在背面半球的点，则根据z值，z越往里面，则alpha值越小,：
                if(z<=0){
                    alpha = 1 ;
                }else{
                    alpha = this.alphaMin/(this.focusDistans - this.ball.R) * (this.focusDistans - z) ;
                }

                // 还要根据alpha值，处理颜色：
                let color ;
                if(point.color.indexOf('rgb')>=0){
                    // 已经是rgba形式的颜色值了，那么这次就更新他的alpha值即可：
                    color = utils.updateAlpha(point.color,alpha) ;
                }else{
                    // 不是rgb形式的颜色值，而是Hex的颜色值，则要处理成rgba形式，加入alpha值
                    color = utils.HexColorToRGB(point.color,alpha) ;
                }
                
                // 将点里面加入r和alpha字段，并返回新的point
                point.r = r ;
                point.alpha = alpha ;
                point.color = color ;
                return point ;
            },
            drawPoint(){
                this.ctx.clearRect(0,0,this.width,this.height) ;// 清除画布
                // 绘制点：
                this.ctx.save() ; // save必须在translate的前面，因为偏移需要被重置
                this.ctx.translate(this.width/2,this.height/2) ; // 由于球面的坐标按照坐标系的圆点为中心点，得到的全部的点的坐标，在绘制时，需要将球绘制到canvas的中间，所以全部点都要先设置canvas的偏移，这样使球心位于canvas的中心
                for(let i=0;i<this.points.length;i++){
                    this.ctx.beginPath() ;
                    this.ctx.fillStyle = this.points[i].color ;
                    this.ctx.arc(this.points[i].x,this.points[i].y,this.points[i].r,0,Math.PI*2);
                    this.ctx.fill() ;
                    this.ctx.closePath();
                    
                    // 更新点的坐标：
                    this.updatePoint(this.points[i])
                }
                this.ctx.restore() ; // 绘制完后，重置ctx（尤其是上面translate的偏移需要被重置）
            },
            updatePoint(point){ // 旋转时，根据球面坐标，计算并更新每一个点的坐标值
                // 传入x，y坐标为鼠标在canvas上的坐标值，根据鼠标位置，计算球体根据x轴转个根据y轴转动的幅度，从而更新点的数据。
                let speed = this.rotateLimit ; // 转速,每帧转动的角度
                // 根据鼠标坐标，判断转动分别在x轴和y轴的速度分量：
                if(!this.mousePos[0]){
                    this.mousePos = [300,200]
                }

                let deviatorX = parseInt(this.mousePos[0]) - this.width/2 ; // x坐标偏量，影响的是绕Y轴旋转的angleY 
                let deviatorY = parseInt(this.mousePos[1]) - this.height/2; // y坐标偏量，影响的是绕X轴旋转的angleX 
                
                // 根据鼠标离球心的距离，设定一个系数，越远，速度越快：
                let arg , distance; // 系数，距离
                distance = Math.sqrt(Math.pow(deviatorX,2)+Math.pow(deviatorY,2)) ;
                if(distance<=this.ball.R){
                    // 距离小于球半径的，则系数为1即可；
                    arg = 1 ;
                }else{
                    arg = 1/this.ball.R * distance
                }
                // 让速度乘以该系数：
                speed *= arg ;
                
                // 计算速度的分量：
                // x和y按照分量的比值（分母是绝对值相加的总量，分子则有可能根据在坐标系中的象限不同而有正负之分，由此决定球度旋转方向等）
                let angleY = deviatorX/(Math.abs(deviatorX)+Math.abs(deviatorY)) * speed ;
                let angleX = deviatorY/(Math.abs(deviatorX)+Math.abs(deviatorY)) * speed ;
                
                function rotateY(){ 
                    let x1 = Math.cos(Math.PI/180*angleY)* point.x - Math.sin(Math.PI/180*angleY)* point.z ;
                    let z1 = Math.sin(Math.PI/180*angleY)* point.x + Math.cos(Math.PI/180*angleY)* point.z ;
                    point.x = x1 ;
                    point.z = z1 ;
                }
                function rotateX(){ 
                    let y1 = Math.cos(Math.PI/180*angleX)* point.y - Math.sin(Math.PI/180*angleX)* point.z ;
                    let z1 = Math.sin(Math.PI/180*angleX)* point.y + Math.cos(Math.PI/180*angleX)* point.z ;
                    point.y = y1 ;
                    point.z = z1 ;
                }
                function rotateZ(){ 
                    let x1 = Math.cos(Math.PI/180*angleX)* point.x - Math.sin(Math.PI/180*angleX)* point.y ;
                    let y1 = Math.sin(Math.PI/180*angleX)* point.x + Math.cos(Math.PI/180*angleX)* point.y ;
                    point.x = x1 ;
                    point.y = y1 ;
                }
                rotateY();
                rotateX();
                // rotateZ(); 
                
                // 更新xyz后，需要再次根据z，计算r和alpha值：
                let newPoint = this.calcRAndAlpha(point)
                return newPoint ;
            },
            mousemoveHandle(e){
                this.moveFlag = true ;
                this.mousePos = [
                    e.offsetX,
                    e.offsetY
                ]
                if(!this.timer&&!this.animationFrame){
                    this.move() ;
                }
            },
            mouseleaveHandle(e){
                this.moveFlag = false ;
                if(this.animationFrame){
                    cancelAnimationFrame(this.animationFrame) ;
                    this.animationFrame = null ;
                }
                if(this.timer){
                    this.timer = null ;
                }
            },
            move(){
                this.drawPoint(); 
                if(this.moveFlag){
                    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ;
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
        },
        mounted(){
            this.init() ; // 初始化开始状态 ；
            this.calcLayer() ;  // 计算并获得切面的基本数据
            this.calcPonit() ;  // 计算并获得所有点的坐标数据；
            this.move();  ; // 首次执行，
        },
        beforeDestroy(){
            // 清除定时器（相当于执行一次鼠标离开即可）
            this.mouseleaveHandle();
        }
    }
</script>

