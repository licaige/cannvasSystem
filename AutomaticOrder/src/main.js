import Vue from 'vue'//入口文件
import VueRouter from 'vue-router'//1.1导入路由的包
import FastClick from 'fastclick'//安装fastclick
import Config from './model/config'
import storage from './model/storage'
/** 配置socket.io */
import VueSocketio from 'vue-socket.io'

/** 调用fastclick */
FastClick.attach(document.body)


/** 移动端调试工具 */
import VConsole from 'vconsole'
var vConsole = new VConsole()

/** 获取桌号,本地存储,只获取开始页面的roomid信息 */
var startHash = window.location.hash.split('?')
// storage.set('roomid', '')
// var roomid = ''
if(startHash[0] == '#/start'){
	let temp = startHash[1].split('=')
	var roomid = temp[1]
	if(temp[0]=='roomid'){
		storage.set('roomid', roomid)
		console.log('roomid', roomid);	
	}
}else{
	var roomid = storage.get('roomid')
}

/** 配置socket.io */
Vue.use(VueSocketio, Config.socketApi+'?roomid='+roomid)		// 引用服务器地址


/** 导入axios */
import Axios from 'axios'
Vue.prototype.$ajax = Axios				//挂载原型
Axios.defaults.baseURL = Config.api   	//配置接口请求根目录 
Axios.defaults.timeout = 5000;  		//响应时间
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' //配置请求头 	
Axios.interceptors.request.use(function(config){	//拦截器，请求发起之前,显示
	// 逻辑代码
	return config
});
Axios.interceptors.response.use(function(config){	//拦截器，请求发起之前，隐藏
	// 逻辑代码
	return config
});
Axios.headers = {'X-Requested-With': 'XMLHttpRequest'}


/** 安装图片懒加载 */
import VueLazyLoad from 'vue-lazyload'		
Vue.use(VueLazyLoad, {
	loading: require('./assets/img/default.gif'),
})

/** 定义时间全局过滤器 */
import moment from 'moment'
Vue.filter('formatDate', function(data, formatString){
	formatString = formatString || 'YYYY-MM-DD hh:mm'
	return moment(data).format(formatString)
})

/** 导入vuex对象仓库 */
// import store from './store.js'

//1.2安装路由
Vue.use(VueRouter)
import router from './router.js'//导入自己的router.js路由模块
import App from './App.vue'//导入App根组件

//创建vue实例
var vm = new Vue({
	el: '#app',
	render: c => c(App),    //渲染app页面到index.html首页
	router,                 //挂载自己的路由对象
	// store,					//挂载vuex
})