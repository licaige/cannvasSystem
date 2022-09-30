// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 异步axios插件：
import axios from 'axios' ;
import vueAxios from 'vue-axios' ;

import ElementUI from 'element-ui' ;
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(vueAxios,axios);

Vue.config.productionTip = false 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
