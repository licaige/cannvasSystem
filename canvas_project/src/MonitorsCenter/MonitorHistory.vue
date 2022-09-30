<template>
    <div class="his-ecg-page-root">
        <MonitorsHistoryCom ref='monitors-history-com' :emergencyId='emergencyId'></MonitorsHistoryCom>
    </div>

</template>
<style scoped>
    .his-ecg-page-root{
        box-sizing: border-box;
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>
<script>
import MonitorsHistoryCom from '@/views/pages/MonitorsCenter/MonitorHistoryCom.vue' // 组件
export default {
    components:{MonitorsHistoryCom},
    data() {
        return {
            emergencyId:'',
        }
    },
    methods:{
        init(){ // 初始化页面
            let query = this.$route.query ;
            if(query&&query.emergencyId){
                this.emergencyId = query.emergencyId ;
                this.$nextTick(()=>{
                    this.$refs['monitors-history-com'].init() ; // 组件初始化
                })
            }else{
                throw new Error('历史心电图页面缺少id参数')
            }
        }
    },
    mounted(){
        this.init() ;
    }   
}
</script>
