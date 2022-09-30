<!-- CanvasWaveShow.vue - canvas展示波形 -->
<template>
    <div class="com-root" ref='com-root'>
        <canvas class='grid-canvas' ref='grid-canvas'></canvas>
        <canvas class='wave-canvas' ref='wave-canvas'></canvas>
    </div>
</template>
<style scoped>
    .com-root{
        width: 100%;
        height: 150px;
        background: green;
        position: relative;
    }
    .grid-canvas,.wave-canvas{
        position: absolute;
        left: 0;
        top:0;
    }
</style>
<script>
    import utils from '@/components/js/utils.js' ;
    export default {
        props:{
            data:{},
            waveNames:{
                type:Array,
                required:true
            },
            options:{},
        },
        computed:{
            // wave(){
            //     if(this.data){
            //         // 对数据进行处理，将波幅数据加入x坐标，形成x,y的坐标点。
            //         // y最高点为300，
            //         return this.data.data.map((item,index)=>({x:index,y:-item/2}))
            //     }else{
            //         return [] ;
            //     }
            // }
        },
        data(){
            return {
                // 内部可配置项
                nameWidth:50, // 波形名称占的宽度（波形左边的名称，如V1，V2等，占据的宽度值）
                count:3 , // 每条显示的波数
                lineWidth:2, // 波形的线宽
                // **********************************
                // 内部使用数据，不可修改
                loading:true, // 数据加载中的标记
                L:250, // 波长，每个波占的x轴长度
                H:150, // 波幅，高度，一条波在canvas上占的高度
                x:0, // 初始x坐标。表示波形绘制到的位置，不断递增（达到上限就归0），以此控制波形绘制到什么位置
                canvas:null,
                width:0,  // canvas宽度
                height:150, // canvas高度
                ctx:null,  // 波的绘制环境
                gridCtx:null, // 栅格的绘制环境
                waves:[], // 保存数据的地方,数据池，
                drawWaves:{}, // 当前绘制展示的波形数据，最多保存count个波长
                timer:null , // 定时器
            }
        },
        watch:{
            data:{
                handler(newVal,oldVal){
                    // 保存数据到数据池中
                    this.waves.push(newVal) ;
                    // 同时拿出来处理成绘制数据：
                    let wave = newVal ;
                    this.waveNames.forEach(name=>{
                        this.drawWaves[name].push(...wave[name]); // 根据需要展示的波形名称，将对应波的数据初始化为空数组
                    })

                    // 判断启动条件：
                    if(this.loading&&this.waves.length>=3){
                        this.loading = false ; // 启动
                    }
                    if(!this.loading){
                        // 如果已经启动，每次（1秒周期）删去一个最旧的数据，使数据池维持一定长度，不溢出
                        this.waves.shift() ; 
                    }
                }
            }
        },
        methods:{
            init(){ // 初始化选项和canvas环境 ；
                this.canvas = this.$refs['wave-canvas'] ;
                this.gridCanvas = this.$refs['grid-canvas'] ;
                this.canvas.width = this.gridCanvas.width = this.width = this.count*this.L + this.nameWidth ;
                this.canvas.height = this.gridCanvas.height = this.height = this.H*this.waveNames.length;
                this.$refs['com-root'].style.width = this.width + 'px' ;
                this.$refs['com-root'].style.height = this.height + 'px' ;
                this.gridCanvas.style.background = this.options.backgroundColor?this.options.backgroundColor:'#fff' ;
                // 初始化初始数据格式：
                this.waveNames.forEach(name=>{
                    this.drawWaves[name] = [] ; // 根据需要展示的波形名称，将对应波的数据初始化为空数组
                })
                if(this.canvas.getContext){
                    this.ctx = this.canvas.getContext('2d') ;
                    this.gridCtx = this.gridCanvas.getContext('2d') ;
                    this.drawGrid();
                }else{
                    this.$message({message:'您的浏览器不支持canvas，请安装最新"谷歌浏览器"浏览本页面',type:'error'});
                    return false ;
                } 
            },
            drawGrid(){ // 绘制网格
                this.gridCtx.save() ;
                this.lineCap = 'round' ;
                // 粗线；
                this.gridCtx.lineWidth = 2 ;
                let color = this.options.gridColor?this.options.gridColor:'#fff' ;
                this.gridCtx.strokeStyle = utils.updateAlpha(color,0.1) ;
                this.gridCtx.beginPath() ;
                for(let i=0;i<this.height;i+=25) { // 横线
                    this.gridCtx.moveTo(0,i);
                    this.gridCtx.lineTo(this.width,i);
                }
                for(let i=0;i<this.width;i+=25) { // 竖线
                    this.gridCtx.moveTo(i,0);
                    this.gridCtx.lineTo(i,this.height);
                }
                this.gridCtx.closePath() ;
                this.gridCtx.stroke() ;
                this.gridCtx.restore() ;

                // 细线：
                this.gridCtx.save() ;
                this.lineCap = 'round' ;
                this.gridCtx.strokeStyle = utils.updateAlpha(color,0.1) ;
                this.gridCtx.lineWidth = 1 ;
                this.gridCtx.beginPath() ;
                for(let i=5.5;i<this.height;i+=5) {
                    this.gridCtx.moveTo(0,i);
                    this.gridCtx.lineTo(this.width,i);
                }
                for(let i=5.5;i<this.width;i+=5) {
                    this.gridCtx.moveTo(i,0);
                    this.gridCtx.lineTo(i,this.height);
                }
                this.gridCtx.closePath() ;
                this.gridCtx.stroke() ;
                this.gridCtx.restore() ;

                // 绘制波形的名字：
                let names = this.waveNames ;
                this.gridCtx.save() ;
                this.gridCtx.fillStyle = utils.updateAlpha(color,1) ;
                this.gridCtx.textAlign = 'center' ; // 文字水平居中
                this.gridCtx.textBaseline='middle'; // 文字基线居中（垂直居中）
                this.gridCtx.font = "italic 16px sans-serif" ;
                names.forEach((name,index)=>{
                    this.gridCtx.fillText(name,this.nameWidth/2, index*this.H+this.H/2 ) ;
                })
            },
            drawWave(){
                if(this.loading){
                    return ;
                }
                this.lineCap = 'round' ;
                this.ctx.lineWidth = this.lineWidth ;
                let weveColor = this.options.waveColor || '#F56C6C' ;
                this.ctx.strokeStyle = utils.updateAlpha(weveColor,1) ;// 波形（折线）的颜色
                this.ctx.save() ;
                this.ctx.translate(this.nameWidth+0.5,0.5); // 偏移, 修正nameWidth的位置，0.5的偏移是解决canvas绘制细线的模糊
                // 先清除之前绘制的：
                this.ctx.clearRect(0,0,this.x+20,this.height) ;
                this.x += 4 ; // 每次多绘制4个点
                // 由于每次多绘制4个点，而每个波有250个点，因此无法刚好1秒绘制完250个点，需要修正：
                // 修正：每6帧多绘制一个点，即60帧刚好可以多绘制10个点，与正常递增的4个点60帧(60*4=240)相加，正好250个点。
                // 初始0 再加6帧 => 变成24 
                // 24 补1 => 25 =>再加6帧即24个点变成 49   
                // 49 补1 => 50 =>再加6帧即24个点变成 74    
                // 74 补1 => 75 =>再加6帧即24个点变成 99    
                // 99 补1 => 100 =>再加6帧即24个点变成 124
                // ...     
                // 可见，每次模25，余数是24时，就要补1 ;
                if(this.x%25==24){
                    this.x += 1 ;
                }
                
                this.waveNames.forEach((name,index)=>{
                    this.ctx.beginPath() ;
                    for(let i=0;i<this.x+1;i++){
                        // index+1.35是修正每条波的位置，使波的中心正好对应波名
                        if(i==0){
                            this.ctx.moveTo(0,(index+1.35)*this.H-this.drawWaves[name][0]);
                        }else{
                            this.ctx.lineTo(i,(index+1.35)*this.H-this.drawWaves[name][i]);
                        }
                    }
                    this.ctx.stroke() ;
                })

                this.ctx.restore() ;
                if(this.x>=this.L*this.count){
                    // 绘制达到了上限（最右边），则回归到x=0的位置重新绘制，且前面一组数据删掉
                    this.x = 0 ;
                    for(let name in this.drawWaves){
                        this.drawWaves[name].splice(0,this.L*this.count) ;
                    }
                }
            },
            waveMove(){
                this.drawWave();
                var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ;
                if(requestAnimationFrame){
                    this.timer = requestAnimationFrame(()=>{
                        this.waveMove();
                    })
                }else{
                    this.timer = setTimeout(()=>{
                        this.waveMove();
                    },1000/60)
                }
            }
        },
        mounted(){
            this.init();
            if(this.ctx){
                this.waveMove() ;
            }
        },
        beforeDestroy(){
            if(this.timer){
                var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ;
                if(requestAnimationFrame){
                    cancelAnimationFrame(this.timer) ;
                }else{
                    clearTimeout(this.timer) ;
                }
                this.timer = null ;
            }
        }
    }
</script>