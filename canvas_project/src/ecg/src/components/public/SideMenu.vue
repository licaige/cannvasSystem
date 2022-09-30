<!-- SideMenu.vue - 左侧菜单 -->
<template>
    <el-menu
      router
      default-active="1-1"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse">
      <el-submenu v-for='(submenu,subIndex) in router.options.routes' :key='submenu.name' :index="subIndex+1+''">
        <template slot="title">
          <i v-if='submenu.icon' :class="submenu.icon"></i>
          <span>{{submenu.label}}</span>
        </template>
        <!-- <el-menu-item-group> -->
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item v-for='(menuItem,itemIndex) in submenu.children' :key='menuItem.name' :index="(subIndex+1)+'-'+(itemIndex+1)" :route='{name:menuItem.name}'>{{menuItem.label}}</el-menu-item>
        <!-- </el-menu-item-group> -->
        <!-- <el-menu-item-group title="分组2"> -->
          <!-- <el-menu-item index="1-3">选项3</el-menu-item> -->
        <!-- </el-menu-item-group> -->
        <!-- <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      
      <!-- <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu>
</template>
<style scoped>
    
</style>
<script>
    import Router from '@/router/index.js' ;
    export default {
        props:{
            isCollapse:{
                type:Boolean
            }
        },
        data(){
            return {
                router:Router
            }
        },
        methods:{
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            }
        },
        created(){
            console.log(this.router)
            // 路径配置中，去除重定向相关的路径，不展示出来：
            this.$nextTick(()=>{
                this.router.options.routes = this.router.options.routes.filter(item=>{return !item.hasOwnProperty('redirect')})
            })
        },
        mounted(){
          
        }
    }
</script>