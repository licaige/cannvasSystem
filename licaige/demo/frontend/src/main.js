import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import axios from 'axios'

// Default Configs
const app = createApp(App)
app.use(store)
app.use(router)

// Use ElementPlus and Icons.
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// Use Axios
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true
app.config.globalProperties.$axios = axios
app.config.globalProperties.BASE_URL = process.env.VUE_APP_BASE_URL

// Login Check in Vue-router
router.beforeEach(async (to, from, next) => {
  if (to.name !== 'login' && to.name !== 'register') {
    try {
      await axios.get('/api/login/is_logged_in/')
      next()
    } catch { next('/login/') }
  } else {
    next()
  }
})

app.mount('#app')
