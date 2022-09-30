<template>
    <!-- 历史心电图组件 -->
    <div class="his-ecg-com-root" v-loading="queryLoading">
        <div class='his-ecg-wrap' ref="his-ecg-wrap" >
            <canvas ref="grid-canvas" class="his-ecg-canvas grid-canvas" :width="canvasW" :height="canvasH"></canvas>
            <canvas ref="wave-canvas" class="his-ecg-canvas wave-canvas" :width="canvasW" :height="canvasH"></canvas>
        </div>
        <div class='his-ecg-wrap name-wrap' :style="{width:nameStyle.width*2+'px'}">
            <canvas ref="name-canvas" class="his-ecg-canvas name-canvas" :width="nameStyle.width*2" :height="canvasH"></canvas>
        </div>
        <div class="pagination-warp" v-show="pageOpt.pages">
            <span class='time-text start-time'>{{pageOpt.startTime|timeFormatFilter}}</span>
            <div class="progress-wrap">
                <span class='progress-block' :style="{width:(pageOpt.page*100/pageOpt.pages+'%')}"></span>
                <span class='progress-text'>
                    {{pageOpt.page}}/{{pageOpt.pages}}
                </span>
            </div>
            <span class='time-text end-time'>{{pageOpt.endTime|timeFormatFilter}}</span>
        </div>
        <div class="side-show-btn" @click="sideShow = !sideShow">
            <i :class="{'icon':true,'el-icon-arrow-left':sideShow,'el-icon-arrow-right':!sideShow}"></i>
        </div>
        <el-drawer
            title="信息栏"
            :visible.sync="sideShow"
            direction="ltr"
            :modal='false'
            size='400px'
            :before-close="beforeSideHide">
            <div class="side-content-wrap">
                <el-calendar v-model="dateSelected">
                    <template v-slot:dateCell="scope" >
                        <p>{{ scope.data.day.split('-')[2]}}</p>
                        <p v-if="hasDataDate.indexOf(scope.data.day)>=0"><i class='el-icon-data-line has-data-flag'></i></p>
                    </template>
                </el-calendar>
                <div class="time-slot-list">


                    <div class="time-slot-item" v-for="(itemRange,index) in hasDataTime" :key='itemRange.id'><!--  @click="timeRangeClickHandle(itemRange)" -->
                        <el-slider
                            v-model="itemRange.currentSecond"
                            range
                            :step="1"
                            :min='0'
                            :max='itemRange.timeInterval'
                            :marks="itemRange.marks"
                            :show-stops='false'
                            :show-tooltip='false'
                            @input="sliderInputHandle(itemRange,index)"
                            @change="sliderchangeHandle(itemRange,index)">
                            <!-- :format-tooltip='sliderTooltipForamat' -->
                        </el-slider>
                        <!-- v-model="value1" -->
                        <!-- <span class='time-slot-item-part start-time-text'>{{itemRange.firstReceiveTime|timeFormatFilter}}</span>
                        <div class='time-slot-item-part time-block'><span class='time-block-index'>{{index+1}}</span>{{itemRange.timeDuration}}</div>
                        <span class='time-slot-item-part end-time-text'>{{itemRange.lastReceiveTime|timeFormatFilter}}</span> -->
                    </div>
                    
                </div>
            </div>
        </el-drawer>
    </div>

</template>
<style scoped>
    .his-ecg-com-root{
        box-sizing: border-box;
        position: relative;
        width: 100%;
        height: 100%;
    }
    .his-ecg-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        overflow-x: auto;
        overflow-y: hidden;
        top:0;
        left: 0;
    }
    .his-ecg-wrap.name-wrap{
        z-index: 2;
        overflow-y: visible;
    }
    /* 侧边操作栏样式 */
    .side-show-btn{
        position: absolute;
        width: 15px;
        height: 80px;
        left: 0;
        top: 50%;
        margin-top: -25px;
        background: #fff;
        border-radius: 0 10px 10px 0;
        line-height: 80px;
        text-align: center;
        cursor: pointer;
        font-weight: bold;
        color: #409EFF;
        font-size: 16px;
        font-weight: bold;
        box-shadow: 1px 0 8px -1px rgba(0, 0, 0, 0.3);
        z-index:100;
        opacity: 0.6;
    }
    .side-show-btn:hover{
        background: #409EFF;
        color: #fff;
    }
    ::v-deep .el-drawer__wrapper{
        position: absolute; /* 定位方式改为绝对定位 */
    }
    ::v-deep .el-drawer__header{
        margin-bottom: 20px;
        font-size: 16px;
    }
    ::v-deep .el-drawer__body{
        flex: 1 1 100%;
        height: 50%;
    }
    .side-content-wrap{
        position: relative;
        box-sizing: border-box;
        /* background: #f5f5f7; */
        width: 100%;
        height: 100%;
        padding: 10px 20px;
        overflow:hidden;
        display: flex;
        flex-direction: column;
    }
    /* 日历样式修正 */
    ::v-deep .el-calendar-table td{
        transition: all 0.2s ease-in-out;
        position: relative;
    }
    ::v-deep .el-calendar-table .el-calendar-day{
        height: 50px;
    }
    ::v-deep .el-calendar-table td.is-selected{
        font-size: 14px;
        font-weight: bold;
        color: #409EFF;
    }
    .has-data-flag{
        position: absolute;
        bottom: 5px;
        right: 5px;
        font-size: 18px;
        font-weight: bold;
        color: #409EFF;
        opacity: 0.7;
    }
    /* 时间段列表 */
    .time-slot-list{
        width:100% ;
        flex: 0 1 70%;
        overflow: auto;
            
    }
    .time-slot-item{
        /* overflow:hidden; */
        padding: 5px 40px;
        cursor: pointer;
        margin-bottom:5px;
    }
    /* slider组件样式修正 */
    ::v-deep .el-slider__stop{
        background: transparent;
    }
    ::v-deep .el-slider__marks-text{
        margin-top: 12px;
        white-space: nowrap;
    }
    /* v-loading组件样式修正 */
    ::v-deep .el-loading-mask{
        background-color:rgba(255, 255, 255, 0.4);
    }

    /* canvas元素相关样式 */
    .his-ecg-canvas{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
    }
    .his-ecg-canvas.grid-canvas{
        z-index: 1;
    }
    .his-ecg-canvas.wave-canvas{
        z-index: 2;
    }
    

    /* 分页提示信息块 */
    .pagination-warp{
        position: absolute;
        width: 400px;
        height: 40px;
        border-radius: 6px;
        top: 0;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
        z-index: 100;
    }
    .pagination-warp>.time-text,.pagination-warp>.progress-wrap{
        float: left;
    }
    .pagination-warp>.time-text{
        line-height: 40px;
        height: 40px;
        width: 60px;
        text-align: center;
        color: #fff;
    }
    .pagination-warp>.progress-wrap{
        width: 260px;
        height: 12px;
        margin:14px 5px;
        background: rgba(255,255,255,0.3);
        border-radius: 20px;
        position: relative;
    }
    .pagination-warp>.progress-wrap .progress-block{
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        background:rgba(80,120,255,0.65);
        border-radius: 20px;
    }
    .pagination-warp>.progress-wrap .progress-text{
        position: absolute;
        width: 100%;
        height: 100%;
        line-height: 1;
        top: 0;
        left: 0;
        text-align: center;
        color: #fff;
    }
