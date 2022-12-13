import Select from './Select/Select.vue'
import * as Icons from '@element-plus/icons-vue'

const components = [
	...(Object.keys(Icons).map(key => {
		return {name: key, value: Icons[key]}
	}))
]

export default {
	install (Vue) {
		Vue.component('fx-select', Select)
		components.forEach(item => {
			Vue.component(item.name, item.value)
		})
	}
}
