import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  { path: '/', redirect: '/wave-dot', hidden: true },
  { path: '/wave-dot', component: () => import('../view/waveDot'), meta: { title: '点状波浪' } },
  { path: '/wave-dot1', component: () => import('../view/waveDot'), meta: { title: '点状波浪1' } },
  { path: '/wave-dot2', component: () => import('../view/waveDot'), meta: { title: '点状波浪2' } },
  { path: '/wave-dot3', component: () => import('../view/waveDot'), meta: { title: '点状波浪3' } },
]

const router = new Router({
  // mode:'history',
  routes
})

export default router
