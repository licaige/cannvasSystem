<!-- header.vue - 网页头部组件 -->
<template>
    <div class="header-wrap" :style='"height:"+height+"px;"'>
        <span class='head-title'>心电图监控平台</span>
    </div>
</template>
<style>
    .header-wrap{
        box-sizing: border-box;
        width: 100%;
        height: 88px;
        background: #323232;
        position: fixed;
        top: 0;
        left: 0;
    }
    .head-title{
        display: block;
        padding: 30px 50px;
        font:normal 20px Arial,sans-serif;
        color: #f0f0f0;

    }
</style>
<script>
    
    export default {
        props:{
            height:{
                type:[Number,String],
                required:true
            }
        },
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