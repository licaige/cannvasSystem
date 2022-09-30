<template>
  <div class="page-root">
    <div class="content-wrap">
      <component :is='curView'></component>
    </div>
    <el-form label-width="110" inline size='small'>
      <el-form-item label='请选择展示内容'>
        <el-select v-model="curView" placeholder="请选择">
          <el-option
            v-for="item in viewConfig"
            :key="item.key"
            :label="item.title"
            :value="item.key"
            size='small'>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
      
  </div>
</template>
<script>
// 代码过程中遇到一个坑，这里记录一下：
    // canvas中做动画时，先clearRect清除整个画布，再画需要的图形，以达到动画的运动效果。但是如果使用先画矢量路径，再fill填颜色的方式来绘制图形，务必要先ctx.beginPath() ;否则。矢量路径不会被clearRect清除。 导致运动动画失败。 规范点来做，绘制完成一个路径，还要closePath；切记！

import Particle from '@/components/particle.vue' ;
import Tree from '@/components/tree.vue'  ;
import Ball from '@/components/ball.vue'  ; // 规则点分布的球，其实只是生成point的方法 calcPoint 不一样而已。
import Ball2 from '@/components/ball2.vue'  ; // 点随机的球，其实只是生成point的方法 calcPoint 不一样而已。
import StarSky from '@/components/starSky.vue'  ; 
import FireWork from '@/components/fireWork.vue'  ; 
import StarTravel from '@/components/starTravel.vue'  ; 
import ParticleSea from '@/components/particleSea.vue'  ; 

import utils from "@/utils/utils.js"

export default {
  components:{Particle,Tree,Ball,Ball2,StarSky,FireWork,StarTravel,ParticleSea} ,
  data () {
    return {
      viewConfig:[// 视图内容的配置
        {
          key:'Particle',
          title:'图形粒子化'
        },
        {
          key:'Tree',
          title:'canvas树'
        },
        {
          key:'Ball',
          title:'3d球(规则)'
        },
        {
          key:'Ball2',
          title:'3d球(随机)'
        },
        {
          key:'StarSky',
          title:'星空'
        },
        {
          key:'FireWork',
          title:'烟花'
        },
        {
          key:'StarTravel',
          title:'星际旅行'
        },
        {
          key:'ParticleSea',
          title:'粒子波浪'
        },
        
      ], 
      
      curView:'',
      
    }
  },
  computed:{
     
  },
  methods:{
    changeContent(name){ // 改变展示的内容
      if(name){
        this.curView = name ;
      }else{
        this.curView = '' ;
      }
    }
  },
  filters:{
    
  },
  mounted(){
    
  }
}


</script>
<style scoped>
  .content-wrap{
    box-sizing: border-box;
    width: 100%;
    height: 80%;
    padding: 10px;
    min-height: 600px;
    border:1px solid #EBEEF5;
    border-radius: 8px;
    margin-bottom: 15px;
    background: #f8f8ff;
  }
</style>
