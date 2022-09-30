<!-- particle.vue - canvas图像粒子化处理 -->
<template>
    <div class="container">
        <div class="input-wrap">
            <el-input v-model.trim="input" size='small' placeholder="请输入内容"></el-input>
            <el-button type='primary' size='small' @click='changeShow'>确定</el-button>
        </div>
        <canvas ref='shape-canvas'></canvas>
    </div>
</template>
<style scoped>
    .input-wrap{
        width: 400px;
        position: absolute;
        right: 50%;
        top: 30px;
    }
    .el-input{
        width: 70%;
    }
</style>
<script>
    export default {
        data(){
            return {
                canvas:null, // canvas元素
                background:'#222',
                width:800, // canvas宽度
                height:600, // canvas高度
                ctx:null , // canvas的绘制上下文
                input:'HELLO!', // 输入的内容
                grid:10 , // 栅格间距（取样点的间距）
                point:{
                    maxR:6.5 , // 粒子的最大半径
                    minR:0.5 , // 粒子的最小半径
                    step:0.15, // 例子动画半径的改变量,初始标准值
                    colors:['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#03a9f4','#00bcd4','#009688','#4CAF50','#8BC34A','#CDDC39','#FFEB3B','#FFC107','#FF9800','#FF5722']  // 预定一些较好的颜色
                },
                points:[] , // 所有的粒子
                oldPoints:[] , // 旧有的粒子
            }
        },
        methods:{
            init(){ // 初始化canvas状态
                this.canvas = this.$refs['shape-canvas'] ;
                this.canvas.width = this.width ;
                this.canvas.height = this.height ;
                this.canvas.style.background = this.background ;
                if(this.canvas.getContext){
                    this.ctx = this.canvas.getContext('2d') ;
                }else{
                    this.$message('您的浏览器不支持canvas绘画环境');
                }
            },
            changeShow(){ // 改变显示的文字
                if(!this.input) return ;
                if(this.timer) clearTimeout(this.timer) ;
                if(this.points&&this.points.length){
                    // 如果已有粒子了，那么当前已有的粒子做随机方向的消失动画：
                    this.oldPoints = this.points ; // 这些旧有的粒子
                    this.points = [] ; // 清空该位置的粒子，使之不再受闪烁动画的作用
                    setTimeout(()=>{ // 如果有旧粒子，则晚点再刷出新粒子（让旧粒子飞一会）
                        this.shape() ;
                    },150)
                }else{
                    // 如果没有旧粒子，直接处理展示新粒子
                    this.shape() ;
                }
                this.showParticle() ;
                /*this.ctx.clearRect(0,0,this.width,this.height) ;// 先清除画板
                this.shape() ; // 将内容粒子化绘制（新的粒子生成）*/

            },
            shape(){ // 将文字粒子化的核心方法
                this.ctx.clearRect(0,0,this.width,this.height) ;
                this.ctx.font = '500 140px yahei';
                this.ctx.textAlign = 'center' ; // 文字水平居中
                this.ctx.textBaseline='middle'; // 文字基线居中（垂直居中）
                this.ctx.fillStyle = this.background ;
                this.ctx.fillText(this.input,this.width/2,this.height/2) ;
                var data = this.ctx.getImageData(0,0,this.width,this.height) ;
                let data32 = new Uint32Array(data.data.buffer) ; // 转成32位的数据数组
                // 说明: 由于imageData中的data数组，表示的是图片数据的每个点的r/g/b/a的值，每个值都是0-255（buffer是8位的），即第一个数据表示第一个像素点的r值，第二个数据表示第一个像素点的g值，以此类推，所以这里4个数据合在一起才是一个完整的rgba值，才能表示一个像素点。所以我们将这个8位的数据，转为32位数据，即将这里四个数据合成一个32位数据，因此得到的32位数据数组，每个元素刚好对应图片上一个像素点。
                
                // console.log('__data32',data32);
                let posArr = [] ; // 有效抽样点的集合
                for(let y = 0;y<this.height;y += this.grid) {// 每隔posDistance行循环一次，取y值
                  for(let x = 0;x<this.width;x += this.grid){ // 每行中，每隔posDistance列循环一次，取x值
                    if(data32[y*this.width+x]){ // 如果第y行第x个点数据不为0，即改点存在色值
                      posArr.push([x,y]) ;
                    }
                  }
                }

                let $vue = this ; // 在构造函数中使用vue实例
                function Point ([x,y]){ // 点的构造函数，需要传入坐标
                  this.r = Math.random()*$vue.point.maxR+$vue.point.minR ;
                  this.x = x ;
                  this.y = y ;
                  this.step = Math.random()>0.5?$vue.point.step:(-$vue.point.step) ; // 每个点根据设定的动画步长初始值，有自己的初始值，正负号随机
                  
                  this.color = $vue.point.colors[Math.floor(Math.random()*($vue.point.colors.length+2))];
                }
                
                let points = [] ;
                for(let i=0;i<posArr.length;i++){
                  let p = new Point(posArr[i]) ;
                  points.push(p) ;
                }
                // console.log('粒子的个数：',points.length)
                this.points = points; // 保存所有的粒子
                // this.showParticle() ; // 展示粒子
                
            },
            showParticle(){ // 动画展示例子
                this.draw() ;
                var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ;
                if(requestAnimationFrame){
                    if(this.timer){
                        window.cancelAnimationFrame(this.timer) ; // 先清除定时器
                    }
                    this.timer = requestAnimationFrame(()=>{
                        this.showParticle();
                    })
                }else{
                    if(this.timer){
                        clearTimeout(this.timer) ; // 先清除定时器
                    }
                    setTimeout(()=>{
                        this.showParticle();
                    },1000/60)
                }
            },
            draw(){
                // 清除画布
                this.ctx.clearRect(0,0,this.width,this.height);
                // 画圆点(新生成的粒子)：
                if(this.points&&this.points.length){
                    this.points.forEach(p=>{
                        this.ctx.beginPath() ;
                        this.ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
                        this.ctx.fillStyle = p.color ;
                        this.ctx.fill() ;
                        this.ctx.closePath();
                    })
                    // 绘制完成后，更新点的状态，使下次绘制时变更状态：
                    this.flicker() ;
                }
                // 画圆点（旧有的粒子）：
                if(this.oldPoints&&this.oldPoints.length){
                    this.oldPoints.forEach(p=>{
                        this.ctx.beginPath() ;
                        this.ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
                        this.ctx.fillStyle = p.color ;
                        this.ctx.fill() ;
                        this.ctx.closePath();
                    })
                    // 绘制完成后，更新点的状态，使下次绘制时变更状态：
                    this.flyAway() ;
                }
            },
            flicker(){ // 闪烁
                this.points.forEach(item=>{
                    item.r += item.step ;
                    if(item.r>=this.point.maxR||item.r<=this.point.minR){
                        if(item.r>this.point.maxR){
                            item.r = this.point.maxR ;
                        }
                        if(item.r<this.point.minR){
                            item.r = this.point.minR ;
                        }
                        item.step = - item.step ;// 超过限制，就反向；
                    }
                })
            },
            flyAway(){
                let speed = 4 ; // 运动飞散的速度 ；
                this.oldPoints.forEach((p,i)=>{
                    p.step = - Math.abs(p.step) ; //全部粒子都将step变为负，使之逐渐变小；
                    if(!p.speedX&&!p.speedY){ // 没有这两个速度的，就要生成这两个方向的速度
                        p.speedX = Math.random()>0.5? (- Math.random()*speed):Math.random()*speed ; 
                        // 根据速度和x方向的速度，计算y方向速度：
                        p.speedY = Math.sqrt(Math.pow(speed,2)-Math.pow(p.speedX,2)) ;
                        // 方向随机（正负号）：
                        p.speedY = Math.random()>0.5? - p.speedY : p.speedY ;
                    }
                    // 粒子基本状态改变：
                    p.x += p.speedX ;
                    p.y += p.speedY ;
                    p.r += p.step ;
                    // 临界值判断：
                    if(p.r<=this.point.minR){
                        // 半径小于一定值，直接让其消失：
                        p.r = 0 ;
                    }
                })
                for(let i=0;i<this.oldPoints.length;i++){
                    if(this.oldPoints[i].r===0){
                        this.oldPoints.splice(i--,1) ;
                    }
                }
            }
        },
        mounted(){
            this.init() ;
            if(!this.ctx) return ;
            this.changeShow();
        },
        beforeDestroy(){
            if(this.timer){ // 组建销毁前，如果有timer，则清除它
                var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ;
                if(requestAnimationFrame){
                    window.cancelAnimationFrame(this.timer) ; // 先清除定时器
                    this.timer = null ;
                }else{
                    clearTimeout(this.timer) ; // 先清除定时器
                    this.timer = null ;
                }
            }
        }
    }
</script>