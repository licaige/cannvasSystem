import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {   
        path:'/',
        redirect:'/index'
    }
  ]
})
