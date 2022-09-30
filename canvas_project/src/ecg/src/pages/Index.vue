<template>
    <div class="page-root-wrap">
        <header-com class='header' :height='headerHeight'></header-com>
        <div class="main-wrap" ref='main' v-show='mainShow'>
            <div :class="{'side-menu-wrap':true,'collapse':menuCollapse}">
                <SideMenu :isCollapse='menuCollapse' class='side-menu'></SideMenu>
                <div :class="{'collapse-btn':true,'collapse':menuCollapse}" @click.stop='collapseHandler'></div>
            </div>
            <div class="container">
                <router-view></router-view>
            </div>
        </div>
        <footer-com :height='footerHeight'></footer-com>
    </div>
</template>
<script>
import HeaderCom from '@/components/public/Header.vue' ;
import FooterCom from '@/components/public/Footer.vue' ;
import SideMenu from '@/components/public/SideMenu.vue'
export default {
    name: 'Index',
    components:{HeaderCom,FooterCom,SideMenu},
    data(){
        return {
            mainShow:false,
            headerHeight: 88 ,
            footerHeight:50 ,
            menuCollapse:false,// 左菜单折叠
        }
    },
    mounted(){
        this.$refs['main'].style='padding-top:'+this.headerHeight+'px;padding-bottom:'+this.footerHeight+'px;' ;
        this.mainShow = true ;
    },
    methods:{
        collapseHandler(){
            this.menuCollapse = !this.menuCollapse ;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .page-root-wrap{
        width: 100%;
        height: 100%;
        background: #fff;
    }
    .main-wrap{
        box-sizing: border-box;
        height: 100%;
    }
    .side-menu-wrap{
        float: left;
        width: 200px;
        position: relative;
        height: 100%;
        background: #545c64 ;
        -webkit-transition:all 0.3s ease-in-out;
        -moz-transition:all 0.3s ease-in-out;
        -ms-transition:all 0.3s ease-in-out;
        -o-transition:all 0.3s ease-in-out;
        transition:all 0.3s ease-in-out;
    }
    .side-menu-wrap.collapse{
        width: 64px;
    }
    .side-menu{
        height: 100%;
        overflow: hidden;
    }
    .collapse-btn{
        position: relative;
        width: 12px;
        height: 70px;
        background: #000 ;
        opacity: 0.4;
        position: absolute;
        left: 100%;
        top: 50%;
        cursor: pointer;
        border-radius: 0 5px 5px 0;
        -webkit-transform:translate(0,-50%)
    }
    .collapse-btn:before{
        content: '';
        display: block;
        width: 0px;
        height: 0px ;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform:translate(-60%,-50%);
        -moz-transform:translate(-60%,-50%);
        -ms-transform:translate(-60%,-50%);
        -o-transform:translate(-60%,-50%);
        transform:translate(-60%,-50%);
        border-width:6px 5px 6px 0;
        border-color:transparent #fff transparent transparent; 
        border-style:solid solid solid solid; 
        -webkit-transform-origin:25% 25%;
        -moz-transform-origin:25% 25%;
        -ms-transform-origin:25% 25%;
        -o-transform-origin:25% 25%;
        -webkit-transition:all .3s ease-in-out;
        -moz-transition:all .3s ease-in-out;
        -ms-transition:all .3s ease-in-out;
        -o-transition:all .3s ease-in-out;
        transition:all .3s ease-in-out;
    }
    .collapse-btn.collapse:before{
        -webkit-transform:rotate(180deg);
        -moz-transform:rotate(180deg);
        -ms-transform:rotate(180deg);
        -o-transform:rotate(180deg);
        transform:rotate(180deg);
    }
    .container{
        height: 100%;
        overflow: auto;
    }
    .el-menu{
        border-right: none;
    }
</style>
