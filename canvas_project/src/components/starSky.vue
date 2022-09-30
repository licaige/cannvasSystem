<!-- starSky.vue 星空 -->
<template>
    <div class="container">
        <div class="wrap">
            <canvas ref='star-sky-canvas'></canvas>
            <img class='front-img' :src="BG1" alt="">
            <div class="operate-floor" @mousemove='mousemoveHandler'><!-- 操作层，用来监听鼠标事件 --></div>
        </div>
    </div>
</template>
<style scoped>
    .wrap{
        position: relative;
    }
    .wrap canvas{
        background: transparent;
    }
    .operate-floor{
        /* 和canvas宽高一样 */
        width: 800px;
        height: 600px;
        position: absolute;
        top: 50%;
        left: 50%;
        background: transparent;
        -webkit-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        transform:translate(-50%,-50%);
        z-index:999;
    }
    .front-img{
        display: block;
        border:none;
        outline: none;
        width: 800px;
        height: auto;
        position: absolute;
        bottom: 0;
        left: 50%;
        -webkit-transform:translate(-50%,0);
        -moz-transform:translate(-50%,0);
        -ms-transform:translate(-50%,0);
        -o-transform:translate(-50%,0);
        transform:translate(-50%,0);
        z-index: 333;
    }
</style>
<script>
    import utils from '@/utils/utils.js' ;
    import BG1 from '@/assets/bg1.png' ;
    export default {
        props:{
            animateType:{ // 动画形式，取值为：'up':星星向上升;'down':星星下降;'left':星星左移;'right':星星右移;'round1':转圈(顺时针);'round2':转圈(逆时针);'in':飞入；'out':飞出
                type:String,
                default:'round1'
            }
        },
        data(){
            return {
                BG1:BG1,
                canvas:null, // canvas元素
                background:'transparent',
                width:800, // canvas宽度
                height:600, // canvas高度
                ctx:null , // canvas的绘制上下文
                bg:{
                    type:2, // 1 纯色， 2 渐变
                    color:'#ff00ff',
                    colorAnimate:true , // 颜色变化动画是否开启
                },
                light:{ // 薄雾，光线，
                    baseY:0 , // 中心y坐标基准值
                    alpha:0.1, // 不透明度基准值
                    speed:2 ,// 移动速度基准值
                    color:'#fff' , // 颜色
                    scaleY:2, 
                    count:20, // 数量
                    minR:10 , // 最小宽度基准值，
                    maxR:50 , // 最大宽度基准值
                    list:[], // 保存了所有的极光数据对象的数组
                }, 
                bgStar:{ // 背景的星星
                    count:500, // 数量(动画类型为飞入时，即animateType参数为'in'，由于屏幕外也需要有星星来进行飞入，所以生成星星数量时，可视区作为九宫格其中的一屏，而周围还有8屏需要随机生成星星，因此该值会被*9，再生成星星，因此实际星星数量是该值的9倍；而其他动画类型，则不需要，该值即为实际星星数量)
                    baseR:20 , // 半径基准值，波动幅度 +- 0.2倍
                    color:'#fff' , // 颜色
                    speed:0.2, // 移动速度
                    list:[], // 保存所有背景星星的列表
                },
                mousePoint:{ // 鼠标移动是产生的粒子配置
                    distance:100 , // 产生的粒子和鼠标之间的距离限制
                    r:8, // 产生的粒子的半径限制
                    count:2 , // 每次产生的数量
                    // color:'#fff',  // 这些粒子的颜色，这里注释掉，生成粒子使，取背景色并提亮，作为粒子颜色，详见生成鼠标粒子的方法
                    speed:0.5 , // 移动的速度
                    alphaSpeed:0.01, // 透明度的速度 
                    list:[], // 粒子数据
                },
                animationFrame:null,
                timer:null ,
                flicker:30 , // 闪烁基数，
                flick:0 , // 闪烁初始值，

                oDate:null , // 函数节流的date对象
            }
        },
        methods:{
            init(){ // 初始化canvas状态
                this.canvas = this.$refs['star-sky-canvas'] ;
                this.canvas.width = this.width ;
                this.canvas.height = this.height ;
                this.canvas.style.background = this.background ;
                
                if(this.canvas.getContext){
                    this.ctx = this.canvas.getContext('2d') ;
                    // 极光的中心Y坐标初始化：
                    this.light.baseY = this.height ;
                }else{
                    this.$message('您的浏览器不支持canvas绘画环境');
                }
            },
            madeLight(){ // 极光
                let $vue = this ; 
                function Light(){
                    let x = Math.random()*$vue.width ; 
                    let y = $vue.light.baseY ;
                    let color = utils.HexColorToRGB($vue.light.color,$vue.light.alpha) ;
                    let r = Math.floor(Math.random()*($vue.light.maxR - $vue.light.minR + 1 ) + $vue.light.minR) ; // 最小宽度基准值 至 最大宽度基准值 之间的随机整数 ;
                    let speed = Math.random()>0.5?-1*$vue.light.speed:1*$vue.light.speed ; 

                    return {
                        x,y,color,r,speed 
                    }
                }
                for(let i=0;i<this.light.count;i++){
                    this.light.list.push(new Light())
                }
            },
            madebackgroundStar(xpos,ypos){ // 背景的星星
                let $vue = this ;
                function BgStar(xpos,ypos){
                    let r = Math.random()*$vue.bgStar.baseR + $vue.bgStar.baseR*0.2 ; 
                    let x , y ; 
                    if($vue.animateType!='in'){ // 不是in类型的动画，则在可视区随机生成坐标
                        x = xpos||Math.random()*$vue.width ; // 如果传入了坐标x,y的值，使用x,y指定坐标，否则随机生成
                        y = ypos||Math.random()*$vue.height ; // 如果传入了坐标x,y的值，使用x,y指定坐标，否则随机生成
                    }else{ // 如果是in类型的动画，则要在可视区外，也生成坐标，使动画往里飞时，有星星从外往里飞（即可视区外也要有星星，否则会有断层）
                        // 因为可视区外也要有星星，所以初始坐标x值为 -$vue.width 到 2*($vue.width)之间
                        // 因为可视区外也要有星星，所以初始坐标y值为 -$vue.height 到 2*($vue.height)之间
                        x = xpos||Math.floor(Math.random()*(3*$vue.width+1)-$vue.width) ;
                        y = ypos||Math.floor(Math.random()*(3*$vue.height+1)-$vue.height) ;
                    }
                    
                    let color = utils.HexColorToRGB($vue.bgStar.color) ;
                    let speed = ( r * $vue.bgStar.speed ) / $vue.bgStar.baseR ; 
                    let alpha = Math.random();
                    let orbitRadius = Math.abs(Math.sqrt(Math.pow(x-$vue.width/2,2)+Math.pow(y-$vue.height/2,2))) ; // 该星星的轨道半径
                    // 轨道圆心位于 this.width/2 ,this.height/2  - 即canvas中心   ;
                    
                    if(/^(round)|(in)|(out)/.test($vue.animateType)){ 
                        // 如果是round动画，则根据轨道半径，轨道半径越小，星星本身的半径也越小，修正星星半径：
                        r = r * orbitRadius / Math.abs(Math.sqrt(Math.pow($vue.width/2,2)+Math.pow($vue.height/2,2))) ;
                    }
                    if(/^(in)|(out)/.test($vue.animateType)){
                        // 如果是飞入飞出动画，越往中心点，速度越慢，修正星星速度：
                        speed = speed * orbitRadius / Math.abs(Math.sqrt(Math.pow($vue.width/2,2)+Math.pow($vue.height/2,2))) ;
                    }
                    return {
                        x,y,color,r,speed,alpha,orbitRadius
                    }
                }

                if(xpos&&ypos){ // 如果传入了x，y坐标，则在该坐标生成1个星星
                    this.bgStar.list.push(new BgStar(xpos,ypos))
                }else{ // 否则，可能需要循环生成配置的多个数量的星星
                    for(let i=0;i<this.bgStar.count;i++){
                        this.bgStar.list.push(new BgStar())
                    }
                }
            },
            draw(){
                this.ctx.clearRect(0,0,this.width,this.height) ;
                this.drawBg() ; // 绘制背景（色）
                this.drawLight() ; // 绘制薄雾
                this.drawBgStar() ; // 绘制星星背景
                // this.drawFront(); // 绘制前景
                this.drawMousePoint() ;
            },
            drawLight(){
                this.ctx.save() ;
                this.ctx.scale(1,this.light.scaleY);
                for(let i=0;i<this.light.list.length;i++){
                    let item = this.light.list[i];
                    this.ctx.beginPath() ;
                    this.ctx.rect(item.x-item.r*3,item.y/this.light.scaleY-item.r*3,item.r*6,item.r*6)
                    this.ctx.closePath() ;

                    let fill = this.ctx.createRadialGradient(item.x,item.y/this.light.scaleY,item.r/2,item.x,item.y/this.light.scaleY,item.r*3) ;

                    fill.addColorStop(0,item.color);
                    fill.addColorStop(1,utils.updateAlpha(item.color,0));
                    this.ctx.fillStyle = fill ;
                    this.ctx.fill() ;
                }
                this.ctx.restore();

                // 更新x坐标，使移动：
                this.updateLight();
            },
            drawBgStar(){
                this.ctx.save() ;
                this.ctx.globalCompositeOperation = 'lighter';
                for(let i=0;i<this.bgStar.list.length;i++){
                    let item = this.bgStar.list[i];

                    this.ctx.beginPath() ;
                    this.ctx.arc(item.x,item.y,item.r,0,2*Math.PI);
                    this.ctx.closePath() ;
                    let fill = this.ctx.createRadialGradient(item.x,item.y,item.r/10,item.x,item.y,item.r/1.1) ;
                    
                    fill.addColorStop(0,utils.updateAlpha(item.color,item.alpha));
                    fill.addColorStop(0.1,utils.updateAlpha(item.color,item.alpha/3));
                    fill.addColorStop(0.35,utils.updateAlpha(item.color,item.alpha/7));
                    fill.addColorStop(0.6,utils.updateAlpha(item.color,'0'));
                    fill.addColorStop(1,'transparent');
                    this.ctx.fillStyle = fill ;
                    this.ctx.fill() ;
                }
                this.ctx.restore();

                // 更新y坐标，使移动：
                this.updateBgStar();
            },
            drawBg(){ // 绘制背景色
                this.ctx.save() ;
                if(this.bg.type==2){
                    // 渐变：
                    let fill = this.ctx.createLinearGradient(0,this.height,0,0);
                    if(this.bg.colorAnimate){
                        // 启动了颜色渐变变化；
                        this.bg.color = utils.colorChange(this.bg.color,1) ; // 按照规则改变颜色rgb，实现颜色渐变
                    }
                    
                    fill.addColorStop(0,utils.updateAlpha(this.bg.color,0.5)) ;
                    fill.addColorStop(1,utils.updateAlpha(this.bg.color,1)) ;
                    this.ctx.fillStyle = fill ;
                    this.ctx.fillRect(0,0,this.width,this.height) ;
                    if(this.bg.colorAnimate){ 
                        // 如果启动了颜色渐变，还需要再铺一层黑色，否则不需要，直接由bg.color控制明暗即可
                        // 再在上面铺一层半透的黑，使颜色变暗:
                        let fillDark = this.ctx.createLinearGradient(0,this.height,0,0);
                        let darkColor = '#000' ; 
                        fillDark.addColorStop(0,utils.updateAlpha(darkColor,0.2)) ;
                        fillDark.addColorStop(1,utils.updateAlpha(darkColor,0.8)) ;
                        this.ctx.fillStyle = fillDark ;
                        this.ctx.fillRect(0,0,this.width,this.height) ;
                    }
                    
                }else{
                    // 纯色 :
                    this.ctx.fillStyle = utils.updateAlpha(this.bg.color,0.9) ;
                    this.ctx.fillRect(0,0,this.width,this.height) ;
                }
                
                this.ctx.restore() ;
            },
            drawFront(){
                let img = document.createElement('IMG') ;
                img.src = BG1 ;
                let $vue = this ;
                img.onload = function (){
                    $vue.ctx.drawImage(img,0,0,$vue.width,200)
                }
            },
            drawMousePoint(){ // 绘制鼠标交互产生的粒子
                let list = this.mousePoint.list ; 
                console.log(list)
                list.forEach(item=>{
                    this.ctx.beginPath() ;
                    this.ctx.arc(item.x,item.y,item.r,0,2*Math.PI);
                    this.ctx.closePath() ;
                    let fill = this.ctx.createRadialGradient(item.x,item.y,item.r/5,item.x,item.y,item.r) ;
                    
                    fill.addColorStop(0,utils.updateAlpha(item.color,item.alpha));
                    fill.addColorStop(0.2,utils.updateAlpha(item.color,item.alpha/2));
                    fill.addColorStop(0.5,utils.updateAlpha(item.color,item.alpha/5));
                    fill.addColorStop(0.9,utils.updateAlpha(item.color,'0.01'));
                    fill.addColorStop(1,'transparent');
                    // this.ctx.fillStyle = utils.updateAlpha(item.color,item.alpha) ; // 将配置的颜色和alpha值合并，转变为rgba颜色值，设置该点的填充色
                    this.ctx.fillStyle = fill ;
                    this.ctx.fill() ;
                })
                this.ctx.restore();


                // 更新y坐标，使移动：
                this.updateMousePoint();
            },
            updateLight(){
                this.light.list.forEach((item,i)=>{
                    item.x = parseInt(item.x + item.speed);
                    if(item.x<0-item.r*2||item.x>this.width+item.r*2){
                        item.speed = - item.speed ;
                    }
                })
            },
            updateBgStar(){
                this.bgStar.list.forEach((item,i)=>{
                    if(this.animateType=='up'){
                        item.y -= item.speed ;
                        if(item.y<0-item.r){
                            // 星星跑到最上面的canvas可视区之外了。重置他的xy，使他回到最下边的可视区外，且x位置也重新随机
                            item.x = Math.random()*this.width ; 
                            item.y = this.height + item.r ; 
                        }
                    }
                    if(this.animateType=='down'){
                        item.y += item.speed ;
                        if(item.y>this.width+item.r){
                            // 星星跑到最下面的canvas可视区之外了。重置他的xy，使他回到最上边的可视区外，且x位置也重新随机
                            item.x = Math.random()*this.width ; 
                            item.y = - this.height - item.r ; 
                        }
                    }
                    if(this.animateType=='left'){
                        item.x -= item.speed ;
                        if(item.x<(-item.r)){
                            // 星星跑到最左面的canvas可视区之外了。重置他的xy，使他回到最右边的可视区外，且y位置也重新随机
                            item.x = this.width + item.r ; 
                            item.y = Math.random()*this.height ; 
                        }
                    }
                    if(this.animateType=='right'){
                        item.x += item.speed ;
                        if(item.x> this.width + item.r){
                            // 星星跑到最右面的canvas可视区之外了。重置他的xy，使他回到最左边的可视区外，且y位置也重新随机
                            item.x = - item.r ; 
                            item.y = Math.random()*this.height ; 
                        }
                    }
                    if(this.animateType=='round1'){ // 顺时针旋转
                        // 转动的角度a
                        let a = (item.speed/3/180)*Math.PI ;
                        // 当前的角度
                        let curA = Math.atan2(item.y-this.height/2 , item.x-this.width/2) ;

                        item.x = item.orbitRadius*Math.cos(curA+a)+ this.width/2 ;
                        item.y = item.orbitRadius*Math.sin(curA+a)+ this.height/2;
                    }
                    if(this.animateType=='round2'){ // 逆时针旋转
                        // 转动的角度a
                        let a = (item.speed/3/180)*Math.PI ;
                        // 当前的角度
                        let curA = Math.atan2(item.y-this.height/2 , item.x-this.width/2) ;

                        item.x = item.orbitRadius*Math.cos(curA-a)+ this.width/2 ;
                        item.y = item.orbitRadius*Math.sin(curA-a)+ this.height/2;
                    }
                    if(this.animateType=='in'){ // 飞入
                        // r = r * orbitRadius / Math.abs(Math.sqrt(Math.pow($vue.width/2,2)+Math.pow($vue.height/2,2))) ;
                        // 飞入，则轨道半径越来越小
                        let orbit = item.orbitRadius; // 原轨道半径
                        item.orbitRadius = item.orbitRadius - item.speed*10; // 新轨道半径（变小了一点点）
                        // 将x，y转变成相对canvas中心点为原点的坐标：
                        item.x -= this.width/2 ;
                        item.y -= this.height/2 ;
                        item.x = item.x * item.orbitRadius / orbit ;
                        item.y = item.y * item.orbitRadius / orbit ;
                        item.r = item.r * item.orbitRadius / orbit ;
                        item.speed = item.speed * item.orbitRadius / orbit ;
                        if(item.r<=1.6){ 
                            // 星星半径小于一定值，视为消失，此时移除该星星，同时在同象限的可视区外，生成一个新的星星点（实际也可以不分象限，直接在可视区外随机生成星星点）
                            this.bgStar.list.splice(i,1);

                            // 生成一个随机数
                            let randomNum = Math.random() ;

                            // 如果新的点在屏幕上面
                            let yTop = Math.random()*this.height - this.height ; let xTop = Math.random()*(2*this.width)-this.width/2 ;

                            // 如果新的点在屏幕左边
                            let xLeft = Math.random()*this.width - this.width ; let yLeft = Math.random()*(2*this.height)-this.height/2 ;

                            // 如果新的点在屏幕下面
                            let yBottom = Math.random()*this.height + this.height ; let xBottom = Math.random()*(2*this.width)-this.width/2 ;

                            // 如果新的点在屏幕右边
                            let xRight = Math.random()*this.width + this.width ; let yRight = Math.random()*(2*this.height)-this.height/2 ;

                            // 根据随机数，取这四种情况中的一种
                            if(randomNum<=0.25){
                                this.madebackgroundStar(xTop,yTop)
                            }else if(randomNum<=0.5){
                                this.madebackgroundStar(xLeft,yLeft)
                            }else if(randomNum<=0.75){
                                this.madebackgroundStar(xBottom,yBottom)
                            }else {
                                this.madebackgroundStar(xRight,yRight)
                            }
                        }else{
                            // 如果点没有被删除，则仍然有效，
                            // 再将x,y转变回canvas坐标（原点是canvas的左上角）准备下一次绘制
                            item.x += this.width/2 ;
                            item.y += this.height/2 ;
                        }
                    }
                    if(this.animateType=='out'){ // 飞出
                        // r = r * orbitRadius / Math.abs(Math.sqrt(Math.pow($vue.width/2,2)+Math.pow($vue.height/2,2))) ;
                        // 飞入，则轨道半径越来越小
                        let orbit = item.orbitRadius; // 原轨道半径
                        item.orbitRadius = item.orbitRadius + item.speed*10; // 新轨道半径（变大了一点点）
                        // 将x，y转变成相对canvas中心点为原点的坐标：
                        item.x -= this.width/2 ;
                        item.y -= this.height/2 ;
                        item.x = item.x * item.orbitRadius / orbit ;
                        item.y = item.y * item.orbitRadius / orbit ;
                        item.r = item.r * item.orbitRadius / orbit ;
                        item.speed = item.speed * item.orbitRadius / orbit ;

                        // 得到的坐标换回canvas坐标系（左上角为原点）
                        item.x += this.width/2 ;
                        item.y += this.height/2 ;

                        // 判断飞出屏幕外
                        if(item.x<-item.r || item.x>(this.width+item.r) || item.y<-item.r || item.y>(this.height+item.r)){
                            // 删除该点
                            this.bgStar.list.splice(i,1);

                            // 在中心处随机坐标生成星星点
                            // 中心方圆50像素以内的区域随机坐标
                            let x = Math.random()*(100)-50 ;
                            let y = Math.random()*(100)-50 ;
                            // 修正坐标系（canvas的原点在左上角，而坐标系的原点在正中间），现将正中间的点坐标修正为canvas的坐标
                            x += this.width/2 ;
                            y += this.height/2 ;

                            // 生成点
                            this.madebackgroundStar(x,y) ;
                        }
                    }
                    // 闪烁：
                    this.flick+=1 ; 
                    if(this.flick == this.flicker){ // 达到闪烁值，进行alpha值的更改，
                        let random = Math.random() ;
                        if(random>0.5){
                            item.alpha = item.alpha*1.7 ;
                            if(item.alpha>0.8){
                                item.alpha = 0.9 ;
                            }
                        }else{
                            item.alpha = item.alpha/1.7 ;
                            if(item.alpha<0.2){
                                item.alpha = 0.4
                            }
                        }
                        // 更新一个随机的闪烁值，使闪烁的星随机
                        this.flicker = Math.floor(Math.random()*(20-10+1)+10) ; // 5到10之间的随机值
                        this.flick = 0 ;
                    }
                })
            },
            move(){
                this.draw();
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
            },
            mousemoveHandler(e){
                let now = new Date() ;
                if(this.oDate){
                    if(now-this.oDate<=20){ 
                        return false ; 
                    }
                }
                this.oDate = now ;
                let ev = e || window.event ;
                // console.log(e) ;
                // console.log(ev.offsetX)
                // console.log(ev.offsetY)
                // 在鼠标坐标的方圆50px的圆形区域内随机生成点：
                this.madeMousePoints(ev.offsetX,ev.offsetY) ;
            },
            madeMousePoints(x,y){
                for(let i=0;i<this.mousePoint.count;i++){
                    let p = {} // 生成的点对象
                    let distance = Math.floor(Math.random()*(this.mousePoint.distance+1)) ; // 0到50的随机数；距离鼠标的中心
                    let x1 = Math.floor(Math.random()*(distance+1)) ;  // 根据距离，随机0到distance的作为x方向的距离；
                    let y1 = Math.sqrt(Math.pow(distance,2)-Math.pow(x1,2)) ;
                    // x1 和 y1 随机正负号:
                    x1 = Math.random()>0.5? x1 : -x1 ;
                    y1 = Math.random()>0.5? y1 : -y1 ;
                    p.x = x+x1 ;
                    p.y = y+y1 ; 
                    p.r = Math.floor(Math.random()*(this.mousePoint.r-2)+2) ;
                    p.color = utils.colorBright(this.bg.color,0.8) ; // 将背景色作为点的颜色，并提亮80%
                    // 速度，设置为配置速度的一半，到配置速度之间的随机值
                    let configSpeed = this.mousePoint.speed ; 
                    let speed = Math.random()*(configSpeed-configSpeed/2)+configSpeed/2 ; // 速度基准值
                    let speedX = Math.random()*speed ; // x方向的速度
                    let speedY = Math.sqrt(Math.pow(speed,2)-Math.pow(speedX,2)) ;
                    // 正负值随机：
                    if(Math.random()>0.5){
                        speedX = -speedX ;
                    }
                    if(Math.random()>0.5){
                        speedY = -speedY ;
                    }
                    p.speedX = speedX ;
                    p.speedY = speedY ;
                    // alpha值，初始都为1 
                    p.alpha = 1 ; 
                    p.alphaSpeed = this.mousePoint.alphaSpeed ;
                    // 方向，以-PI 到 PI 之间的随机数作为弧度值，表示运动方向
                    p.direction = Math.random()*Math.PI*2-Math.PI ; 

                    this.mousePoint.list.push(p) // 将点存入数组
                }
            },
            updateMousePoint(){
                let list = this.mousePoint.list ;
                for(let i=0;i<list.length;i++){
                    let item = list[i] ;
                    // 透明度改变
                    item.alpha -= item.alphaSpeed; 
                    if(item.alpha<=0){
                        // 该点已经完全透明，不可见，直接删除回收
                        list.splice(i--,1) ;
                    }
                    // 坐标改变
                    item.x += item.speedX ;
                    item.y += item.speedY ;
                }
            } 
        },
        mounted(){
            // alert('432')
            this.init() ;
            if(!this.ctx) return ;
            this.madeLight() ;// 创建极光
            if(this.animateType=='in'){
                this.bgStar.count = this.bgStar.count*9 ;
            }
            this.madebackgroundStar() ; // 创建背景星星

            this.move();
        },
        beforeDestroy(){
            // 组件销毁时，清除定时器。
            if(this.animationFrame){
                cancelAnimationFrame(this.animationFrame) ;
                this.animationFrame = null ;
            }
            if(this.timer){
                clearTimeout(this.timer);
                this.timer = null ;
            }
        }
    }
</script>