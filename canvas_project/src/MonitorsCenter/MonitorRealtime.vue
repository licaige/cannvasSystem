<template>
    <!-- 实时心电图组件 -->
    <div class="monitor-realtime-root" :style="opt.style">
        <div class="canvas-wrap-el" :class='{"full":opt.showWaveOnly}'  ref='canvas-wrap-el' :style="{'border-left':infoBorderStyle,'border-top':infoBorderStyle,'border-bottom':infoBorderStyle}">
            <canvas class='canvas-el grid' :class='{"show":running}' ref='grid-canvas-el' :width='canvasW' :height="canvasH" :style="`transition:all ${runStateSwitchDuration}s ease-in-out`"></canvas>
            <canvas class='canvas-el wave' :class='{"show":running}' ref='wave-canvas-el' :width='canvasW' :height="canvasH" :style="`transition:all ${runStateSwitchDuration}s ease-in-out`"></canvas>
            <transition name="slide">
            <div class='msg-show-wrap' :class='{"info":msgType=="info","warning":msgType=="warning","error":msgType=="error"}' v-show="Boolean(msgText)">
                <span class='msg-show-text'>{{msgText}}</span>
            </div>
            </transition>
        </div>
        <div class="info-wrap-el" v-if='!opt.showWaveOnly'>
            <div class="info-title" :style="{'border-left':infoBorderStyle,'border-right':infoBorderStyle,'border-top':infoBorderStyle,'transition':'all '+runStateSwitchDuration+'s ease-in-out'}" :class='{"show":running}' >
                <span v-if='channel' class='channel-name-text'>通道-<b class='channel-num'>{{channel}}</b></span>
                <span class='patient-name-text' :style="`transition:all ${runStateSwitchDuration}s ease-in-out`">{{patientData&&patientData.name?patientData.name:'---'}}</span>
            </div>
            <div class='info-content-wrap' :class="{'show':running}" :style="{'border-top':infoBorderStyle,'border-left':infoBorderStyle,'transition':'all '+runStateSwitchDuration+'s ease-in-out'}">
                <div class='info-cont-item hr' :style="{'border-right':infoBorderStyle,'border-bottom':infoBorderStyle}">
                    <span class='item-type-text'>{{vitalSigns&&vitalSigns.hr?"心率":vitalSigns&&vitalSigns.pr?"脉搏":"心率"}}</span>
                    <div class="main-text">{{vitalSigns&&vitalSigns.hr?vitalSigns.hr:vitalSigns&&vitalSigns.pr?vitalSigns.pr:"---"}}</div>
                    <span class='item-unit-text'>(bpm)</span>
                </div>
                <div class='info-cont-item rr' :style="{'border-right':infoBorderStyle,'border-bottom':infoBorderStyle}">
                    <span class='item-type-text'>呼吸率</span>
                    <div class="main-text">{{vitalSigns&&vitalSigns.rr?vitalSigns.rr:"---"}}</div>
                    <span class='item-unit-text'>(bpm)</span>
                </div>
                <div class='info-cont-item spo2' :style="{'border-right':infoBorderStyle,'border-bottom':infoBorderStyle}">
                    <span class='item-type-text'>血氧</span>
                    <span class='item-limit-max'>100</span>
                    <div class="main-text">{{vitalSigns&&vitalSigns.spo2?vitalSigns.spo2:"---"}}</div>
                    <span class='item-unit-text'>(%)</span>
                    <span class='item-limit-min'>90</span>
                </div>
                <div class='info-cont-item bp' :style="{'border-right':infoBorderStyle,'border-bottom':infoBorderStyle}">
                    <span class='item-type-text'>血压</span>
                    <div class="main-text bp">
                        <div>{{vitalSigns&&vitalSigns.sbp?vitalSigns.sbp:"---"}}<b class='bp-sep'>/</b>{{vitalSigns&&vitalSigns.dbp?vitalSigns.dbp:"---"}}  <!-- 收缩压(高压)/舒张压(低压) --></div>
                        <div>({{vitalSigns&&vitalSigns.ibpMean?vitalSigns.ibpMean:"---"}}) <!-- 平均脉动圧，公式：1/3(收缩压+2×舒张压) (120+80*2)/3 --></div>
                    </div>
                    <span class='item-unit-text'>(mmHg)</span>
                </div>
            </div>
        </div>
        <span class='power-btn' @click="__powerBtnHandle" v-if='opt.showPowerBtn'>
            <i class='el-icon-switch-button' :class="{'on':running,'off':!running}" :style="`transition:all ${runStateSwitchDuration}s ease-in-out`"></i>
        </span>
    </div>