</style>
<script>
import MonitorsCenterApi from '@/serviceApis/MonitorsCenter/MonitorsCenterApi.js' // api文件
export default {
    mixins:[MonitorsCenterApi],
    props:{
        emergencyId:{
            type:String,
            required:true
        }
    },
    data() {
        return {
            sideShow:true , // 信息栏展示状态
            // emergencyId:'', // 患者急救id，由路由参数传来
            dateSelected:null, // 日历中选中的日期(date实例)
            hasDataDate:[], // 有数据的日期
            hasDataTime:[], // 有数据的时间段
            // 将查询历史心电图数据模拟成分页形式
            pageOpt:{
                page:1, // 页码
                size:20, // 每次查询多少秒的数据
                pages:0, // 总共有多少页
                totalSeconds:0, // 总共有多少秒的数据
                startTime:"" ,// 起始时间，用户选择某“有历史数据的时间段”时，确定该值
                endTime:"" ,// 结束时间，用户选择某“有历史数据的时间段”时，确定该值(最终结束时间)
                noMoreFlag:false, // 无更多数据的标记
                maxShowSeconds:400,// 最多同时展示多少秒的数据（为了查询数据不卡，前端模拟了分页查询数据，但是渲染canvas实际是整个canvas不分页的，因此不能同时展示过多数据，增加客户端渲染压力）
            },
            drawWaveData:{} , // 绘制监护仪波形数据
            queryLoading:false, // 请求数据时的loading状态，因为数据可滚动条事件相关，可能连续触发，这里需要loading状态限制
            // 画布相关
            gridCanvas:null , // 绘制栅格的canvas元素
            waveCanvas:null , // 绘制波形的canvas元素
            nameCanvas:null , // 绘制波形名的canvas元素（拖动滚动条时，背景栅格和波形滚动，波形名不动，因此需要将绘制波形canvas独立出来）
            gridCtx:null , // 绘制栅格的canvas绘制环境
            waveCtx:null , // 绘制波形的canvas绘制环境
            nameCtx:null , // 绘制波形名的canvas绘制环境
            canvasH:150, // canvas元素的高度
            canvasW:300, // canvas元素的宽度
            rate:1, // 倍率
            maxWaveHeight:256, // 波高数值的最大值（宝莱特是256，其余不同常见的监护仪可能不同，需要动态判断修改）
            H:0, // 每个波在canvas上所占的空间高度
            stdPointPerWave:250, // 标准值，每秒多少个点（实际上每个波点数可能不同，需根据该标准值计算x方向的倍率，使绘制时点数不同的波绘制长度一样，密度不同）
            monitorType:'', // 监护仪类型 'blt'-宝莱特  'mindray'-迈瑞   'idottmed'-多特
            ecgPointPerWave:250, // 一般心电图每秒多少个点（不同牌子的监护仪可能不同）
            respPointPerWave:100, // 呼吸率波形每秒多少个点（不同牌子的监护仪可能不同）
            spo2PointPerWave:100, // 血氧饱和度波形每秒多少个点（不同牌子的监护仪可能不同）
            xRateEcg:0 ,// 普通心电图波形在x方向上的倍率（点密度） 不同品牌的监护仪不同的波，每秒的点数不同，根据点数与stdPointPerWave基准值计算得出该倍率
            xRateResp:0 , // 呼吸波形在x方向上的倍率
            xRateSpo2:0 , // 血氧饱和度在x方向上的倍率
            // 绘制配置
            padding:10, // canvas绘制内容上下边距
            waveNames:['V1','V2','V3','V4','V5','V6','I','II','III','AVF','AVL','AVR','Resp','Spo2'] , // 须绘制的波形名称，注意与数据name保持一致。
            waveNameDict:{ // 波形名和数据中的字段对应关系字典
                'V1':'ecgv1',
                'V2':'ecgv2',
                'V3':'ecgv3',
                'V4':'ecgv4',
                'V5':'ecgv5',
                'V6':'ecgv6',
                'I':'ecg1',
                'II':'ecg2',
                'III':'ecg3',
                'AVF':'ecgavf',
                'AVL':'ecgavl',
                'AVR':'ecgavr',
                'Resp':'respWaveData',
                'Spo2':'spo2WaveData'
            },
            backgroundColor:'#000', // 背景色
            gridStyle:{ // 栅格样式配置
                show:true, // 是否展示栅格
                lineWidth:0.5, // 线宽
                color:'#9df', // 栅格线条颜色
                opacity:0.6 , // 栅格线条透明度
                cell:10 , // 栅格单元格大小
            },
            waveStyle:{ // 波形样式配置
                lineWidth:1.5, // 线宽
                color:'#36f', // 线条颜色（波形颜色）
                opacity:1, // 线条透明度，波形透明度
            },
            nameStyle:{ // 波形名样式配置
                font:'italic normal 12px arial,sans-serif', // 字体设置
                color:'#fff', // 字体颜色
                cover:true, // 是否遮盖下层内容（如有栅格，且设置了cover，这波形名位置遮盖栅格线）
                width:50, // 占宽度
            },
        }
    },
    computed:{
        currentMonth(){ // 当前月份, yyyyMM
            if(!this.dateSelected){
                return '';
            }
            let Y = this.dateSelected.getFullYear() ;
            let M = this.dateSelected.getMonth()+1 ;
            M = M<10?'0'+M:M ;
            let month = ''+Y+M ;
            return month ;
        },
        currentDay(){ // 当前选中的日期，转变格式为yyyy-MM-dd
            if(!this.dateSelected){
                return '';
            }
            let Y = this.dateSelected.getFullYear() ;
            let M = this.dateSelected.getMonth()+1 ;
            let d = this.dateSelected.getDate() ;
            M = M<10?'0'+M:M ;
            d = d<10?'0'+d:d ;
            return ''+Y+"-"+M+"-"+d ;
        }
    },
    watch:{
        dateSelected(newVal,oldVal){
            if(this.hasDataDate.indexOf(this.currentDay)>=0){ // 当前日期是有数据的，前往查询时间段列表
                this.getTimesListInDay() ;
            }else{ // 当前日期无数据，清空时间段列表
                this.hasDataTime = [] ;
            }
        },
        currentMonth(){ // 当前月变化，则查询该月的存在历史数据的日期列表
            this.getDateListHasData() ;
        }
    },
    methods:{
        sliderInputHandle(timeRange,index){ // 某个时间段值改变的事件
            // 其他时间段滑块重置为起始位置
            for(let i=0;i<this.hasDataTime.length;i++){
                if(i!=index){
                    this.hasDataTime[i].currentSecond = [0,0] ;
                    this.hasDataTime[i].currentSecondCopy = [0,0] ;
                }
            }
        },
        sliderchangeHandle(timeRange,index){ // 时间段滑块拉动选择事件
            // 根据当前时间段滑块位置计算，防止滑块选中时间段超过最大可展示数据量
            let maxSeconds = this.pageOpt.maxShowSeconds ; // 最大可展示多少秒的数据，以此限制选中滑块的时间段，最大不超过该长度（单位秒）
            if(timeRange.currentSecond[0]===timeRange.currentSecondCopy[0]&&timeRange.currentSecond[1]!==timeRange.currentSecondCopy[1]){ // 起始相同，结束不同，说明拉的是后面的滑块,如果总长超过maxSeconds秒，就让前面的滑块跟着后面的滑块走
                if(timeRange.currentSecond[1]-timeRange.currentSecond[0]>maxSeconds){
                    timeRange.currentSecond = [timeRange.currentSecond[1]-maxSeconds,timeRange.currentSecond[1]]
                    timeRange.currentSecondCopy = [timeRange.currentSecond[1]-maxSeconds,timeRange.currentSecond[1]]
                }
            }else if(timeRange.currentSecond[0]!==timeRange.currentSecondCopy[0]&&timeRange.currentSecond[1]==timeRange.currentSecondCopy[1]){ //起始不同，结束相同，说明拉的是前面的滑块，如果总长超过maxSeconds秒，就让后面的滑块跟着前面的滑块走
                if(timeRange.currentSecond[1]-timeRange.currentSecond[0]>maxSeconds){
                    timeRange.currentSecond = [timeRange.currentSecond[0],timeRange.currentSecond[0]+maxSeconds]
                    timeRange.currentSecondCopy = [timeRange.currentSecond[0],timeRange.currentSecond[0]+maxSeconds]
                }
            }else{ // 起始和结束都不同，则可能发生了前后交换，或者某滑块跟着另一个走的情况
                if(timeRange.currentSecond[1]-timeRange.currentSecond[0]>maxSeconds){
                    timeRange.currentSecond = [timeRange.currentSecond[0],timeRange.currentSecond[0]+maxSeconds]
                    timeRange.currentSecondCopy = [timeRange.currentSecond[0],timeRange.currentSecond[0]+maxSeconds]
                }else{
                    timeRange.currentSecondCopy = JSON.parse(JSON.stringify(timeRange.currentSecond))
                }
            }

            // 根据当前时间段的值，设置分页相关参数，查询历史数据
            // 1.分页参数处理
            this.pageOpt.page = 1 ;
            this.pageOpt.totalSeconds = timeRange.currentSecond[1]-timeRange.currentSecond[0] ; // 总秒数
            let startTime = timeRange.firstReceiveTime ; // 时间段的起始时间
            startTime = new Date(startTime.slice(0,4),Number(startTime.slice(4,6))-1,startTime.slice(6,8),startTime.slice(8,10),startTime.slice(10,12),startTime.slice(12,14),(startTime.slice(14,17)?startTime.slice(14,17):0)) ; // 时间段起始时间转换为date对象
                // 则根据滑块选中的值，计算本次分页的起始时间和结束时间
            this.pageOpt.startTime = this.__madeDate2Time(new Date(new Date(startTime).setSeconds(startTime.getSeconds()+timeRange.currentSecond[0]))) ;
            this.pageOpt.endTime = this.__madeDate2Time(new Date(new Date(startTime).setSeconds(startTime.getSeconds()+timeRange.currentSecond[1]))) ;
            this.pageOpt.noMoreFlag = false ; // 无更多数据点标记重置为false
            // 计算分页数
            this.pageOpt.pages = Math.ceil(this.pageOpt.totalSeconds/this.pageOpt.size);
            // 2.每个时间段使用的监护仪品牌可能不同，须查询确认当前监护仪的一部分参数
            let equId = timeRange.equId ;
            if(equId){ // 调接口查询该设备详情，获取设备参数（获取每秒多少个点的参数值，计算x方向的倍率）
                this.monitorEquDetailById({id:equId}).then(res=>{
                    console.log('监护仪设备详情：',res)
                    if(res.data.success){
                        let deviceDetail = res.data.data ; // 监护仪详请
                        let ecgPointPerWave = deviceDetail.points||250 ; // 一般心电图每秒多少个点（不同牌子的监护仪可能不同）
                        let respPointPerWave = deviceDetail.pointsR||100 ; // 呼吸率波形每秒多少个点（不同牌子的监护仪可能不同）
                        let spo2PointPerWave = deviceDetail.pointsSo2||100 ; // 血氧饱和度波形每秒多少个点（不同牌子的监护仪可能不同）
                        this.monitorType = deviceDetail.monitorType || '' ;
                        this.ecgPointPerWave = ecgPointPerWave ;
                        this.respPointPerWave = respPointPerWave ;
                        this.spo2PointPerWave = spo2PointPerWave ;
                        this.xRateEcg = this.stdPointPerWave/ecgPointPerWave ;
                        this.xRateResp = this.stdPointPerWave/respPointPerWave ;
                        this.xRateSpo2 = this.stdPointPerWave/spo2PointPerWave ;
                    }else{
                        // 查询失败，抛出错误，按照默认的250 100 100 来绘制波形
                        console.error('查询监护仪设备参数错误，采用默认值进行计算绘制')
                        // 由于每个波的每秒的点的数量可能不同，则绘制的点的密度可能不同，根据点数计算点密度倍率xRate
                        this.monitorType = '' ;
                        this.ecgPointPerWave = 250 ;
                        this.respPointPerWave = 100 ;
                        this.spo2PointPerWave = 100 ;
                        this.xRateEcg = this.stdPointPerWave/250 ;
                        this.xRateResp = this.stdPointPerWave/100 ;
                        this.xRateSpo2 = this.stdPointPerWave/100 ;
                    }
                    // 清除旧数据
                    for(let name in this.drawWaveData){
                        this.drawWaveData[name].list = [] ;
                    }

                    // 查询新数据
                    this.getHistoryMonitorData() ;
                })
            }
        },
        beforeSideHide(done){ // 侧边操作栏隐藏前回调
            done()
        },
        init(){ // 初始化页面状态
            let date = new Date() ;
            this.dateSelected = date ; // 日历初始显示当前月份，默认选中当前日期

            this.$nextTick(()=>{
                this.initCanvas() ; // 初始化画布
            })
        },
        getDateListHasData(){ // 获取含有监护仪数据的日期（传入月份，查该月的日期，日历回显）
            if(!this.emergencyId){
                return false ;
            }
            let params = {
                date:this.currentMonth,
                emergencyId:this.emergencyId
            }
            this.selectHistoryDataListByMonth(params).then(res=>{
                console.log('查询日期数据：',res)
                if(res.data.success){
                    let data = res.data.data ||[] ;
                    // 数据格式处理（源数据是yyyyMMdd）
                    let result = data.map(item=>{
                        return item.slice(0,4)+"-"+item.slice(4,6)+'-'+item.slice(6,8)
                    })
                    this.hasDataDate = result ; 

                    // 判断当前选中的日期是否有数据
                    if(this.hasDataDate.indexOf(this.currentDay)>=0){
                        // 有数据，查询
                        this.getTimesListInDay() ;
                    }else{// 否则。当前日期没有时间段数据，清空时间段列表
                        this.hasDataTime = [] ;
                    }
                }else{
                    this.$Message.error(res.data.msg||"查询日期数据错误")
                }
            })
        },
        getTimesListInDay(){ // 获取一天中的有历史心电图数据的时间段
            if(!this.currentDay||!this.emergencyId){
                return false ;
            }
            let params = {
                firstReceiveTime:this.currentDay.replace(/\-/g,''),
                emergencyInfoNo:this.emergencyId,
                page:1,
                size:9999
            }
            this.monitorUserRecordPage(params).then(res=>{
                console.log('查询时间段列表：',res.data);
                if(res.data.success){
                    let data = res.data.data ;
                    let list = data&&data.records?data.records:[] ;
                    // 计算时间段的时长
                    let result = list.map((item,index)=>{
                        let start = item.firstReceiveTime.substr(0,14) ;// 数据精确到毫秒，这里只取到秒
                        let end = item.lastReceiveTime.substr(0,14) ;// 数据精确到毫秒，这里只取到秒
                        item.firstReceiveTime = item.firstReceiveTime.replace(/\d{3}$/,'000')
                        item.lastReceiveTime = item.firstReceiveTime.replace(/\d{3}$/,'999')
                        // 开始结束时间展示值
                        let startLabel = start?start.slice(8,10)+':'+start.slice(10,12)+':'+start.slice(12,14):"" ; 
                        let endLabel = end?end.slice(8,10)+':'+end.slice(10,12)+':'+end.slice(12,14):"" ; 
                        
                        // 将毫秒数处理成分秒字符串
                        let duration = item.timeInterval ; // 总秒数
                        // 转换时分秒字符串
                        let h = Math.floor(duration/3600) ; // 时
                        duration = duration%3600 ;
                        let m = Math.floor(duration/60) ; // 分
                        let s = duration%60 ; // 秒
                        m = m<10?'0'+m:m ;
                        s = s<10?'0'+s:s ;
                        if(duration){
                            if(h){
                                item.timeDuration = h+':'+ m+'’'+s+'’’' ;
                            }else{
                                item.timeDuration = m+'’'+s+'’’' ;
                            }
                        }else{
                            item.timeDuration = "" ; 
                        }
                        item.currentSecond = [0,0] ; // 当前选中的第几秒，默认都是0（slider滑块初始位置） 
                        item.currentSecondCopy = [0,0] ; // 当前选中的范围复制，用以参考比较
                        item.marks = { // slider的端点配置
                            0:startLabel, // 开始端点，展示开始时间
                            [item.timeInterval/2]:{ // 中间，展示时长，设置样式
                                    style: {
                                    color: '#1989FA'
                                    },
                                    label: this.$createElement('strong', item.timeDuration)
                                },
                            [item.timeInterval]:endLabel, // 末尾端点，展示结束时间
                        }
                        return item
                    })
                    // console.log('处理后的结果',result)
                    // 将处理后，时间段长度为0的无效时间段清除（开始时间和结束时间在同一秒）
                    result = result.filter(item=>Boolean(item.timeDuration))
                    this.hasDataTime = result ;
                }else{
                    this.$Message.error(res.data.msg||"查询时间列表错误")
                }
            })
        },
        getHistoryMonitorData(){ // 获取监护仪数据
            if(this.pageOpt.noMoreFlag){ // 已无更多数据，不查数据
                return false ;
            }
            if(!this.emergencyId){ // 无必要参数不查数据
                return false ;
            }
            if(this.queryLoading){ // 已经发起了请求，不可重复请求同一页数据，return
                return false ; 
            }
            this.queryLoading = true ;
            let params = {
                emergencyId:this.emergencyId,
                startTime:'', // yyyyMMddHHmmss
                endTime:'', // yyyyMMddHHmmss
            }
            // 将开始/结束时间模拟分页，进行分页计算和时间段的判断
            let start = this.__madeTime2Date(this.pageOpt.startTime) ; // 开始时间处理成date对象
            let end = this.__madeTime2Date(this.pageOpt.endTime) ; // 结束时间
        
            let currentStart = null ; // 本次查询的开始时间Date对象
            let currentEnd = null ; // 本次查询的结束时间Date对象
            // 则本次开始时间
            if(start){
                currentStart = new Date(new Date(start).setSeconds(new Date(start).getSeconds()+(this.pageOpt.page-1)*this.pageOpt.size)); // 根据页码，秒数递增size秒
                currentEnd = new Date(new Date(start).setSeconds(new Date(start).getSeconds()+(this.pageOpt.page)*this.pageOpt.size)); // 根据页码，秒数递增size秒
            }
            if(end&&currentEnd&&currentEnd>=end){ // 计算到的分页结束时间大于时间段的结束时间，则以时间段的结束时间为准，且说明已无更多数据（到达时间段的结束边界）
                currentEnd = end ;
                this.pageOpt.noMoreFlag = true ;
            }
            // 则查询参数的时间：
            params.startTime = this.__madeDate2Time(currentStart);
            params.endTime = this.__madeDate2Time(currentEnd);
            if(!params.startTime||!params.endTime){ // 处理得到的开始时间和结束时间为空，则时间有问题。
                console.error('参数计算错误，请检查！');
                return false ;
            }
            this.selectHistoryMonitorByEmergencyId(params).then(res=>{
                console.log('获取历史心电数据：',res);
                this.queryLoading = false ;
                if(res.data.success){
                    let data = res.data.data || []; // 得到历史心电图数据（数组）
                    // 预处理数据
                    this.waveNames.forEach(name=>{
                        let dataKey = this.waveNameDict[name] ; // 该波形名对应数据中的key字段
                        if(dataKey == "respWaveData"){ // 呼吸波形
                            this.drawWaveData[name].xRate = this.xRateResp ; // 每个波每秒的点数可能不同，即x方向上的倍率（点密度）不同，每个波单独维护
                        }else if(dataKey == "spo2WaveData"){ // 血氧饱和度波形
                            this.drawWaveData[name].xRate = this.xRateSpo2 ; // 每个波每秒的点数可能不同，即x方向上的倍率（点密度）不同，每个波单独维护
                        }else{ // 其他ecg心电图
                            this.drawWaveData[name].xRate = this.xRateEcg ; // 每个波每秒的点数可能不同，即x方向上的倍率（点密度）不同，每个波单独维护
                        }
                        
                        let time = this.__madeTime2Date(params.startTime.slice(0,14)) ; // 判断时间，用来判断数据的连续性，初始就是查数据的参数开始时间(精确到秒)
                        data.forEach((dataItem,i)=>{
                            // 判断时间连续性，和补齐缺失的时间的数据
                            let receiveTime = this.__madeTime2Date(dataItem.receiveTime) ;// 该条数据的接收时间(精确到秒)
                            let second = Math.floor((receiveTime.getTime()-time.getTime())/1000) ; // 相差的秒数
                            if(this.pageOpt.page==1&&i==0){ // 第一页的第一条数据，则接收时间必须与请求的开始时间一致。否则视为不连续
                                if(second!=0){
                                    // 相差多少秒，就补多少秒的数据
                                    let count = 0 ; // 需要补充的点的数量
                                    if(dataKey == "respWaveData"){ // 呼吸波形
                                        count = second*this.respPointPerWave
                                    }else if(dataKey == "spo2WaveData"){ // 血氧饱和度波形
                                        count = second*this.spo2PointPerWave
                                    }else{ // 其他ecg心电图
                                        count = second*this.ecgPointPerWave
                                    }
                                    if(count){
                                        let arr = [] ;
                                        for(let n=0;n<count;n++){
                                            arr.push('')
                                        }
                                        this.drawWaveData[name].list = this.drawWaveData[name].list.concat(arr)
                                    } 
                                }
                            }else{ // 不是第一条数据，往后的数据只有相差达到2秒以上，才算是不连续，需要补空数据
                                if(second>=2){ // 不连续
                                    let count = 0 ; // 需要补充的点的数量
                                    if(dataKey == "respWaveData"){ // 呼吸波形
                                        count = (second-1)*this.respPointPerWave
                                    }else if(dataKey == "spo2WaveData"){ // 血氧饱和度波形
                                        count = (second-1)*this.spo2PointPerWave
                                    }else{ // 其他ecg心电图
                                        count = (second-1)*this.ecgPointPerWave
                                    }
                                    if(count){
                                        let arr = [] ;
                                        for(let n=0;n<count;n++){
                                            arr.push('')
                                        }
                                        this.drawWaveData[name].list = this.drawWaveData[name].list.concat(arr)
                                    } 
                                }
                            }
                            time = receiveTime ; // 更新参考值

                            // 当前时间的数据，部分波形可能缺数据，判断并补齐
                            let ecg1 = dataItem?JSON.parse(dataItem.ecg1):[] ; // ecg1波形数据,部分波形没数据的，以ecg1波形数据长度为标准，插入空值
                            let len = ecg1.length||0 ; 
                            let empCount = 0 ; // 需补齐数据的量
                            if(len==0){ // 如果连ecg1也没有数据，这是一个全为空的数据，ecg1也要补空，其他所有空波形都要补齐空位
                                if(this.monitorType&&this.monitorType=='blt'){ //monitorType：监护仪类型 'blt'-宝莱特  'mindray'-迈瑞  'idottmed'-多特
                                    // 宝莱特每秒发送2次数据，即每次约每秒数据量的一半
                                    if(dataKey=='respWaveData'){
                                        empCount = Math.floor(this.respPointPerWave/2) ;
                                    }else if(dataKey == "spo2WaveData"){
                                        empCount = Math.floor(this.spo2PointPerWave/2) ;
                                    }else{
                                        empCount = Math.floor(this.ecgPointPerWave/2) ;
                                    }
                                }else{
                                    // 其他监护仪，每秒发送一次数据，即每次就是一秒的数据量
                                    if(dataKey=='respWaveData'){
                                        empCount = this.respPointPerWave ;
                                    }else if(dataKey == "spo2WaveData"){
                                        empCount = this.spo2PointPerWave ;
                                    }else{
                                        empCount = this.ecgPointPerWave ;
                                    }
                                }
                                let wave = JSON.parse(dataItem[dataKey]) || [];
                                if(wave.length===0){ // 假如该波没数据，插入一定数量的空值占位
                                    for(let i=0;i<empCount;i++){
                                        wave.push('')
                                    }
                                }
                                this.drawWaveData[name].list = this.drawWaveData[name].list.concat(wave);
                            }else{ // ecg1有数据，则以ecg1的数据量为依据，给其他空波形补齐数据(ecg1有数据，则血氧/呼吸这两个特殊波也会有数据，不需补数据，其他波形为空需要补数据的，数据密度与ecg1一致，不需要考虑其他)
                                let wave = JSON.parse(dataItem[dataKey]) || [];
                                if(wave.length===0){ // 假如该波没数据，插入一定数量的空值占位
                                    for(let i=0;i<len;i++){
                                        wave.push('')
                                    }
                                }
                                this.drawWaveData[name].list = this.drawWaveData[name].list.concat(wave);
                            }
                        })
                    })

                    console.log('可绘制波形数据：',this.drawWaveData)
                    // 监护仪数据更新后，重新根据数据量确定canvas宽度，执行canvas初始化
                    this.initCanvas() ;
                }else{
                    this.$Message.error(res.data.msg||"查询监护仪历史数据错误")
                }
            }).catch((err)=>{
                this.queryLoading = false ;
            })
        },
        
        initCanvas(){ // 初始化画布
            let wrapEl = this.$refs['his-ecg-wrap'] ;
            this.gridCanvas = this.$refs['grid-canvas'] ;
            this.waveCanvas = this.$refs['wave-canvas'] ;
            this.nameCanvas = this.$refs['name-canvas'] ;
            let boundingClientRect = wrapEl?wrapEl.getBoundingClientRect():null ;
            let wrapW = boundingClientRect?boundingClientRect.width:0 ; // 外层容器宽度
            let wrapH = boundingClientRect?boundingClientRect.height:0 ; // 外层容器高度
            this.canvasH = wrapH ; // canvas高度等于容器高度
            // 计算波高、倍率等
            this.H = Math.floor((this.canvasH-2*this.padding)/this.waveNames.length) ; // 每个波占得canvas空间高度
            this.rate = Math.floor((this.H/this.maxWaveHeight)*100)/100 ; // 倍率,最多2位小数
            // canvas宽度根据数据量来计算，动态改变
            // 
            if(this.drawWaveData&&this.drawWaveData[this.waveNames[0]]&&this.drawWaveData[this.waveNames[0]].list.length&&this.drawWaveData[this.waveNames[0]].xRate){
                let waveData = this.drawWaveData[this.waveNames[0]] ; // 第一个波的数据
                // 根据该波的数据量和x倍率，计算需要占用的canvas宽度
                let w = Math.floor(waveData.list.length*this.rate*waveData.xRate+this.nameStyle.width)+10 ; // 计算得到的数据需要的绘制宽度(考虑波形名称占位宽度)，最后再多出10px空间留白
                
                if(wrapW&&w<=wrapW){
                    // 如果计算的数据宽度还没有容器宽度多，则仍然使用容器宽度作为canvas宽度， 且发起请求，查下一页数据（使数据宽度多于容器宽度，canvas至少铺满整个容器）
                    this.canvasW = wrapW ;
                    if(!this.pageOpt.noMoreFlag){ // 如果还有下一页
                        this.pageOpt.page++
                        this.getHistoryMonitorData()
                    }
                }else{
                    this.canvasW = w ;
                }
                
            }else{ // 否则，还没有波形数据，无需计算，直接根据容器元素的宽度来设置canvas宽度
                this.canvasW = wrapW ;
            }

            this.$nextTick(()=>{
                if(this.gridCanvas&&this.gridCanvas.getContext){
                    this.gridCtx = this.gridCanvas.getContext('2d') ; // 绘制栅格的canvas绘制环境
                    this.waveCtx = this.waveCanvas.getContext('2d') ; // 绘制波形的canvas绘制环境
                    this.nameCtx = this.nameCanvas.getContext('2d') ; // 绘制波形名的canvas绘制环境
                }else{
                    console.error('您的浏览器不支持canvas，请使用谷歌浏览器访问本页面')
                    this.$Message.error('您的浏览器不支持canvas，请使用谷歌浏览器访问本页面')
                }

                this.drawGrid()
                this.drawWave()
            })
        },
        drawGrid(){ // 绘制栅格背景等
            if(this.gridCtx){
                // 先清除栅格canvas的一切内容
                this.gridCtx.clearRect(0,0,this.canvasW,this.canvasH); // 栅格canvas清除
                this.nameCtx.clearRect(0,0,this.nameCanvas.width,this.nameCanvas.height); // 波形名canvas清除
                // 绘制背景色
                if(this.backgroundColor&&this.backgroundColor!='transparent'){
                    this.gridCtx.save() ;
                    this.gridCtx.fillStyle = this.backgroundColor ;
                    this.gridCtx.fillRect(0,0,this.canvasW,this.canvasH);
                    this.gridCtx.restore() ;
                }
                // 绘制栅格
                if(this.gridStyle.show){
                    this.gridCtx.save() ;
                    this.gridCtx.lineWidth = Number(this.gridStyle.lineWidth) ;
                    this.gridCtx.strokeStyle = this.__updateAlpha(this.gridStyle.color,this.gridStyle.opacity) ;
                    this.gridCtx.translate(0.5,0.5); // 偏移0.5px，防止canvas线条模糊
                    // 横线
                    let y = 0 ;
                    this.gridCtx.beginPath() ;
                    while(y<=this.canvasH){
                        this.gridCtx.moveTo(0,y);
                        this.gridCtx.lineTo(this.canvasW,y);
                        y+=this.gridStyle.cell ;
                    }
                    // 竖线
                    let x = 0 ;
                    while(x<=this.canvasW){
                        this.gridCtx.moveTo(x,0);
                        this.gridCtx.lineTo(x,this.canvasH);
                        x+=this.gridStyle.cell ;
                    }
                    this.gridCtx.stroke();
                    this.gridCtx.restore() ;
                }
            }
            // 绘制波形名
            if(this.nameCtx){
                // 绘制波形名
                this.nameCtx.save() ;
                if(this.nameStyle.cover&&this.backgroundColor!='transparent'){ // 波形名遮盖
                    let linearGradient = this.nameCtx.createLinearGradient(0,0,this.nameStyle.width*2,0);
                    linearGradient.addColorStop(0,this.backgroundColor);
                    linearGradient.addColorStop(1,this.__updateAlpha(this.backgroundColor,0));
                    this.nameCtx.fillStyle = linearGradient ;
                    this.nameCtx.fillRect(0,0,this.nameStyle.width*2,this.nameCanvas.height);
                }
                this.nameCtx.textAlign = "center";// 文字水平对齐方式
                this.nameCtx.textBaseline = "middle";// 文字垂直对齐方式
                this.nameCtx.font = this.nameStyle.font ; // 字体样式（大小，字体类型等）
                this.nameCtx.fillStyle = this.nameStyle.color ; // 字体颜色设置
                let labels = this.waveNames ; // 需要绘制的波形名label（array）
                let h = (this.canvasH-2*this.padding)/labels.length ;// canvas高度/波形数量=每个波形所占高度
                labels.forEach((name,index)=>{
                    this.nameCtx.fillText(name,this.nameStyle.width/2,index*this.H+this.H/2+this.padding) ;
                    // 根据波形名，在这里初始化每个波的绘制数据，以波形名为key保存到数据中
                    if(!this.drawWaveData[name]){
                        this.$set(this.drawWaveData,name,{list:[],xRate:0})
                    }
                })
                this.nameCtx.restore() ; // canvas状态重置
            }
        },
        drawWave(){ // 绘制波形
            console.time('绘制耗时')
            if(this.waveCtx){
                let names = this.waveNames ; // 规定要展示的波
                this.waveCtx.clearRect(0,0,this.canvasW,this.canvasH);
                // 绘制每一帧的所有波
                names.forEach((name,index)=>{
                    let waveData = this.drawWaveData[name]; // 须绘制的波的数据对象
                    let list = waveData.list ; // 波的点集合
                    let xRate = waveData.xRate ; // 波的点间隔疏密倍率
                    // 绘制这些点
                    this.waveCtx.save() ;
                    this.waveCtx.lineWidth = this.waveStyle.lineWidth ;
                    this.waveCtx.strokeStyle = this.__updateAlpha(this.waveStyle.color,this.waveStyle.opacity) ;
                    this.waveCtx.beginPath()
                    for(let i=0;i<=list.length;i++){
                        if(list[i]){ // 有效点数据
                            if(list[i-1]){ // 上一个点也有效（即本点不是第一个有效点，不是一段折线的起点）
                                this.waveCtx.lineTo( i*this.rate*xRate+this.nameStyle.width,(this.H-list[i]*this.rate)+(index*this.H)+this.padding)
                            }else{ // 上一个点不是有效点，则本次为本段的起点
                                this.waveCtx.moveTo( i*this.rate*xRate+this.nameStyle.width,(this.H-list[i]*this.rate)+(index*this.H)+this.padding)
                            }
                        }
                    }
                    this.waveCtx.stroke();
                    this.waveCtx.restore();
                })
            }
            console.timeEnd('绘制耗时')
        },


        __resizeHandle(){
            this.initCanvas();
            this.$nextTick(()=>{
                this.drawGrid() ; // 绘制栅格等
            })
        },
        __bindScrollHandle(e){ // 绑定滚动条事件，通过滚动条，自动查询下一页数据
            // emergencyId
            if(!this.emergencyId){ // 无急救id，则说明未选中时间段，不需要查询数据
                return false ;
            }
            if(!this.pageOpt.startTime||!this.pageOpt.endTime||this.pageOpt.noMoreFlag){ // 当前选中的时间段没有开始/结束时间（说明未选中时间段，无法查找数据），或者noMoreFlag标记物更多数据，无法查找数据
                return false ;
            }
            // 否则，判断滚动条位置，判断是否触发查找下一页数据
            let wrapEl = e.target ; // 容器元素，触发滚动的元素
            let boundingClientRect = wrapEl?wrapEl.getBoundingClientRect():null ;
            let wrapW = boundingClientRect?boundingClientRect.width:0 ; // 容器宽度
            let scrollWidth = wrapEl.scrollWidth ; // 滚动条总宽度
            let scrollLeft = wrapEl.scrollLeft ; // 左侧卷去的宽度
            // 则滚动条右侧剩余的宽度
            let scrollRight = scrollWidth - wrapW - scrollLeft ;
            
            let halfPageW = this.pageOpt.size*this.stdPointPerWave*this.rate*0.5 ; // 半页的宽度
            // console.log('halfPageW:',halfPageW)
            if(scrollRight<=halfPageW){ // 滚动条右侧剩余量少于半页的空间了，则开始请求下一页数据
                if(!this.pageOpt.noMoreFlag&&!this.queryLoading){
                    this.pageOpt.page++ ;
                    this.getHistoryMonitorData() ;
                }
            }
        },
        __madeTime2Date(timestrap){ // 将yyyyMMddhhmmSSsss精确到毫秒的时间戳，处理成date对象返回
            if(!timestrap){
                return null ;
            }
            let y = Number(timestrap.slice(0,4)) ; // 年
            let M = Number(timestrap.slice(4,6))-1 ; // 月
            let d = Number(timestrap.slice(6,8)) ; // 日
            let h = Number(timestrap.slice(8,10)) ; // 时
            let m = Number(timestrap.slice(10,12)) ; // 分
            let S = Number(timestrap.slice(12,14)) ; // 秒
            let s = Number(timestrap.slice(14,17))||0 ; // 毫秒
            let date = new Date(y,M,d,h,m,S,s) ;
            if(!date.getTime()&&date.getTime!==0){
                return null ;
            }else{
                return date ;
            }
        },
        __madeDate2Time(date){ // 将date对象处理成yyyyMMddhhmmSSsss精确到毫秒的时间戳，返回字符串
            if(date&&date.getTime()){
                let y = date.getFullYear() ;
                let M = date.getMonth() + 1 ;
                let d = date.getDate() ;
                let h = date.getHours() ;
                let m = date.getMinutes() ;
                let S = date.getSeconds() ;
                let s = date.getMilliseconds() ;
                M = M<10?'0'+M:M ;
                d = d<10?'0'+d:d ;
                h = h<10?'0'+h:h ;
                m = m<10?'0'+m:m ;
                S = S<10?'0'+S:S ;
                s = (s+1000).toString().slice(1) ; // 不足3位的，补足3位，字符串
                return ''+y+M+d+h+m+S+s ;
            }else{
                return '' ;
            }
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
    filters:{
        timeFormatFilter(val){
            if(!val){
                return '' ;
            }
            // return val.slice(0,4)+'-'+val.slice(4,6)+'-'+val.slice(6,8)+' '+val.slice(8,10)+':'+val.slice(10,12)+':'+val.slice(12,14) ;
            return val.slice(8,10)+':'+val.slice(10,12)+':'+val.slice(12,14) ;
        }
    },
    mounted(){
        this.init() ;
        this.$nextTick(()=>{
            window.addEventListener('resize',this.__resizeHandle,false);
            // 容器元素绑定滚动事件，通过滚动条事件判断翻页查找更多历史心电图数据
            let wrap = this.$refs['his-ecg-wrap'] ; // 容器元素
            if(wrap){
                wrap.addEventListener('scroll',this.__bindScrollHandle,false)
            }
        })
    },
    beforeDestroy(){
        window.removeEventListener('resize',this.__resizeHandle);
        // 解除容器元素的滚动条事件监听
        let wrap = this.$refs['his-ecg-wrap'] ; // 容器元素
        if(wrap){
            wrap.removeEventListener('scroll',this.__bindScrollHandle)
        }
    }
}
</script>
