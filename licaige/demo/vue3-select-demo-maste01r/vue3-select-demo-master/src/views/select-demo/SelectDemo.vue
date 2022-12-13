<template>
	<div class="demo-container">
		<fx-select
			ref="selectRef"
			v-model="selectValue"
			clearable
			:selectOptions="selectOptions"
			@change="onSelectChange"
		>
		<template #option="{optionItem}">
			<span>
				{{ '风行--' + optionItem.label}}
			</span>
		</template>
		</fx-select>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
const selectValue = ref('')
const selectRef = ref()
const selectOptions = reactive(Array.from({length: 20}, (item,index) => {
	return {
		id: index + '',
		label: "选项" + (index + 1),
		disabled: index === 2 || index === 5
	}
}))
const onSelectChange = (id, item) => {
	console.log(id, item)
}
</script>

<style lang="stylus" scoped>
.demo-container {
	padding 20px
}
</style>