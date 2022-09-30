import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueKonva from 'vue-konva'
import './assets/css/layout.less'

Vue.config.productionTip = false
Vue.use(VueKonva);
window.vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
