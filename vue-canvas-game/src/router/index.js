import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path     : '/',
        name     : 'Home',
        component: Home
    },
    {
        path     : '/about',
        name     : 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path     : '/snake',
        name     : 'snake',
        component: () => import('../views/Snake.vue')
    },
    {
        path     : '/2048',
        name     : '2048',
        component: () => import('../views/2048/index.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
