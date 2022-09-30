<template>
  <transition name="el-collapse-transition" v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item)">
      <el-menu-item :index="resolvePath(item.path)">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </template>
    <template v-else>
      <el-submenu :index="resolvePath(item.path)">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </template>
        <SidebarItem
          v-for="(child,index) in item.children"
          :key="'sidebarItem'+index"
          :item="child"
          :basePath="resolvePath(item.path)"
        ></SidebarItem>
      </el-submenu>
    </template>
  </transition>
</template>

<script>
  import path from 'path'

  export default {
    name: 'SidebarItem',
    props: {
      item: {
        type: Object,
        required: true
      },
      basePath: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        onlyOneChild: null,
        noShowingChildren: false
      }
    },
    methods: {
      /**
       * 该方法用于判断当前节点是否包含可一个可显示的子节点
       * 若长度为0，则显示该节点本身
       * 若长度为1，则显示该节点的可显示子节点
       * 使用this.onlyOneChild作为中间人，传递path,title
       * @param children
       * @param parent
       * @returns {boolean}
       */
      hasOneShowingChild(children = [], parent) {
        const showingChildren = children.filter(item => !item.hidden)
        // console.log(parent.meta.title + showingChildren.length)
        // 若可显示的节点数量为1，则返回true
        if (showingChildren.length === 1) {
          return true
        }
        if (showingChildren.length === 0) {
          this.onlyOneChild = {
            ...parent,
            path: '',
            noShowingChildren: true
          }
          return true
        }
        return false
      },
      resolvePath(routePath) {
        return path.resolve(this.basePath, routePath)
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
