import { createApp } from 'vue'
import App from './App.vue'
import fxCommonUi from '@/components'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import './assets/stylus/main.styl'
import 'element-plus/dist/index.css'

createApp(App)
	.use(ElementPlus, {
		locale: zhCn
	})
	.use(fxCommonUi)
	.mount('#app')
