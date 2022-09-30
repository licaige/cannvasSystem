<!-- particleSea.vue -->
<template>
    <div class="container">
        <canvas ref='com-canvas'></canvas>
    </div>
</template>
<style scoped>
    
</style>
<script>
import utils from '@/utils/utils.js'
    export default {
        data(){
            return {
                canvas:null, // canvas元素
                width:800, // canvas宽度
                height:600, // canvas高度
                ctx:null , // canvas的绘制上下文
                background:'#333', // canvas的背景色
                focusDistans:800 , // 焦点距离（透视关系中的灭点）
                particle:{ // 粒子配置
                    color:'#ff0000', // 颜色
                    r:3, // 半径
                    dis:30, // 粒子间的间隔
                    angDis:6,  // 角度差
                    minAlpha:0.4, // 最小的alpha值(在灭点处，即z=focusDistans处的alpha值),而z=0处，alpha值为1；
                    u:80 , // 波幅
                },
                list:[], // 粒子数据列表
                timer:null,
            }
        },
        methods:{
            init(){ // 初始化canvas状态
                this.canvas = this.$refs['com-canvas'] ;
                this.canvas.width = this.width ;
                this.canvas.height = this.height ;
                this.canvas.style.background = this.background ;
                if(this.canvas.getContext){
                    this.ctx = this.canvas.getContext('2d') ;
                }else{
                    this.$message('您的浏览器不支持canvas绘画环境');
                }
            },
            madeParticle(){
                function Particle (x,y,z,angle,$vue){ // angle是偏移角度，控制y方向的偏移（波浪的起伏，三角函数），因此y值与angle其实是对应的关系，angle即可计算得到y; u表示波幅
                    this.x = x ;
                    this.y = y ;
                    this.z = z ;
                    // 根据z计算r大小：
                    // r/this.particle.r = (this.focusDistans-this.z)/this.focusDistans ;
                    this.r = ($vue.focusDistans-z)/$vue.focusDistans * $vue.particle.r ;
                    // 根据z计算透明度alpha值，在灭点处即z = this.focusDistans 处，alpha值为this.particle.minAlpha
                    this.alpha = (1-$vue.particle.minAlpha)*($vue.focusDistans - z)/$vue.focusDistans + $vue.particle.minAlpha;
                    this.color = $vue.particle.color ; // 颜色
                    this.angle = angle ; // 偏移角度
                    // 根据z值计算波幅，z越大，离视线越远，波幅就显得越小，灭点处波幅接近于0 （按0计算）
                    this.u = $vue.particle.u*($vue.focusDistans-z)/$vue.focusDistans ;
                }

                // 循环z方向，从0开始，每隔particle.dis距离，就有一行粒子
                let rowCount = Math.floor(this.focusDistans / this.particle.dis) ; // 总行数
                for(let i=-15;i<rowCount;i++){ // i的起始值为-15，即z轴为负的地方仍有粒子（相当于突出于纸面之上，正常看不见，波动时可能会上升至可视区内）
                    let z = i*this.particle.dis ; 
                    // 根据z 值，计算每行的总宽度
                    let width = this.width*3*(this.focusDistans-z)/this.focusDistans ; // 假设每行粒子的总宽度为canvas的宽度的3倍，即canvas可视区外仍有粒子
                    // 根据z值，计算该行，x的间隔（近大远小关系，越远，z越大，则点与点之间的间隔也越小）
                    let xDis = (this.focusDistans-z)*this.particle.dis/this.focusDistans ;
                    // 每行的第一个点的x坐标
                    let x0 = (this.width - width)/2 ;

                    // 假设灭点位置是canvas中心，即（width/2,height/2）处；则y值随着z的变化以及所在的行数进行偏移变化（纵向拍平）
                    let y = xDis*this.height/2 / this.particle.dis  + this.height/2

                    let colCount = Math.floor(this.width*3/this.particle.dis); // 列数，即每行有多少个点
                    for(let j=0;j<=colCount;j++){
                        let x = x0 + j*xDis ;
                        let angle = (i*this.particle.angDis + j*this.particle.angDis)%360 ;  // 角度值
                        angle = angle*Math.PI/180 ; // 角度转为弧度值
                        let point = new Particle(x,y,z,angle,this) ;
                        this.list.push(point) ;
                    }
                }
            },
            drawPoint(){ // 绘制所有的点
                this.ctx.clearRect(0,0,this.width,this.height) ; 
                // 绘制背景
                this.ctx.fillStyle = this.background ;
                this.ctx.fillRect(0,0,this.width,this.height) ;
                // 绘制粒子
                for(let i=0;i<this.list.length;i++){
                    let item = this.list[i] ;
                    this.ctx.beginPath() ;
                    this.ctx.arc(item.x,item.y+Math.sin(item.angle)*item.u,item.r,0,Math.PI*2) ;
                    this.ctx.closePath() ;
                    this.ctx.fillStyle = utils.updateAlpha(item.color,item.alpha) ;
                    this.ctx.fill() ;
                    // 更新该点的数据，为下次绘制做准备
                    item.angle += this.particle.angDis*Math.PI/180 ;
                }
            },

            
        },
        mounted(){
            this.init() ;
            this.madeParticle() ;
            setInterval(this.drawPoint,1000/20) ;
            
        },
        beforeDestroy(){
            clearInterval(this.timer)
        }
    }
</script>