</template>
<style scoped>
    .monitor-realtime-root{
        position: relative;
        box-sizing: border-box;
        color: #fff;
    }
    .canvas-wrap-el{
        float: left;
        position: relative;
        width: 55%;
        height: 100%;
        overflow: hidden;
    }
    .canvas-wrap-el.full{
        width: 100%;
    }
    .canvas-wrap-el .canvas-el{
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .canvas-wrap-el .canvas-el.show{
        opacity: 1;
    }
    .canvas-wrap-el .canvas-el.grid{
        z-index: 1;
    }
    .canvas-wrap-el .canvas-el.wave{
        z-index: 2;
    }
    .info-wrap-el {
        float: left;
        width: 45%;
        height: 100%;
    }
    .info-wrap-el .info-title{
        display: block;
        width: 100%;
        height: 36px;
        line-height: 36px;
        background: rgba(255,255,255,0.2);
        position: relative;
        opacity: 0;
    }
    .info-wrap-el .info-title.show{
        opacity: 1;
    }

    .info-wrap-el .channel-name-text{
        position: absolute;
        top: 0;
        left: 0;
        padding-left: 10px;
        font-size: 14px;
        height: 100%;
    }
    .info-wrap-el .channel-num{
        font-size: 16px;
    }
    .info-wrap-el .patient-name-text{
        display: block;
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }
    
    .info-wrap-el .info-content-wrap{
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        height: calc(100% - 36px);
        opacity: 0;
    }
    .info-wrap-el .info-content-wrap.show{
         opacity: 1;
    }
    .info-wrap-el .info-cont-item{
        flex: 1 1 50%;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;  
    }
    .info-wrap-el .info-cont-item.hr{
        color: #a3d148;
        font-weight: bold;
    }
    .info-wrap-el .info-cont-item.rr{
        color: #efc519;
        font-weight: bold;
    }
    .info-wrap-el .info-cont-item.spo2{
        color: #8bd1f0;
        font-weight: bold;
    }
    .info-wrap-el .info-cont-item.bp{
        color: #ee4e4e;
        font-weight: bold;
    }
    .info-wrap-el .item-type-text,.info-wrap-el .item-limit-max{
        position: absolute;
        top: 5px;
        font-size:12px;
    }
    .info-wrap-el .item-type-text{
        left: 5px;
    }
    .info-wrap-el .item-limit-max{
        left: 40px;
        width: 20px;
        text-align: right;
    }
    .info-wrap-el .item-unit-text,.info-wrap-el .item-limit-min{
        position: absolute;
        font-size:12px;
    }
    .info-wrap-el .item-unit-text{
        bottom: 5px;
        left: 5px;
    }
    .info-wrap-el .item-limit-min{
        bottom: 20px;
        left: 40px;
        width: 20px;
        text-align: right;
    }
    
    .info-wrap-el .main-text{
        position: absolute;
        height: auto;
        font-size: 60px;
        line-height: 60px;
        font-weight: bold;
        text-align: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 20%;
        vertical-align: middle;
    }
    .info-wrap-el .main-text.bp{
        font-size: 24px;
        line-height: 30px;
    }
    .info-wrap-el .main-text.bp .bp-sep{
        margin: 0 3px;
    }

    .power-btn{
        position: absolute;
        right: 5px;
        top: 5px;
        width:28px;
        height: 28px;
        z-index:3;
        background: rgba(255,255,255,0.3);
        border-radius: 4px;
        cursor: pointer;
    }
    .power-btn .el-icon-switch-button{
        display: block;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        margin: 4px;
        overflow: visible;
    }
    .power-btn .el-icon-switch-button.off{
        color: #bbb;
    }
    .power-btn .el-icon-switch-button.on{
        color: lime;
        text-shadow: 0 0 12px lime;
    }
    .msg-show-wrap{
        position: absolute;
        width: 100%;
        height: 36px;
        line-height: 1.2;
        top: 0;
        left: 0;
        text-align: center;
        display: table;
        transform: translateY(0);
        z-index: 2;
    }
    .msg-show-wrap .msg-show-text{
        display: table-cell;
        padding: 10px 20px;
        vertical-align: middle;
        text-align: center;
        word-break: break-all;
        font-size: 14px;
        color: #fff;
    }
    .msg-show-wrap.info{
        background: rgba(64, 158, 255, 0.4);
        /* color: rgba(64, 158, 255, 1); */
    }
    .msg-show-wrap.warning{
        background: rgba(230, 162, 60, 0.4);
        /* color: rgba(230, 162, 60, 1); */
    }
    .msg-show-wrap.error{
        background: rgba(245, 108, 108, 0.4);
        /* color: rgba(245, 108, 108, 1); */
    }
    .slide-enter,.slide-leave-to{
        transform: translateY(-100%);
    }
    .slide-enter-active,.slide-leave-active{
        transition: transform 0.3s ease-in-out;
    }
</style>
<script>

export default{
    props:{
        option:{
            type:Object,
        },
        channel:{
            type:Number,
        }
    },
    data() {
        return {
            opt:{ // 默认配置
                waveNames:[/* 'I','II','RESP','SPo2' */], // 须展示的波形名,需与数据中的波形name对应，否则无法展示波形,必须传入
                showWaveOnly:true, // 是否只展示波形区
                showPowerBtn:true, // 是否展示电源按钮
                style:{
                    backgroundColor:"#333",
                    border:"none",
                    width:"100%",
                    height:"100%",
                    grid:{ // 生命体征信息区栅格样式,showWaveOnly=true只展示波形区时，该信息区不展示，该配置无意义，仅当showWaveOnly=false时该配置有效
                        lineWidth:1,
                        color:'#fff',
                        opacity:0.5,
                        type:'solid'
                    }
                },
                waves:{ // 示波区样式配置
                    grid:{ // 栅格
                        show:false,
                        lineWidth:0.5,
                        color:'#fff',
                        opacity:0.2,
                        cell:10, // 栅格单元格大小
                    },
                    wave:{ // 波形相关配置
                        lineWidth:1,
                        color:'#fff',
                        opacity:1
                    },
                    nameStyle:{ // 波形名
                        font:'italic normal 10px arial,sans-serif', // 字体设置
                        color:'#fff', // 字体颜色
                        cover:true, // 是否遮盖下层内容（如有栅格，且设置了cover，这波形名位置遮盖栅格线）
                        width:40, // 占宽度
                    },
                    splitLine:{
                        show:false,
                        lineWidth:2,
                        color:'#fff',
                        style:'solid'
                    }
                },
            },
            H:0 , // 波高，根据配置的option.waveNames的数量，平分canvas高度得到，初始化监护仪配置和状态时，动态计算得到（canvasH/波的个数）
            padding:5, // canvas上、下各预留的留白区大小，防止波形波动，画出可视区外，计算波高和绘制波形时，需考虑该值
            rate:NaN, // 总体的缩放倍率，所有波的倍率一样，使他们放大/缩小同等比例，绘制到画布中，该倍率由首次push进来的数据决定，一旦确定，不再更改（即使后续某些波形数据很大，超出画布，也不再修改倍率，超出画布的波形即显示超出画布）
            clearW:10, // 心电图画线过程中，擦除区的宽度（px）
            stdPointPerWave:250 , // 每个波每秒有多少个点数的基准值，实际每个波点数不一样，因此每个波需要以此标准值计算x方向上的倍率，即每个点之间的间隔x坐标关系（每个波点数可能不同，因此同一秒的波，在x方向上绘制的点疏密程度不同，需要计算）
            waveDataMax:256, // 波形波高最大值，点数据最大值，通常由监护仪厂家文档资料得到，这里可根据配置动态修改
            running:false , // 监护仪运行状态
            runStateSwitchDuration:0.5, // 运行状态切换过渡动画时长（组件内部状态）
            runStateSwitchTimer:null, // 运行状态切换延时定时器（仅用于开关切换时，切换状态的动画）
            canvasW:300, // canvas宽度初始值，实际值需要根据页面动态计算
            canvasH:150, // canvas高度初始值，实际值需要根据页面动态计算
            gridCanvas:null , // 绘制示波区的栅格的canvas元素对象
            waveCanvas:null , // 绘制示波区内容的canvas元素对象
            gridCtx:null , // 绘制示波区栅格的canvas绘制环境对象
            waveCtx:null , // 绘制示波区内容的canvas绘制环境对象

            patientData:null , // 患者数据
            vitalSigns:null, // 基本生命体征数据
            waves:[], // 波形数据
            drawWaves:{}, // 正在绘制中的数据（从waves中取出来）
            drawTimer:null, // 绘制的定时器
            drawDuration:20, // 绘制的定时器的间隔（mm），即每秒的帧数 = 1000/drawDuration 该值暂定20，不可随意更改，如需改动，请注意能让1000整除，使帧数为整数，否则逻辑可能会出问题
            x:0 , // 当前的绘制位置x
            secondIndex:0 , // 当前秒数序号（已绘制多少秒的数据）
            fIndex:0, // 当前绘制第几帧
            drawState:false , // 绘制中的状态
            noDataState:false , // 无数据的状态，每次去数据池（waves）取数据时，如果没数据可取，就标记为true
            dataPoolDelay:4 , // 数据池的存量延迟（时间，秒），当数据池存储的数据量存储了这么多秒的数据时，开始绘制
            dataTransferTimer:null , // 数据转换的定时器（组件内部每隔1秒取一次数据，转换为可绘制数据）
            // 提示消息相关
            msgText:'', // 需要展示的消息文字
            msgType:'info', // 需要展示的消息类型，3种：info，warning，error
            msgTimeout:null, // 消息提示的显示时间延迟

        }
    },
    computed:{
        infoBorderStyle(){
            if(this.opt.showWaveOnly||!this.running){
                return "";
            }else{
                return this.opt.style.grid.lineWidth+"px "+this.opt.style.grid.type+" "+this.__updateAlpha(this.opt.style.grid.color,this.opt.style.grid.opacity) 
            }   
            
        }
    },
    methods:{
        /* ****************************************************
        * 以__开头的方法为组件内部方法，不建议外部调用，其余方法为组件开放方法，可直接调用
        *
        *
        * ****************************************************/

        __init(){ // 初始化方法
            // 初始化样式配置项
            if(this.option){ // 存在配置项，保存配置项
                // 波形名配置
                let names = this.option.waveNames ;
                this.opt.waveNames = names || [] ;
                // 判断是否只展示示波区，不展示生命体征信息格区
                let showWaveOnly = this.option.showWaveOnly ;
                this.opt.showWaveOnly = (showWaveOnly===false?false:true) ; 
                // 判断是否展示电源按钮
                let showPowerBtn = this.option.showPowerBtn ; 
                this.opt.showPowerBtn = (showPowerBtn===false?false:true) ;  
                
                // 总体样式配置
                let style = this.option.style ; 
                if(style){
                    for(let key in style){
                        if(key!=='grid'){
                            this.$set(this.opt.style,key,style[key]); // 将用户传入的配置更新到本地数据
                        }else{
                            let grid = this.option.style.grid ; // 配置的信息栅格
                            if(grid){
                                for(let gridKey in grid){
                                    this.$set(this.opt.style.grid,gridKey,grid[gridKey]); // 将用户传入的配置更新到本地数据
                                }
                            }
                        }
                    }
                }
                
                // 示波区样式配置
                let waves = this.option.waves ; 
                if(waves){
                    if(waves.grid){ // 栅格配置
                        for(let key in waves.grid){
                            this.$set(this.opt.waves.grid,key,waves.grid[key]); // 将用户传入的配置更新到本地数据
                        }
                    }
                    if(waves.wave){ // 波形配置
                        for(let key in waves.wave){
                            this.$set(this.opt.waves.wave,key,waves.wave[key]); // 将用户传入的配置更新到本地数据
                        }
                    }
                    if(waves.nameStyle){
                        for(let key in waves.nameStyle){
                            this.$set(this.opt.waves.nameStyle,key,waves.nameStyle[key]); // 将用户传入的配置更新到本地数据
                        }
                    }
                    if(waves.splitLine){
                        for(let key in waves.splitLine){
                            this.$set(this.opt.waves.splitLine,key,waves.splitLine[key]); // 将用户传入的配置更新到本地数据
                        }
                    }
                }
                // 信息文字区样式配置
                let info = this.option.info ;
                if(info){
                    if(info.grid){
                        for(let key in info.grid){
                            this.$set(this.opt.info.grid,key,info.grid[key]); // 将用户传入的配置更新到本地数据
                        }
                    }
                }
            }
        },
        __canvasInit(){
            let wrap = this.$refs['canvas-wrap-el'] ; 
            if(wrap){
                let rectInfo = wrap.getBoundingClientRect() ;
                this.canvasW = Math.floor(rectInfo.width) ;
                this.canvasH = Math.floor(rectInfo.height) ;
                // 得到canvas高度后，计算波高（canvas高度/波数）
                this.H = Math.floor((this.canvasH-this.padding*2)/this.opt.waveNames.length) ;
                // console.log('H:',this.H)
                let rate = this.H/this.waveDataMax ;  // 根据波高和波数据最大值，计算倍率
                this.rate = Math.floor(rate*100)/100 ; // 最多保留2位小数
            }
            this.gridCanvas = this.$refs['grid-canvas-el'] ;
            this.waveCanvas = this.$refs['wave-canvas-el'] ;
            if(this.gridCanvas&&this.gridCanvas.getContext){
                this.gridCtx = this.gridCanvas.getContext('2d') ;
                this.waveCtx = this.waveCanvas.getContext('2d') ;
            }else{
                console.error('您的浏览器不支持canvas，请使用最新谷歌浏览浏览本页面')
            }
        },
        __gridCanvasRender(){ // 绘制栅格canvas的内容
            if(this.gridCtx){
                this.gridCtx.save() ;
                // 先清除栅格canvas的一切内容
                this.gridCtx.clearRect(0,0,this.canvasW,this.canvasH);
                // 绘制背景色
                if(this.opt.style.backgroundColor&&this.opt.style.backgroundColor!='transparent'){
                    this.gridCtx.fillStyle = this.opt.style.backgroundColor ;
                    this.gridCtx.fillRect(0,0,this.canvasW,this.canvasH);
                }
                // 绘制栅格
                if(this.opt.waves.grid.show){
                    this.gridCtx.save() ;
                    this.gridCtx.lineWidth = Number(this.opt.waves.grid.lineWidth) ;
                    this.gridCtx.strokeStyle = this.__updateAlpha(this.opt.waves.grid.color,this.opt.waves.grid.opacity) ;
                    this.gridCtx.translate(0.5,0.5);
                    // 横线
                    let y = 0 ;
                    this.gridCtx.beginPath() ;
                    while(y<=this.canvasH){
                        this.gridCtx.moveTo(0,y);
                        this.gridCtx.lineTo(this.canvasW,y);
                        y+=this.opt.waves.grid.cell ;
                    }
                    // 竖线
                    let x = 0 ;
                    while(x<=this.canvasW){
                        this.gridCtx.moveTo(x,0);
                        this.gridCtx.lineTo(x,this.canvasH);
                        x+=this.opt.waves.grid.cell ;
                    }
                    this.gridCtx.stroke();
                    this.gridCtx.restore() ;
                }
                // 绘制波形名
                if(this.opt.waves.nameStyle.cover&&this.opt.style.backgroundColor!='transparent'){ // 波形名遮盖
                    let linearGradient = this.gridCtx.createLinearGradient(0,0,this.opt.waves.nameStyle.width*2,0);
                    linearGradient.addColorStop(0,this.opt.style.backgroundColor);
                    linearGradient.addColorStop(1,this.__updateAlpha(this.opt.style.backgroundColor,0));
                    this.gridCtx.fillStyle = linearGradient ;
                    this.gridCtx.fillRect(0,0,this.opt.waves.nameStyle.width*2,this.canvasH);
                }
                this.gridCtx.textAlign = "center";// 文字水平对齐方式
                this.gridCtx.textBaseline = "middle";// 文字垂直对齐方式
                this.gridCtx.font = this.opt.waves.nameStyle.font ; // 字体样式（大小，字体类型等）
                this.gridCtx.fillStyle = this.opt.waves.nameStyle.color ; // 字体颜色设置
                let labels = this.opt.waveNames ; // 需要绘制的波形名label（array）
                let h = (this.canvasH-2*this.padding)/labels.length ;// canvas高度/波形数量=每个波形所占高度
                labels.forEach((name,index)=>{
                    this.gridCtx.fillText(name,this.opt.waves.nameStyle.width/2,index*h+h/2+this.padding)
                })
                this.gridCtx.restore() ; // canvas状态重置
            }
        },
        __resizeHandle(){ // 页面resize，触发canvas宽高改变，自动清除canvas已绘制内容，需重新初始化canvas
            this.__canvasInit();
            this.$nextTick(()=>{
                this.__gridCanvasRender() ; // 绘制栅格等
            })
        },
        __drawWaves(){ // 绘制波形
            if(this.waveCtx){
                // this.waveCtx.clearRect(0,0,this.canvasW,this.canvasH) ;
                let names = this.opt.waveNames ; // 规定要展示的波
                if(this.x==0){
                    this.x += this.opt.waves.nameStyle.width ; // x的初始位置，修正，增加波形名的宽度位置，绘制的起点不覆盖波形名，需给波形名留出空白区域
                }
                this.waveCtx.clearRect(this.x,0,this.clearW,this.canvasH)
                // 绘制每一帧的所有波
                names.forEach((name,index)=>{
                    let waveData = this.drawWaves[name]; // 须绘制的波的数据对象
                    let list = waveData.list ; // 波的点集合
                    let xRate = waveData.xRate ; // 波的点间隔疏密倍率
                    let style = waveData.style ; // 波的样式配置
                    let bfp = waveData.bfp ; // 大帧要画的点数
                    let sfp = waveData.sfp ; // 小帧要画的点数
                    let bfc = waveData.bfc ; // 大帧的数量
                    let sfc = waveData.sfc ; // 小帧的数量
                    let pointPerWave = waveData.pointPerWave ; // 每秒多少个点数据（实际值）
                    

                    // 计算本次需绘制多少个点
                    let bCount = 0 ;
                    let sCount = 0 ;
                    let totalCount = 0 ;
                    if(bfc<=sfc){
                        bCount = Math.floor(this.fIndex/2)+1<=bfc?Math.floor(this.fIndex/2)+1:bfc ; // 本次绘制大帧数量
                        sCount = this.fIndex+1 - bCount ; // 本次绘制小帧数量，除了大帧，就是小帧
                    }else{
                        sCount = Math.floor(this.fIndex/2)+1<=sfc?Math.floor(this.fIndex/2)+1:sfc ; // 本次绘制大帧数量
                        bCount = this.fIndex+1 - sCount ;
                    }
                    totalCount = this.secondIndex*pointPerWave + bCount*bfp +sCount*sfp ; // 本次可绘制的总点数
                    
                    // 绘制这些点
                    this.waveCtx.save() ;
                    this.waveCtx.lineWidth = style.lineWidth ;
                    this.waveCtx.strokeStyle = style.colorRGBA ;
                    this.waveCtx.beginPath()
                    for(let i=0;i<=totalCount;i++){
                        if(list[i]!==undefined){ // 有数据，则绘制
                            if(i==0){
                                this.waveCtx.moveTo(i*this.rate*xRate+this.opt.waves.nameStyle.width ,(this.H-list[i]*this.rate)+(index*this.H)+this.padding)
                            }else{
                                this.waveCtx.lineTo(i*this.rate*xRate+this.opt.waves.nameStyle.width ,(this.H-list[i]*this.rate)+(index*this.H)+this.padding)
                            }
                        }
                    }
                    this.waveCtx.stroke();
                    this.waveCtx.restore();

                    // 更新当前的点所在x位置（用来判断是否在可视区外），所有的波绘制是同时进行的，所以只需判断其中一个波即可（这里取第一个波），
                    if(index===0){
                        this.x = totalCount*this.rate*xRate+this.opt.waves.nameStyle.width ; // x递增位置
                    }
                })
                // 帧序号递增
                this.fIndex ++ ; 
                
                if(this.fIndex >= Math.ceil(1000 / this.drawDuration)){ // 如果序号大于帧率，即重置为0，下次绘制下一秒的数据的第0帧
                    this.fIndex = 0 ; // 帧序号重置，准备绘制下一秒数据
                    this.secondIndex++ ; // 秒数+1
                    // 判断是否到达右侧可视区外
                    if(this.x>=this.canvasW){ // 已达到可视区外，且刚好一秒的数据绘制完，从新从开始位置绘制
                        console.warn("------------到达可视区外!")
                        // 每个波删除已绘制的数据
                        names.forEach((name,index)=>{
                            let waveData = this.drawWaves[name]; // 须绘制的波的数据对象
                            let list = waveData.list ; // 波的点集合
                            let pointPerWave = waveData.pointPerWave ; // 每秒多少个点数据（实际值）
                            list.splice(0,pointPerWave*this.secondIndex);
                        })
                        // x位置回到最开始，秒数归0
                        this.x = 0 ;
                        this.secondIndex = 0 ;
                        
                        // 已到达最右侧，波形即将返回最左侧重新开始绘制，擦除位置先重置到左侧，擦除一个位置
                        this.waveCtx.clearRect(0,0,this.clearW+this.opt.waves.nameStyle.width,this.canvasH)
                    }
                    
                    // 开始绘制下一秒的数据，进行获取数据并预处理数据的操作
                    this.__getAndTransferPoint()
                    
                }

                // 心电波绘制完成，判断是否有分隔线配置，如果有，则绘制分隔线
                if(this.opt.waves.splitLine.show){
                    this.__drawSplitLine();
                }
                
            }
        },
        __drawSplitLine(){ // 绘制波形的分隔线（视觉上将canvas分隔开）
            // splitLine:{
            //     show:true,
            //     lineWidth:2,
            //     color:'#fff',
            //     style:'solid'
            // }
            if(this.waveCtx){
                let names = this.opt.waveNames ; // 规定要展示的波
                this.waveCtx.save() ;
                this.waveCtx.lineWidth = this.opt.waves.splitLine.lineWidth ; // 线宽
                this.waveCtx.strokeStyle = this.opt.waves.splitLine.color ; // 颜色
                let dashedArr = [] ; // 虚线配置数组
                this.waveCtx.beginPath() ;
                if(this.opt.waves.splitLine.style=='dotted'){ // 点线
                    dashedArr = [this.waveCtx.lineWidth,this.waveCtx.lineWidth];
                }else if(this.opt.waves.splitLine.style=='dashed'){ // 虚线
                    dashedArr = [this.waveCtx.lineWidth*3,this.waveCtx.lineWidth*2];
                }else{ // 实线
                    dashedArr = [] ;
                }       
                this.waveCtx.setLineDash(dashedArr)
                for(let i=0;i<names.length;i++){
                    if(i!=0){ // 第一条不用画
                        this.waveCtx.moveTo(0,this.padding+this.H*i);
                        this.waveCtx.lineTo(this.canvasW,this.padding+this.H*i);
                    }
                }
                this.waveCtx.stroke();
                this.waveCtx.restore() ;

            }
        },
        
        __getAndTransferPoint(){ // 取数据(每秒执行)，并转化为canvas需要的坐标，存入到绘制数据中，而绘制逻辑则将绘制数据全部绘制出来
            // 处理帧率与点数之间的关系
            let fps = Math.ceil(1000 / this.drawDuration) ; // 帧率   // 50
            this.waves.forEach((wave,index)=>{
                // console.log(wave)
                let waveOrigin = wave.data ; // 原始数据中的所有点
                let pointPerWaveReality = wave.pointPerWaveReality ; // 每秒有多少个点（取决于监护仪品牌和波的类型，有所不同，由上层传来），按实际值取数据    
                let pointPerWave = wave.pointPerWave ; // 每秒有多少个点（取决于监护仪品牌和波的类型，有所不同，由上层传来），按实际值取数据    
                let name = wave.name ;
                let style = wave.style ;
                let xRate = wave.xRate ; // 点的横向疏密程度，x方向倍率
                
                // 判断原始数据池中的数据量，如果超过一定值，删除部分点
                if(waveOrigin.length>pointPerWave*this.dataPoolDelay &&waveOrigin.length<=pointPerWave*(this.dataPoolDelay+1)){ // 数据量大小大于设定的数据池大小，删除一些点，防止数据池数据积压
                    // console.warn('执行删点！')
                    if(index==0){
                        console.log('++++++源数据点数超出了，点数：',waveOrigin.length)
                    }
                    let count = Math.ceil(pointPerWave*0.1) ; // 需删除的点数
                    let dura = Math.floor(waveOrigin.length/count) ; // 间隔多少序号，删除一个点，将需要删除的点分散开来
                    for(let i=0;i<count;i++){
                        waveOrigin.splice(i*dura,1);
                    }
                }else if(waveOrigin.length>pointPerWave*(this.dataPoolDelay+1)){ // 超出且超出太多了（浏览器切换至其他应用后，canvas会停止绘制（数据仍然不断获取中）,一段时间后切换回来，会导致大量数据积压）
                    waveOrigin.splice(0,waveOrigin.length-2*pointPerWave) ; // 几乎全删掉，留2秒数据
                }else{
                    if(index==0){
                        console.log('------------不超出：',waveOrigin.length)
                    }
                }
                
                // 从绘制数据中找到对应该波形的数据
                let drawDataItem = this.drawWaves[name] ; 
                // 需要判断每帧绘制多少个点，每个波可能不一样，因此每次取数据都要判断
                // 由于每秒要绘制的点数（pointPerWave）/帧率（fps） 得到得数字可能不是整数，因此可能有些帧绘制多一个点，有些帧绘制少一个点，最终刚好使该秒的全部点数（pointPerWave）在这一秒内绘制完
                // 需要多绘制一个点的，称为“大帧-bigFrame”，绘制少一个点的称为“小帧-smallFrame”, 以下变量以 bf、sf开头的，均为此意。
                let bfp = 0 ; // 大帧须绘制的点数
                let bfc = 0 ; // 大帧的数量（每秒有多少个大帧）bigFrameCount
                let sfp = 0 ; // 小帧需要绘制的点数
                let sfc = 0 ; // 小帧的数量（每秒有几个小帧）smallFrameCount
                // 判断能不能整除
                if(pointPerWaveReality%fps === 0){ // 能整除，则没有大小帧之分，可设置大小帧一样
                    bfp = sfp = Math.floor(pointPerWaveReality/fps) ;
                    bfc = fps ; // 大帧数量=帧率，即全部帧都为大帧（大小帧一样的，此时数量无所谓）
                    sfc = 0 ; // 小帧数为0
                }else{ // 不能整除的情况，此时必须区分大小帧
                    sfp = Math.floor(pointPerWaveReality/fps) ; 
                    bfp = sfp + 1 ; // 大帧比小帧多绘制一个点
                    bfc = pointPerWaveReality%fps ;
                    sfc = Math.floor(fps-bfc) ; // 总帧数-大帧数量=小帧数量
                }
                this.$set(drawDataItem,'bfp',bfp) ; // 更新绘制参数
                this.$set(drawDataItem,'bfc',bfc) ; // 更新绘制参数
                this.$set(drawDataItem,'sfp',sfp) ; // 更新绘制参数
                this.$set(drawDataItem,'sfc',sfc) ; // 更新绘制参数
                this.$set(drawDataItem,'style',style) ; // 绘制样式
                this.$set(drawDataItem,'xRate',xRate) ; // x方向疏密度倍率
                this.$set(drawDataItem,'pointPerWave',pointPerWaveReality) ; // 每秒多少个点数据
                // console.log('-----当前有的数据数量：',waveOrigin.length)
                let points = waveOrigin.splice(0,pointPerWaveReality) ; // 根据每秒的点数，从原始数据中删除该数量的点，处理成需绘制的点，放入绘制数据list中
                // console.log(points.length)
                if(points.length===0){ // 无数据可取了
                    this.noDataState = true 
                }else{
                    this.noDataState = false 
                }
                drawDataItem.list = drawDataItem.list.concat(points)
            })
        },
        __powerBtnHandle(){ // 电源按钮点击事件
            if(this.running){ // 原本是打开的，则关闭
                this.powerOff() ;
            }else{
                this.powerOn() ;
            }
        },
        getRunningState(){ // 获取监护仪运行状态的方法
            return this.running ;
        },
        powerOn(){ // 打开监护仪的方法
            if(this.runStateSwitchTimer){ // 判断定时器，防止正在关闭动画过程中，无法正常打开监护仪（清除切换的定时器即可）
                clearTimeout(this.runStateSwitchTimer)
            }
            this.__init() ; // 初始化配置等
            this.$nextTick(()=>{
                // 配置更新后，初始化canvas参数
                this.__canvasInit() ;
                // 等待canvas配置初始化完成后，绘制栅格等
                this.$nextTick(()=>{
                    this.__gridCanvasRender() ; // 绘制栅格等
                    // 启动完成，转变状态
                    this.running = true ;
                    console.log('Monitor is running！') ;
                    // 向上发送启动完成事件
                    this.$emit('powerOnComplete',{channel:this.channel});
                })
            })
        },
        powerOff(){ // 关闭监护仪的方法
            // 停止绘制
            if(this.drawTimer){
                clearInterval(this.drawTimer) ;
            }
            if(this.dataTransferTimer){
                clearInterval(this.dataTransferTimer) ;
            }
            if(this.msgTimeout){
                clearTimeout(this.msgTimeout) ;
            }
            let patient = this.patientData ; // 患者信息（名称、id）
            // 清理数据，回复初始状态, 关闭定时器等
            this.H = 0 ; // 波高重置
            this.rate = NaN ; // 倍率重置
            this.patientData = null; // 患者数据
            this.vitalSigns = null; // 基本生命体征数据
            this.waves = []; // 波形数据
            this.drawWaves = {}; // 正在绘制中的数据（从waves中取出来）
            this.x = 0 ; // 回执位置重置
            this.secondIndex = 0 ;
            this.fIndex = 0 ; // 当前绘制的帧序号重置
            this.drawState = false ; // 绘制状态置为false
            this.noDataState = false ; // 无数据的状态标记
            this.msgText = '' ; // 需要展示的消息文字
            this.msgType = 'info' ; // 需要展示的消息类型，3种：info，warning，error
            // 关闭监护仪
            this.running = false ; // 监护仪状态置为false
            // 向上发送关闭完成事件
            this.$emit('powerOffDone',{channel:this.channel,patient:patient||null}) ;
            // 至此已完成逻辑关闭
            // *************************************************************************************
            // 等待动画执行完之后，再清除canvas画布，完成最终关闭效果（视觉）
            if(this.runStateSwitchTimer){
                clearTimeout(this.runStateSwitchTimer)
            }
            this.runStateSwitchTimer = setTimeout(()=>{
                if(this.gridCtx){ // 关闭监护仪，则监护仪的栅格、波形等状态也清除
                    this.gridCtx.clearRect(0,0,this.canvasW,this.canvasH)
                    this.waveCtx.clearRect(0,0,this.canvasW,this.canvasH)
                }
                console.log('Monitor is closed！') ;
                // 向上发送关闭完成事件
                this.$emit('powerOffComplete',{channel:this.channel,patient:patient||null}) ;
            },this.runStateSwitchDuration*1000)
        },
        pushData(data){ // 往监护仪传递数据的方法(因为监护仪数据的特殊性、连续性，需要不断push数据进来，不能使用通常的组件传递数据的方式，这里使用方法来push数据),监护仪组件将自己维护这些push进来的数据(而正常的组件传递数据的方式，数据的维护在父级)
            // console.log("pushData!")
            if(!this.running){ // push数据时，如果监护仪未开启，不接收数据，控制台报错提示
                console.error("the Monitor can't receive data because it's not running, please execute powerOn before pushData.") ;
                return false ;
            }
            // 根据组件展示，组件需要的数据格式
            /* let data = {
                patient:{ // 患者信息
                    name:"张三", // 展示用, 如果需要展示信息区（showWaveOnly=false），则该名必须传，否则可以不传
                    id:'1234567890123' , // 唯一值，监护仪开关等操作时，返回给上层
                },
                base:{ // 基本生命体征数据，本组建展示心率、呼吸率、血氧饱和度、血压；其中血压3个数值，收缩压、舒张压须传入，平均脉压差由本组件根据收缩压、舒张压自行计算，不需要传入
                    hr:62,// 心率
                    pr:74, // 脉搏
                    rr:15, // 呼吸率
                    spo2:97, // 血氧饱和度
                    sbp:120, // 收缩压（高压）
                    dbp:80, // 舒张压（低压） // 平均动脉压由组件根据高压、低压的值自行计算，不需要传入（ 公式：平均动脉压 = (高压+2*低压)/3 ）
                },
                waves:[
                    {
                        name:"I", // 波形名，必须与配置option.waveNames中的值保持一致
                        data:[126,128,128,130,131,132,134,135,136,137,138,139,139,140,141,142,143,143,143,144,144,144,144,144,143,142,141,140,139,137,137,136,134,133,131,130,128,127,126,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,126,127,129,131,131,132,133,134,135,135,135,135,134,133,132,131,130,128,127,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,124,123,122,120,118,121,133,144,155,165,176,180,170,159,148,137,126,118,119,121,122,124,124,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125], // 波形数据
                        pointPerWave:250 , // 每秒的点数（不同牌子的监护仪，不同的波，可能都不同）,该值必传
                        style:{ // 非必须，波形样式（线宽，颜色,透明度）,优先级比option.waves.wave中的配置高，这里可单独设置一个波的样式，而option.waves.wave则是整体设置所有波的样式 ，
                            lineWidth:1,
                            color:'#a3d148',
                            opacity:1
                        }
                    },
                    {
                        name:"II", // 波形名，必须与配置option.waveNames中的值保持一致
                        data:[126,127,127,129,129,130,131,132,132,133,134,135,135,135,136,136,137,137,137,138,138,138,138,137,137,136,136,135,135,133,133,133,131,130,129,129,127,126,126,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,126,126,127,129,129,130,130,131,132,132,132,132,131,130,130,129,129,127,127,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,124,123,122,121,122,130,137,145,152,159,162,155,148,140,133,126,120,121,122,123,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125], // 波形数据
                        pointPerWave:250 , // 每秒的点数（不同牌子的监护仪，不同的波，可能都不同）
                        style:{ // 波形样式（线宽，颜色,透明度等）,优先级比option.waves.wave中的配置高，这里可单独设置一个波的样式，而option.waves.wave则是整体设置所有波的样式 ，这里非必须
                            lineWidth:1,
                            color:'#a3d148',
                            opacity:1
                        }
                    },
                    {
                        name:"Resp", // 波形名，必须与配置option.waveNames中的值保持一致
                        data:[117,117,118,118,118,119,119,119,120,120,120,121,122,122,122,122,122,123,124,124,124,125,125,125,126,126,126,127,127,128,128,128,129,130,130,130,131,131,132,132,132,133,133,133,134,135,135,136,136,136,137,138,138,139,139,139,140,141,141,142,142,142,143,144,144,144,145,145,146,146,146,147,148,148,149,149,149,150,150,150,151,152,152,153,153,153,154,154,154,155,155,155,156,156,156,157,157,157,158,158], // 波形数据
                        pointPerWave:100 , // 每秒的点数（不同牌子的监护仪，不同的波，可能都不同），本模拟数据是宝莱特的呼吸率，每波点数是100（与心电图波的点数不同，注意区分）
                        style:{ // 波形样式（线宽，颜色,透明度等）,优先级比option.waves.wave中的配置高，这里可单独设置一个波的样式，而option.waves.wave则是整体设置所有波的样式 ，这里非必须
                            lineWidth:1,
                            color:'#efc519',
                            opacity:1
                        }
                    },
                    {
                        name:"SPo2", // 波形名，必须与配置option.waveNames中的值保持一致
                        data:[72,68,64,62,62,60,60,58,58,60,62,64,66,66,68,68,70,66,66,68,68,70,68,68,66,66,64,64,62,60,58,56,54,54,52,50,48,48,46,44,42,40,38,36,34,34,32,32,30,30,28,26,24,24,22,20,18,18,16,14,12,12,10,10,8,8,6,6,4,4,2,2,0,0,0,0,0,0,0,0,0,2,6,12,20,28,38,48,58,70,80,90,100,110,118,128,136,146,154,162], // 波形数据
                        pointPerWave:100 , // 每秒的点数（不同牌子的监护仪，不同的波，可能都不同），本模拟数据是宝莱特的血氧饱和度，每波点数是100（与心电图波的点数不同，注意区分）
                        style:{ // 波形样式（线宽，颜色,透明度等）,优先级比option.waves.wave中的配置高，这里可单独设置一个波的样式，而option.waves.wave则是整体设置所有波的样式
                            lineWidth:1,
                            color:'#8bd1f0',
                            opacity:1
                        }
                    },
                ]
            } */
            // 处理数据，保存到待绘制数据中
            this.patientData = Object.assign({},data.patient) ; // 患者基本信息
            // 基础生命体征信息
            let vitalSigns = Object.assign({},data.base) ; // 基础生命体征信息
            // 计算平均脉压差
            if(vitalSigns.sbp&&vitalSigns.dbp){
                vitalSigns.ibpMean = Math.floor((Number(vitalSigns.sbp)+Number(vitalSigns.dbp)*2)/3) ; // 根据公式计算平均脉压差，下取整
            }
            this.vitalSigns = vitalSigns ;
            // 波形数据
            let waves = data.waves ; 
            let labels = this.opt.waveNames ; // 需要绘制的波的names
            
            if(waves&&waves.length&&labels&&labels.length){
                labels.forEach((name,index)=>{
                    // 根据name，在传入的数据中找到对应的数据集
                    let waveData = waves.filter(e=>e.name==name)[0] ;
                    if(waveData){
                        let pointPerWave = waveData.pointPerWave ; // 每波的点数
                        let pointPerWaveReality = Math.floor(pointPerWave*0.95) ;

                        // 根据每个波的点数和基准点数，计算点的疏密程度（x方向上的倍率）
                        let xRate = this.stdPointPerWave / pointPerWaveReality ; // x倍率(以实际每秒点数（pointPerWaveReality）计算)
                        
                        let data = waveData.data||[] ;
                        
                        // 判断style
                        let style = waveData.style ; 
                        let styleResult = {} 
                        if(style){ // 数据中单独传入了style配置，则以此配置为准
                            styleResult.lineWidth = (style.lineWidth===undefined||style.lineWidth===null||style.lineWidth==="")?this.opt.waves.wave.lineWidth:style.lineWidth
                            styleResult.color = style.color || this.opt.waves.wave.color
                            styleResult.opacity = (style.opacity===undefined||style.opacity===null||style.opacity==="")?this.opt.waves.wave.opacity:style.opacity 
                        }else{ // 未传入此style，则取全局的option配置中的style为准
                            styleResult = Object.assign({},this.opt.waves.wave) ;
                        }
                        // 将color和opacity计算更新为rgba颜色值
                        styleResult.colorRGBA = this.__updateAlpha(styleResult.color,styleResult.opacity);
                        // 判断待绘制数据中是否已有同名数据
                        let drawDataItem = this.waves.filter(item=>item.name==name)[0] ;
                        if(!drawDataItem){ // 如果没有，则本次的数据是新数据,push到数组
                            this.waves.push({
                                name:name,
                                pointPerWave:pointPerWave,
                                pointPerWaveReality:pointPerWaveReality,
                                data:data,
                                style:styleResult,
                                xRate:xRate
                            })
                        }else{ // 已有同名数据，则更新该同名数据，将本次的数据加入进去
                            this.$set(drawDataItem,'name',name);
                            this.$set(drawDataItem,'pointPerWave',pointPerWave);// 每秒多少个点，由上层指定，不同厂家的监护仪不同波形都不一样（但实际上得到监护仪数据可能低于该值）
                            this.$set(drawDataItem,'pointPerWaveReality',pointPerWaveReality); // 实际取值画线时，以基准值的95%来取，防止数据不足（实际监护仪数据量经常低于基准值）造成心电图断开
                            this.$set(drawDataItem,'style',styleResult);
                            this.$set(drawDataItem,'xRate',xRate);
                            drawDataItem.data = drawDataItem.data.concat(data) ; // 点数据拼接进去
                        }
                    }
                })

                
            }
            // 取其中一个波，判断数据量，当数据量达到一定值，就开始绘制
            let w = this.waves[0] ;
            if(w&&w.data&&w.data.length>=w.pointPerWave*this.dataPoolDelay&&!this.drawState){ // 存在波数据且存储了超过规定数量的数据，且绘制状态还未开始绘制时，启动绘制
                this.__ecgRun() ; // 开始运行绘制
            }
        },
        msgShow(text,type,duration){ // 展示一个提示消息, text为需要展示的消息文字 type为类型，字符串“error|warning|info”3种，duration为延迟时间后自动关闭，不传或为0，则不会自动关闭，用户可以主动调用msgHide()方法隐藏当前展示的消息提示
            // console.log('msgShow执行！')
            if(!text){
                console.error('the argument[text] is required!');
                return false ;
            }
            this.msgType = type||"info"  ;
            this.msgText = text ;
            if(duration!==0){
                if(this.msgTimeout){
                    clearTimeout(this.msgTimeout);
                }
                this.msgTimeout = setTimeout(()=>{
                    this.msgText = "" ;
                },duration||3000)
            }
        },
        msgHide(){
            this.msgText = "" ;
            if(this.msgTimeout){
                clearTimeout(this.msgTimeout);
            }
        },
        __ecgRun(){ // 启动绘制
            console.log('__ecgRun!,channel:',this.channel)
            this.drawState = true ; // 标记绘制中的状态
            // 初始化绘制数据
            this.drawWaves = {}
            this.opt.waveNames.forEach(name=>{
                this.$set(this.drawWaves,name,{
                    list:[],
                }) ;// 每个绘制中的波数据，初始为空
            })
            // // 首次开始绘制，取数据进行预处理，准备绘制
            this.__getAndTransferPoint() ;
            
            // 开始绘制波形
            this.$nextTick(()=>{
                this.__drawWaves() ;
                if(this.drawTimer){
                    clearInterval(this.drawTimer)
                }
                this.drawTimer = setInterval(()=>{
                    this.__drawWaves() ;
                },this.drawDuration)
            })
        },

        // 公共的数据处理方法
        __HexColorToRGB(Hex,alpha){ // 将Hex16进制颜色转换为rgb颜色
            if(!Hex) return '' ;
            let reg = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/ ;
            if(!reg.test(Hex)){
                console.error('__HexColorToRGB 方法接收到不正确的 Hex 颜色值，请注意修改！');
                return ''; 
            }
            let hexArr = [] ;
            if(Hex.indexOf('#')>=0){
                hexArr = Hex.slice(1).split('');
            }else{
                hexArr = Hex.split('') ;
            }
            let hex6Str = [] ;
            if(hexArr.length===3){
                // 只有3位的Hex值，则每一位都重复多一次，处理成6位的 ；
                hex6Str = hexArr.map(item=>item+item).join('') ;
            }else if(hexArr.length===6){
                hex6Str = hexArr.join('') ;
            }
            let r = parseInt('0x' + hex6Str.slice(0,2),16) ;
            let g = parseInt('0x' + hex6Str.slice(2,4),16) ;
            let b = parseInt('0x' + hex6Str.slice(4,6),16) ;
            
            // 处理alpha值：
            if(alpha===undefined||alpha===null||alpha===''){
                return 'rgb('+r+','+g+','+b+')' ;
            }else{
                if(isNaN(parseFloat(alpha))){
                    console.error('__HexColorToRGB 方法接收到不正确的 alpha 值，请注意修改！') ;
                    return 'rgb('+r+','+g+','+b+')' ; // 没有有效的alpha值，则返回不带alpha的rgb值 。
                }else{
                    if(parseFloat(alpha)>1){// alpha值超过1，处理成1；
                        alpha = 1 ;
                    }else if(parseFloat(alpha)<0){// alpha小于0 ，处理成0 ;
                        alpha = 0 ;
                    }else{
                        // alpha介于0到1之间的，不用处理
                    }
                    return 'rgba('+r+','+g+','+b+','+alpha+')' ;
                }
            }
        },
        __updateAlpha(rgbaStr,alpha){ // 传入一个rgba的颜色值字符串，更新他的alpha值为新传入的alpha参数值,返回rgba颜色值
            if(!rgbaStr){
                console.error('updateAlpha 方法接收到不正确的 rgbaStr 值，请注意修改！') ;
                return rgbaStr ;
            }
            if(rgbaStr.indexOf('rgb')==-1){
                // 没有rgb字符串，说明不是rgb颜色值字符串，尝试用HexColorToRGB进行转换
                let result = this.__HexColorToRGB(rgbaStr,alpha) ;

                // console.log(result)
                if(result) return result ;
                console.error('颜色处理错误，请确认传入的颜色字符串是否正常')
            }
            if(/^rgb\(/.test(rgbaStr)){ // rgb颜色，需要在最后加多一段alpha
                rgbaStr = rgbaStr.toLowerCase() ;
                let reg = /\)$/ ;
                let result = rgbaStr.replace(reg,','+alpha+')') ; 
                return result ;
            }else if(/^rgba\(/.test(rgbaStr)){ // rgba颜色，本身已有alpha段，本次替换其alpha段
                rgbaStr = rgbaStr.toLowerCase() ;
                let reg = /,([0-9\.]+)\)$/ ;
                let result = rgbaStr.replace(reg,','+alpha+')') ; 
                return result ;
            }    
        }
        
    },
    mounted(){
        this.__init();
        window.addEventListener('resize',this.__resizeHandle,false);
    },
    beforeDestroy(){
        window.removeEventListener('resize',this.__resizeHandle);
        this.powerOff() ; // 组件销毁前执行关闭
    }
}
</script>
