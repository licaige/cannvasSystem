<template>
  <div>
    <canvas id="canvas"></canvas>
    <div class="cs-switch">
      <el-switch v-model="drawer" active-text="展开" inactive-text="关闭"></el-switch>
    </div>
    <el-drawer
      title="配置"
      :visible.sync="drawer"
      direction="rtl"
    >
      <el-form label-width="80px">
        <el-form-item label="背景颜色">
          <el-color-picker v-model="config.bgColor[0]"></el-color-picker>
        </el-form-item>
        <el-form-item label="点云颜色">
          <el-color-picker
            v-model="config.dots.color"
            @change="reload"
          ></el-color-picker>
          <el-input :value="config.dots.color"></el-input>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
  import canvasBg from '../../../index'

  export default {
    name: 'waveDot',
    data() {
      return {
        drawer: false,
        config: {
          id: 'canvas',
          width: window.innerWidth,
          height: window.innerHeight,
          bgColor: ['#17293a'],
          dots: {
            set: [400, 250, 100],
            color: '#117AB5',
            alpha: 1
          }
        }
      }
    },
    methods: {
      init() {
        console.log('初始化')
        canvasBg.waveDot(this.config)
      },
      reload(color) {
        this.config.dots.color = color
        canvasBg.waveDot(this.config)
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style scoped>
  .cs-switch {
    position: absolute;
    right: 0;
    top: 0;
    background-color: wheat;
  }
</style>
