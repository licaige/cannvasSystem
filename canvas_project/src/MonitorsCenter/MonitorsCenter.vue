<template>
    <!-- 心电监护中心 -->
    <div class="monitors-center-el">
        <div class="main-content-el">
            <div class="title-wrap">
                <h1 class='main-title'>{{userInfo?userInfo.cropName+"体征监护中心":""}}</h1>
            </div>
            <div class="content-wrap">
                <div class="content-row">
                    <div class="content-col">
                        <MonitorRealtime ref="monitor_channel_1" key='monitor_channel_1' :option="monitorOpt" :channel='1' @powerOnComplete='powerOnCompleteHandle' @powerOffDone="powerOffDoneHandle"></MonitorRealtime>
                    </div>
                    <div class="content-col">
                        <MonitorRealtime ref="monitor_channel_2" key='monitor_channel_2' :option="monitorOpt" :channel='2' @powerOnComplete='powerOnCompleteHandle' @powerOffDone="powerOffDoneHandle"></MonitorRealtime>
                    </div>
                </div>
                <div class="content-row">
                    <div class="content-col">
                        <MonitorRealtime ref="monitor_channel_3" key='monitor_channel_3' :option="monitorOpt" :channel='3' @powerOnComplete='powerOnCompleteHandle' @powerOffDone="powerOffDoneHandle"></MonitorRealtime>
                    </div>
                    <div class="content-col">
                        <MonitorRealtime ref="monitor_channel_4" key='monitor_channel_4' :option="monitorOpt" :channel='4' @powerOnComplete='powerOnCompleteHandle' @powerOffDone="powerOffDoneHandle"></MonitorRealtime>
                    </div>
                </div>
                <div class="content-row">
                    <div class="content-col">
                        <MonitorRealtime ref="monitor_channel_5" key='monitor_channel_5' :option="monitorOpt" :channel='5' @powerOnComplete='powerOnCompleteHandle' @powerOffDone="powerOffDoneHandle"></MonitorRealtime>
                    </div>
                    <div class="content-col">
                        <MonitorRealtime ref="monitor_channel_6" key='monitor_channel_6' :option="monitorOpt" :channel='6' @powerOnComplete='powerOnCompleteHandle' @powerOffDone="powerOffDoneHandle"></MonitorRealtime>
                    </div>
                </div>
                <div class="content-row">
                    <div class="content-col">
                        <MonitorRealtime ref="monitor_channel_7" key='monitor_channel_7' :option="monitorOpt" :channel='7' @powerOnComplete='powerOnCompleteHandle' @powerOffDone="powerOffDoneHandle"></MonitorRealtime>
                    </div>
                    <div class="content-col">
                        <MonitorRealtime ref="monitor_channel_8" key='monitor_channel_8' :option="monitorOpt" :channel='8' @powerOnComplete='powerOnCompleteHandle' @powerOffDone="powerOffDoneHandle"></MonitorRealtime>
                    </div>
                </div>
            </div>
        </div>
        <div class="side-show-btn" @click="sideShow = !sideShow" v-show="!sideShow">
            <i :class="{'icon':true,'el-icon-arrow-left':sideShow,'el-icon-arrow-right':!sideShow}"></i>
        </div>
        <el-drawer
            title="患者列表"
            :visible.sync="sideShow"
            direction="ltr"
            :modal='false'
            size='300px'
            :before-close="beforeSideHide">
            <div slot='title' class='side-list-title'>
                <span class='title-text'>患者列表</span>
                <el-button class='refresh-btn' size='mini' type="success" round icon="el-icon-refresh-right" title="刷新" @click="getPatientsBindingList">刷新</el-button>
            </div>
            <div class="side-content-wrap">
                <ul class='patient-list-el'>
                    <li class='patient-item-el' v-for="patient in patientList" :key='"patient_"+patient.id'>
                        <p class='info-row'>
                            <label class='patient-info-label'>姓名</label>
                            <span class='patient-info-text'>{{patient.patientName||"--"}}</span>
                            <span class='channel-show'>
                                <span class='channel-text' v-show="Boolean(patient.channel)">通道{{patient.channel||"--"}}</span>
                                <el-switch class='channel-state-switch' :width='36' v-model="patient.isShowing" active-color="#67C23A" inactive-color="#cccccc" @change="patientMonitorChange(patient)"></el-switch>
                            </span>
                        </p>
                        <p class='info-row'>
                            <label class='patient-info-label'>绑定监护仪</label>
                            <span class='patient-info-text'>{{patient.monitorType|monitorTypeFilter}} {{patient.monitorModel}}</span>
                        </p>
                        <p class='info-row'>
                            <label class='patient-info-label'>监护仪编号</label>
                            <span class='patient-info-text'>{{patient.machineCode||"--"}}</span>
                            <span class='channel-show'>
                                <span class='channel-text' :class="{success:patient.running=='1',error:patient.running=='0'}">{{patient.running=='1'?'运行中':patient.running=='0'?'关闭':''}}</span>
                            </span>
                        </p>
                    </li>
                </ul>
                <div class="pagination-wrap">
                    <el-pagination small layout="prev, pager, next" :total="pagination.total" @current-change='pageChangeHandle' @size-change='sizeChangeHandle'></el-pagination>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<style scoped>
    .monitors-center-el{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0!important;
    }
    .main-content-el{
        display:flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        background: #fff;
    }
    .title-wrap{
        width: 100%;
        flex: 0 0 auto;
        background: #333;
    }
    .main-title{
        box-sizing: border-box;
        height: 56px;
        text-align: center;
        padding: 10px 0;
        color: #fff;
    }
    .content-wrap{
        width: 100%;
        flex:1 1 auto ;
        display: flex;
        flex-direction: column;
    }
    .content-row{
        width: 100%;
        flex: 1 1 25%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .content-col{
        flex: 1 1 50%;
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
    ::v-deep .el-drawer__header{
        margin-bottom: 20px;
        font-size: 16px;
    }
    .refresh-btn{
        float: right;
        margin-right: 30px;
    }
    .side-content-wrap{
        position: relative;
        box-sizing: border-box;
        background: #f5f5f7;
        width: 100%;
        height: 100%;
        overflow:hidden;
    }
    .patient-list-el{
        box-sizing: border-box;
        height: 94%;
        width: 100%;
        overflow: auto;
        padding: 20px 15px;
    }
    .pagination-wrap{
        position: absolute;
        bottom:0;
        left: 0;
        box-sizing: border-box;
        width: 100%;
        height: 6%;
        padding: 1px 0 0 0;
        background: #fff;
        text-align: center;
    }
    .patient-item-el{
        padding: 10px 15px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 0 12px rgba(0,0,0,0.1);
        margin-bottom: 10px;
    }
    .patient-item-el .info-row{
        font-size: 12px;
        line-height: 22px;
    }
    .patient-info-label{
        color: #888;
    }
    .patient-info-text{
        color: #666;
        margin-left: 8px;
    }
    .patient-item-el .channel-show{
        width: 80px;
        float: right;
    }
    .patient-item-el .channel-text{
        display: block;
        float: left;
        width: 44px;
        color: #666;
        text-align: left;
    }
    .patient-item-el .channel-state-switch{
        float: right;
    }
    .patient-item-el .channel-text.success{
        color: #67C23A;
    }
    .patient-item-el .channel-text.error{
        color: #F56C6C;
    }
</style>
<script>
import MonitorRealtime from "./MonitorRealtime.vue" // 简版心电展示组件
import MonitorsCenterApi from "@/serviceApis/MonitorsCenter/MonitorsCenterApi.js"; // 心电监护中心api
import SystemApi from "@/serviceApis/systemApi.js"; // 系统api
export default {
    components:{MonitorRealtime},
    mixins:[MonitorsCenterApi,SystemApi],
    data(){
        return {
            userInfo:null, // 当前登录用户
            // 调试统计数据的字段 start *******
            t:0,
            c:0,
            c120:0,
            c125:0,
            else:0,
            // 调试统计数据的字段 end *******
            sideShow:false, // 侧边操作栏展示状态
            monitorOpt:{ // 心电展示组件配置
                waveNames:['I','II','Resp','SPo2'], // 需要展示的波形名,需与数据中的波形name对应，否则无法展示波形,必须传入
                showWaveOnly:false, // 只展示波形区，不展示右侧生命体征信息区,默认true
                showPowerBtn:true, // 是否展示电源按钮，默认true展示
                style:{ // 配置基本样式，背景色、边框、宽高等
                    backgroundColor:"#000", // 配置组件背景色（默认#333）
                    // border:"1px solid #aaa", // 配置组件边框样式，与css写法格式一致，默认为"none"(无边框),用来单独设置组件整体的边框
                    grid:{ // 生命体征信息区栅格样式,showWaveOnly=true只展示波形区时，该信息区不展示，该配置无意义，仅当showWaveOnly=false时该配置有效
                        lineWidth:1,
                        color:'rgba(240,240,240,0.4)',
                        opacity:0.5,
                        type:'solid' // 默认"solid"
                    }
                },
                waves:{ // 示波区配置
                    grid:{ // 波形区栅格（canvas内部的栅格）样式配置
                        show:true, // 是否展示栅格线
                        lineWidth:0.5, // 栅格线宽度（px）
                        color:'#9df', // 栅格线颜色
                        opacity:0.3, // 栅格线透明度alpha值（0-1之间）
                        cell:12 // 栅格单元格大小(px值，数字)
                    },
                    wave:{ // 整体设置线宽、颜色等，如果传入的数据中单独对某个波形进行设置，则以数据中的配置优先级较高；数据中的配置见数据传递pushData方法说明
                        lineWidth:1, // 波形线宽
                        color:'#eee' // 波形颜色
                    },
                    nameStyle:{ // 波形名
                        font:'italic normal 10px arial,sans-serif', // 字体设置
                        color:'#fff', // 字体颜色
                        cover:true, // 是否遮盖下层内容（如有栅格，且设置了cover，这波形名位置遮盖栅格线）
                        width:40, // 波形名占宽度
                    },
                    splitLine:{ // 波形之间的分隔线（可将canvas按照波形数量分隔成N块，默认不展示）
                        show:false,
                        lineWidth:2,
                        color:'#fff',
                        style:'solid'
                    }
                },
            },
            receiveTime:'' , // 查询数据时，得到的数据的receivTime.用来判断数据的接收时间，判断下次查询的数据开始时间

            pagination:{ // 已绑定监护仪患者列表的分页参数
                page:1,
                size:10,
                total:0
            },
            patientList:[],

            channel1:{ // 通道1的状态
                isOn:false, // 该监护仪是否开启
                monitor:null, // 监护仪实例（MonitorSimple组件）
                patient:null, // 当前正在展示的患者
                receiveTime:'', // 数据的receiveTime,查询数据时传参必要，使数据连贯
                timer:null, // 定时查询数据的定时器
            },
            channel2:{ // 通道2的状态
                isOn:false, // 该监护仪是否开启
                monitor:null, // 监护仪实例（MonitorSimple组件）
                patient:null, // 当前正在展示的患者
                receiveTime:'', // 数据的receiveTime,查询数据时必要
                timer:null, // 定时查询数据的定时器
            },
            channel3:{ // 通道3的状态
                isOn:false, // 该监护仪是否开启
                monitor:null, // 监护仪实例（MonitorSimple组件）
                patient:null, // 当前正在展示的患者
                receiveTime:'', // 数据的receiveTime,查询数据时必要
                timer:null, // 定时查询数据的定时器
            },
            channel4:{ // 通道4的状态
                isOn:false, // 该监护仪是否开启
                monitor:null, // 监护仪实例（MonitorSimple组件）
                patient:null, // 当前正在展示的患者
                receiveTime:'', // 数据的receiveTime,查询数据时必要
                timer:null, // 定时查询数据的定时器
            },
            channel5:{ // 通道5的状态
                isOn:false, // 该监护仪是否开启
                monitor:null, // 监护仪实例（MonitorSimple组件）
                patient:null, // 当前正在展示的患者
                receiveTime:'', // 数据的receiveTime,查询数据时必要
                timer:null, // 定时查询数据的定时器
            },
            channel6:{ // 通道6的状态
                isOn:false, // 该监护仪是否开启
                monitor:null, // 监护仪实例（MonitorSimple组件）
                patient:null, // 当前正在展示的患者
                receiveTime:'', // 数据的receiveTime,查询数据时必要
                timer:null, // 定时查询数据的定时器
            },
            channel7:{ // 通道7的状态
                isOn:false, // 该监护仪是否开启
                monitor:null, // 监护仪实例（MonitorSimple组件）
                patient:null, // 当前正在展示的患者
                receiveTime:'', // 数据的receiveTime,查询数据时必要
                timer:null, // 定时查询数据的定时器
            },
            channel8:{ // 通道8的状态
                isOn:false, // 该监护仪是否开启
                monitor:null, // 监护仪实例（MonitorSimple组件）
                patient:null, // 当前正在展示的患者
                receiveTime:'', // 数据的receiveTime,查询数据时必要
                timer:null, // 定时查询数据的定时器
            },
            noDataCount:0, // 查询数据得到空数据的次数，连续3次无数据时，提示用户
        }
    },
    methods:{
        beforeSideHide(done){ // 侧边操作栏隐藏前回调
            done()
        },
        getUserInfo(){ // 获取当前登录用户信息
            this.getUserInfoByToken().then(res=>{
                console.log('用户基本信息：',res)
                if(res.success){
                    this.userInfo = res.data ;
                }
            })
        },
        initMonitors(){ // 初始化页面中的全部监护仪（8个）
            for(let i=0;i<8;i++){
                let instance = this.$refs['monitor_channel_'+(i+1)] ;
                if(instance){ // 获取监护仪组件实例，保存到data中
                    this['channel'+(i+1)].monitor = instance ;
                }
            }
        },
        pageChangeHandle(page){ // 绑定监护仪患者列表分页切换处理
            this.pagination.page = page ;
            this.getPatientsBindingList() ;
        },  
        sizeChangeHandle(size){ // 绑定监护仪患者列表分页切换处理
            this.pagination.size = size ;
            this.pagination.page = 1 ;
            this.getPatientsBindingList() ;
        },  
        getPatientsBindingList(){ // 获取绑定监护仪的患者列表
            let params = {
                page:this.pagination.page,
                size:this.pagination.size,
                sortBy:[
                    {running:'1'},
                    {firstReceiveTime:'0'}
                ]
            }
            this.monitorBindingPage(params).then(res=>{
                console.log('-----绑定的患者列表：',res)
                if(res.data.success){
                    let response = res.data.data ;
                    let list = response.records||[] ;
                    // 为数据添加部分自定义字段，用于页面状态展示
                    list.forEach(item=>{
                        item.channel = null ; // 当前正在展示的通道号
                        item.isShowing = false; // 该患者当前正在展示心电图的状态，初始false
                    })
                    let total = response.total ;
                    this.pagination.total = total ;
                    // 判断心电监护仪展示通道,当前新用户数据与之对应
                    for(let i=1;i<=8;i++){
                        let channel = this['channel'+i] ;
                        if(channel.isOn&&channel.patient){
                            let patient = channel.patient ; // 开启的通道对应的绑定患者数据
                            // 在新患者表数据中找到对应的患者数据
                            let newItem = list.filter(obj=>obj.id==patient.id)[0] ;
                            if(!newItem){ // 没找到，则说明当前开启通道的患者已经被解绑，不再出现在左侧患者列表中了，则该通道不应再开启，应该关闭。
                                channel.isOn = false ;
                                channel.patient = null ;
                                channel.receiveTime = '' ;
                                clearTimeout(channel.timer) ;
                                channel.timer = null ;
                                channel.monitor.powerOff()
                            }else{ // 如果找到了，则说明该患者应开启状态
                                newItem.isShowing = true ;
                                newItem.channel = i ;
                                channel.patient = newItem ;
                            }
                        }
                    }
                    this.patientList = list;
                }else{
                    this.$Message.error(res.data.msg||"查询绑定监护仪患者错误")
                }
            })
        },
        patientMonitorChange(patient){ // 患者的监护仪状态改变（switch开关操作）
            console.log(patient)
            if(patient.isShowing){ // 状态变为true，则本次为打开
                // 判断还有没有哪个监护仪通道空闲
                let channel=null ;
                for(let i=1;i<=8;i++){
                    if(this['channel'+i].isOn === false||this['channel'+i].patient==null){ // 判断未启动的监护仪或者已启动但是未关联展示患者的监护仪
                        channel = i ;
                        break ;
                    } 
                }
                if(channel){ // 找到了空闲的通道，将该患者的心电数据展示在该通道的监护仪上
                    this.showMonitor(patient,channel);
                    patient.channel = channel ; // 将对应的通道值保存到患者数据中
                    patient.isShowing = true ;
                }else{ // 未找到空闲通道
                    this.$Message.error('无空闲通道'); 
                    // 将开关重置为false
                    patient.isShowing = false ;
                }
            }else{// 本次为关闭
                let channel = patient.channel ; // 通道号
                // 对应通道关闭数据推送(停止定时器)
                clearTimeout(this['channel'+channel].timer) ; 
                this['channel'+channel].timer = null ;
                // 关闭监护仪
                this['channel'+channel].monitor.powerOff() ; 
                this['channel'+channel].isOn = false ;
                // 解除患者与通道绑定关系
                this['channel'+channel].patient = null ;
                this['channel'+channel].receiveTime = '' ;
                patient.channel = null ; 
                patient.isShowing = false ;
            }
        },
        powerOnCompleteHandle(payload){ // 监护仪启动完毕的回调
            console.log('启动完毕：',payload)
        },
        powerOffDoneHandle(payload){
            console.log('已关闭：',payload)
            let channel = payload.channel ; // 通道号
            let channelData = this['channel'+channel] ;
            let patient = channelData.patient ;
            // 对应通道关闭数据推送(停止定时器)
            // console.log('----找到计时器：',channelData.timer)
            clearTimeout(channelData.timer) ; 
            channelData.timer = null ;
            // 记录监护仪启动状态为false
            channelData.isOn = false ;
            // 解除患者与通道绑定关系
            channelData.patient = null ;
            channelData.receiveTime = '' ;
            if(patient){
                patient.channel = null ; 
                patient.isShowing = false ;
            }
        },
        getData(patient,channel){ // 获取监护仪数据
            if(!patient||!patient.equId){
                return false ;
            }
            let equId = patient.equId ; // 该患者绑定的监护仪设备id
            let name = patient.patientName ; // 该患者绑定的监护仪设备id
            let params = {
                equId:equId
            }
            this['channel'+channel].receiveTime?params.receiveTime=this['channel'+channel].receiveTime:null
            
            this.selectCurrentMonitorByEquId(params,{timeout:4000}).then(res=>{ // 根据监护仪设备id查询实时监护仪数据
                // console.log('----监护仪数据monitorDatas：',res.data)
                // console.log('----------参数params.receiveTime:',params.receiveTime) 
                if(res.data.success){
                    let response = res.data.data ;
                    if(response){
                        let monitorDatas = response.monitorDatas||[] ; // 监护仪数据（数组）
                        // 消息提示的判断
                        if(!monitorDatas||monitorDatas.length===0){ // 得到空数据
                            this.noDataCount ++ ;
                            if(this.noDataCount>=5){ // 连续超过3秒没拿到数据，提示用户
                                this['channel'+channel].monitor.msgShow('请连接监护仪或者检查监护仪网络','warning',4000)
                                this.noDataCount = 0 ;
                            }
                        }else{ // 非空数据，判断数据中的额外消息
                            let exceptionInfo = JSON.parse(monitorDatas[monitorDatas.length-1].exceptionInfo) ; // 额外的提示消息
                            if(exceptionInfo&&exceptionInfo.length){
                                this['channel'+channel].monitor.msgShow(exceptionInfo.join('；'),'warning');
                            }
                        }
                        // 接收时间更新
                        let receiveTime = response.receiveTime ; // 接收时间，下次请求需要传该值，后端根据该时间判断该返回的数据
                        if(receiveTime){ // 本次得到了receiveTime,则更新它，下次拿数据传该值取数据
                            this['channel'+channel].receiveTime = receiveTime 
                        }
                        // console.log('-------得到数据条数length:',monitorDatas.length)
                        // 基本生命体征数据
                        let baseData = JSON.parse(monitorDatas&&monitorDatas.length?monitorDatas[monitorDatas.length-1].baseData:"{}") ;
                        
                        // 处理监护仪数据
                        let data = {
                            patient:{
                                id:equId,
                                name:name
                            },
                            base:{
                                hr:Number(baseData.hr)||0,// 心率
                                pr:Number(baseData.pr)||0, // 脉搏也要传进去（如果没有心率，就显示脉搏）
                                rr:Number(baseData.rr)||0, // 呼吸率
                                spo2:Number(baseData.spo2)||0, // 血氧饱和度
                                sbp:Number(baseData.bp)||0, // 收缩压（高压）
                                dbp:Number(baseData.dbp)||0, // 舒张压（低压） // 平均动脉压由组件根据高压、低压的值自行计算，不需要传入（ 公式：平均动脉压 = (高压+2*低压)/3 ）
                            },
                            waves:[
                                {
                                    name:"I", // 波形名，必须与配置option.waveNames中的值保持一致
                                    data:[], // 波形数据
                                    pointPerWave:Number(patient.points),
                                    style:{ // 非必须，波形样式（线宽，颜色,透明度）,优先级比option.waves.wave中的配置高，这里可单独设置一个波的样式，而option.waves.wave则是整体设置所有波的样式 ，
                                        lineWidth:1,
                                        color:'#a3d148',
                                        opacity:1
                                    }
                                },
                                {
                                    name:"II", // 波形名，必须与配置option.waveNames中的值保持一致
                                    data:[], // 波形数据
                                    pointPerWave:Number(patient.points),
                                    style:{ // 非必须，波形样式（线宽，颜色,透明度）,优先级比option.waves.wave中的配置高，这里可单独设置一个波的样式，而option.waves.wave则是整体设置所有波的样式 ，
                                        lineWidth:1,
                                        color:'#a3d148',
                                        opacity:1
                                    }
                                },
                                {
                                    name:"Resp", // 波形名，必须与配置option.waveNames中的值保持一致
                                    data:[], // 波形数据
                                    pointPerWave:Number(patient.pointsR) , // 每秒的点数（不同牌子的监护仪，不同的波，可能都不同），本模拟数据是宝莱特的呼吸率，每波点数是100（与心电图波的点数不同，注意区分）
                                    style:{ // 波形样式（线宽，颜色,透明度等）,优先级比option.waves.wave中的配置高，这里可单独设置一个波的样式，而option.waves.wave则是整体设置所有波的样式 ，这里非必须
                                        lineWidth:1,
                                        color:'#efc519',
                                        opacity:1
                                    }
                                },
                                {
                                    name:"SPo2", // 波形名，必须与配置option.waveNames中的值保持一致
                                    data:[], // 波形数据
                                    pointPerWave:Number(patient.pointsSo2) , // 每秒的点数（不同牌子的监护仪，不同的波，可能都不同），本模拟数据是宝莱特的呼吸率，每波点数是100（与心电图波的点数不同，注意区分）
                                    style:{ // 波形样式（线宽，颜色,透明度等）,优先级比option.waves.wave中的配置高，这里可单独设置一个波的样式，而option.waves.wave则是整体设置所有波的样式 ，这里非必须
                                        lineWidth:1,
                                        color:'#8bd1f0',
                                        opacity:1
                                    }
                                },
                                
                            ]
                        }

                        // 统计逻辑，注释掉
                        /* this.t++
                        if(this.t==1){
                            console.time('统计时间')
                        } */
                        monitorDatas.forEach(item=>{
                            // 统计逻辑，注释掉
                            /* let ecg1 = JSON.parse(item.ecg1?item.ecg1:"[]");
                            if(this.t<=200&&this.t>1){
                                if(ecg1.length==120){
                                    this.c120++
                                }else if(ecg1.length==125){
                                    this.c125++
                                }else{
                                    this.else+=ecg1.length
                                }
                                // console.log('-----ecg1.length:',ecg1.length) ;
                            }else if(this.t==200){
                                let time = console.timeEnd('统计时间')
                                console.error('200次请求了。')
                                console.log("c120:",this.c120)
                                console.log("c125:",this.c125)
                                console.log("else:",this.else)
                                console.error('计算点数：',(this.c120*120+this.c125*125+this.else))
                                console.error('---time:',time)
                                this.t++
                            } */
                            let ecg1 = JSON.parse(item.ecg1?item.ecg1:"[]");
                            let ecg2 = JSON.parse(item.ecg2?item.ecg2:"[]");
                            let resp = JSON.parse(item.respWaveData?item.respWaveData:"[]");
                            let spo2 = JSON.parse(item.spo2WaveData?item.spo2WaveData:"[]");
                            data.waves[0].data = data.waves[0].data.concat(ecg1) ;
                            data.waves[1].data = data.waves[1].data.concat(ecg2) ;
                            data.waves[2].data = data.waves[2].data.concat(resp) ;
                            data.waves[3].data = data.waves[3].data.concat(spo2) ;
                        })

                        // console.log('---处理后的数据：',data)
                        // 判断通道的启动状态仍然在启动中true，则将数据推送到监护仪，同时请求下次数据
                        if(this['channel'+channel].isOn){ // 判断该通道仍处于启动状态，才去查下次数据(有可能本次数据查回来后，监护仪通道已被关闭)
                            this['channel'+channel].monitor.pushData(data) ; // 将数据推送到监护仪中
                            this['channel'+channel].timer = setTimeout(()=>{
                                this.getData(patient,channel)
                            },1000)
                        }
                    }
                }
            }).catch(err=>{
                // console.log('-----页面请求err:',err)
                // 页面请求错误，网络波动或其他情形，须将receiveTime重置,防止数据在后端积压
                this['channel'+channel].receiveTime = null ;
                if(this['channel'+channel].isOn){ // 判断该通道仍处于启动状态，才去查下次数据(有可能本次数据查回来后，监护仪通道已被关闭)
                    this['channel'+channel].timer = setTimeout(()=>{
                        this.getData(patient,channel)
                    },1000)
                }
            })
        },
        showMonitor(patient,channel){ // 将某个患者的心电数据展示在某个通道的监护仪上面
            this['channel'+channel].isOn = true ;
            this['channel'+channel].patient = patient ;
            this['channel'+channel].monitor.powerOn() ; // 该心电监护仪启动
            this.getData(patient,channel) ; // 该患者查询心电数据获取，展示到对应的监护仪
        }
        
    },
    filters:{
        monitorTypeFilter(value){
            if(!value){
                return '';
            }
            let dict = {
                'blt':'宝莱特',
                'idottmed':'多特',
                'mindray':'迈瑞'
            }
            return dict[value]||""
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.initMonitors(); // 初始化页面中的全部监护仪（8个）
        })
        this.getPatientsBindingList();
        this.getUserInfo() ; // 当前登录用户信息
        // this.$nextTick(()=>{
        //     // this.getData()
        //     setTimeout(()=>{
        //         this.showMonitor('111','1') ;
        //         this.$refs['monitor_channel_1'].powerOn() ; // 打开通道1的监护仪
        //         setTimeout(()=>{
        //             this.getData('111','1') // 模拟每秒查数据，并push数据到监护仪组件中
        //         },1000)
        //     },1000)
            
                
            
        // })
    },
    activated(){ // 页面激活
        console.log('页面激活')
        for(let i=0;i<8;i++){ // 检测每一个监护仪通道是否打开，如果打开，则继续查询数据展示
            let instance = this.$refs['monitor_channel_'+(i+1)] ;
            if(instance&&instance.isOn&&instance.patient){ // 获取监护仪组件实例，并且该通道已绑定患者且正在启动中，则查询该患者数据展示
                this.showMonitor(instance.patient,i+1);
            }
        }
    },
    deactivated(){ // 页面失活
        console.log('页面失活')
        for(let i=0;i<8;i++){ // 页面失活时，全部监护仪不再查询数据，清除全部receiveTime（否则将造成数据积压）
            let instance = this.$refs['monitor_channel_'+(i+1)] ;
            if(instance){ // 获取监护仪组件实例，并且该通道已绑定患者且正在启动中，则查询该患者数据展示
                instance.receiveTime = ''
                if(instance.timer){
                    clearTimeout(instance.timer);
                    instance.timer = null ;
                }
            }
        }
    }
    
}
</script>
