import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index.vue'
import EcgView from '@/pages/ecgView.vue'
import View2 from '@/pages/view2.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      label:'导航组1',
      icon:'el-icon-location',
      component: Index,
      children:[
        {
            path:'ecg_view',
            name:'ecg_view',
            label:'心电图',
            component:EcgView,
        },
        {
            path:'view2',
            name:'view2',
            label:'另一个页面',
            component:View2,
        }

      ]
    },
    {
        path:'/',
        redirect:'/index/ecg_view'
    }
  ]
})
