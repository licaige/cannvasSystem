/** 引入路由 */
import VueRouter from 'vue-router'
// 引入提示组件
import {toast,indicator} from './common/toast/toast.js'

/** 引入组件 */
const Start =r => require([ './components/Start.vue'], r)
const EditPeopleInfo =r => require([ './components/EditPeopleInfo.vue'], r)
const Home =r => require([ './components/Home.vue'], r)
const Hot =r => require([ './components/Hot.vue'], r)
const New =r => require([ './components/New.vue'], r)
const Order =r => require([ './components/Order.vue'], r)
const Pcontent =r => require([ './components/Pcontent.vue'], r)
const Search =r => require([ './components/Search.vue'], r)
const Cart =r => require([ './components/Cart.vue'], r)
const Success =r => require([ './components/Success.vue'], r)

/** 配置路由 */
const routes = [
	{ path: '/start', name: 'Start', component: Start ,meta: {title: '欢迎点餐'}},
	{ path: '/editpeopleinfo', name: 'EditPeopleInfo', component: EditPeopleInfo ,meta: {title: '修改用餐人数'}},
	{ path: '/home', name: 'Home', component: Home ,meta: {title: '点餐页面'}},
	{ path: '/hot', name: 'Hot', component: Hot ,meta: {title: '热门菜品'}},
	{ path: '/new', name: 'New', component: New ,meta: {title: '最新推荐'}},
	{ path: '/order', name: 'Order', component: Order ,meta: {title: '订单页面'}},
	{ path: '/pcontent', name: 'Pcontent', component: Pcontent ,meta: {title: '菜品详情'}},
	{ path: '/search', name: 'Search', component: Search ,meta: {title: '菜品搜索'}},
	{ path: '/cart', name: 'Cart', component: Cart ,meta: {title: '购物车'}},
	{ path: '/success', name: 'Success', component: Success ,meta: {title: '付款成功'}},
	{ path: '*', redirect:'/start'},
]

/** 实例化Vue-router,传入 `routes` 配置 */
const router = new VueRouter({
	routes // (缩写) 相当于 routes: routes
})

router.beforeEach((to, from, next) => {
	/** 可以写业务逻辑代码 */
	indicator(1)
    /* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title
	}
	next()
})

router.afterEach(function (to) {
	indicator()
    /** 可以写业务逻辑代码 */
})

//导出路由对象
export default router