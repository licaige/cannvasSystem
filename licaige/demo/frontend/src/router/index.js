import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register/',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/ide/:containerid/',
    name: 'ide',
    component: () => import('../views/IDEView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
