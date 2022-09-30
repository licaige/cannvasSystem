<template>
  <div>
    <div class="cs-switch">
      <el-switch v-model="opened" active-text="展开" inactive-text="关闭"></el-switch>
    </div>
    <div v-show="opened">
      <el-menu
        mode="vertical"
        unique-opened
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <SidebarItem v-for="(item,index) in routes" :key="'sidebarItem'+index" :item="item" :basePath="item.path"/>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import SidebarItem from './SidebarItem'

  export default {
    name: 'NavBar',
    components: { SidebarItem },
    data() {
      return {
        opened: true
      }
    },
    computed: {
      routes() {
        return this.$router.options.routes
      }
    }
  }
</script>

<style scoped>
  .el-menu {
    transition: all 0.5s ease-in-out .1s;
    text-align: left;
    border-right: unset;
  }

  .cs-switch {
    background-color: wheat;
  }
</style>
