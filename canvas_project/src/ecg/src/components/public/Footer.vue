<!-- footer.vue - 网页底部组件 -->
<template>
    <div class="footer-wrap">
        <span class='copy-right'>技术支持:和诚信息技术有限公司</span>
    </div>
</template>
<style>
    .footer-wrap{
        width: 100%;
        height: 50px;
        background: #323232;
        position: fixed;
        bottom: 0;
        left: 0;
    }
    .copy-right{
        display: block;
        padding: 15px 50px;
        font:normal 14px 'Avenir',Helvetica,Arial,sans-serif;
        color: #666;
        text-align: center;
    }
</style>
<script>
    
    export default {
        data(){
            return {

            }
        },
        methods:{

        },
        mounted(){

        }
    }
</script>