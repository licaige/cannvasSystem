<template>
	<div class="fx-select-container" v-clickoutside="onClosePopover">
		<el-popover
			ref="popoverRef"
			:visible="popperVisible"
			:width="dropDownWidth"
			placement="bottom-start"
			@before-enter="onPopoverShow"
			@before-leave="onPopoverHide"
		>
			<template #reference>
				<div
					class="input-container"
					:style="`width:${inputWidth}px`"
					@click="onContainerClick"
					@mouseenter="onContainerMouseenter"
					@mouseleave="onContainerMouseleave"
				>
					<input
						ref="selectInputRef"
						type="text"
						v-model="selectedLabel"
						:disabled="disabled"
						:placeholder="placeholderComputed"
						:class="['select-input', {'input-disabled': disabled}]"
						@focus="onInputFocus"
						@blur="onInputBlur"
						@mousedown.prevent
					>
					<ArrowDown v-show="!showClose" :class="['select-arrow-down', {'select-arrow-up': popperVisible, 'disabled': disabled}]"/>
					<CircleClose v-show="showClose" class="select-circle-close" @click.stop="onClearClick"/>
				</div>
			</template>
			<ul class="select__dropdown-wrap">
				<li
					v-for="optionItem in selectOptions"
					:key="optionItem.id"
					:class="['select__dropdown-item', `select__dropdown-item-${optionItem.id}`, selectItemClasses(optionItem)]"
					@click.stop="onSelectItemClick(optionItem)"
					@mouseover="onSelectItemMouseover(optionItem)"
				>
				<slot name="option" v-bind:optionItem="optionItem">
					{{optionItem.label}}
				</slot>
				</li>
			</ul>
		</el-popover>
		<button :class="['add-btn', {'btn-disabled': disabled}]" @click="onAddClick">追加</button>
	</div>
</template>

<script setup>
/**
	* @name fx-select
	* @desc 单选组件
	* @author caicai
	* @date 2022/08/22
	*
	* @param {String} modelValue - 选中项绑定值
	* @param {Boolean} disabled - 是否禁用
	* @param {String} placeholder - 占位文字
	* @param {Number, String} dropDownWidth - 下拉选择框宽度
	* @param {Number, String} inputWidth - input框宽度
	* @param {Array} selectOptions - 选项数组集合
	* @param {Boolean} clearable - 是否可以清空选项
	*
	* @slot {option}  - 选项插槽，传递参数为optionItem
	*
	* @events {change} - 选中值发生变化时触发  回调参数（ id，目前的选中的对象 ）
	* @events {blur} - 当 input 失去焦点时触发  回调参数（ event: Event ）
	* @events {focus} - 当 input 获得焦点时触发  回调参数（ event: Event ）
	*
	* @methods {focus} - 使选择器的输入框获取焦点，并显示下拉框
	* @methods {blur} - 使选择器的输入框失去焦点，并隐藏下拉框
	*/
import clickOutSide from '../utils/clickoutside.js'
import utils from '../utils/utils.js'
import { ref, computed, reactive, watch, toRefs, nextTick } from 'vue'
const props = defineProps({
	modelValue: null,
	disabled: Boolean,
	placeholder: {
		type:String,
		default: '请选择'
	},
	dropDownWidth: {
		type: [Number, String],
		default: 200
	},
	inputWidth: {
		type: [Number, String],
		default: 200
	},
	selectOptions: {
		type: Array,
		default: () => {
			return []
		}
	},
	clearable: {
		type: Boolean,
		default: false
	}
})
const modelValue = toRefs(props).modelValue
const emit = defineEmits(['change', 'update:modelValue', 'blur', 'focus'])
const vClickoutside = clickOutSide
const selectInputRef = ref()
const popoverRef = ref()
const popperVisible = ref(false)
const showClose = ref(false)
const addKey = ref('')
const currentHoverItem = ref({})
const currentSelect = ref({})
const popperRef = ref()
const selectedLabel = computed({
	get () {
		return popperVisible.value ? addKey.value : currentSelectLabel.value
	},
	set (val) {
		addKey.value = val
	}
})
const inputWidth = computed(() => {
	if (typeof width === 'number') {
		return props.inputWidth + 'px'
	} else {
		return props.inputWidth
	}
})
const selectItemClasses = computed(() => {
	return (listItem) => {
		return {
			selected: modelValue.value === listItem.id,
			hover: listItem.id === currentHoverItem.value.id,
			'is-disabled': !!listItem.disabled
		}
	}
})
const placeholderComputed = computed(() => {
	return popperVisible.value && currentSelectLabel.value ? currentSelectLabel.value : props.placeholder
})
const currentSelectLabel = computed(() => {
	return currentSelect.value.label || ''
})
const selectOptions = computed(() => {
	return props.selectOptions.slice()
})
watch(modelValue,val => {
	currentSelect.value = selectOptions.value.find(item => item.id === val) || {}
},{
	immediate: true
})
const onContainerClick = () => {
	if (props.disabled) return
	popperVisible.value = !popperVisible.value
}
const onPopoverShow = () => {
	popperRef.value = popoverRef.value.popperRef.contentRef
	addKey.value = ''
	selectInputRef.value.focus()
	nextTick(() => {
		currentHoverItem.value = currentSelect.value
		scrollIntoView()
	})
}
const onPopoverHide = () => {
	selectInputRef.value.blur()
}
const onInputFocus = (e) => {
	emit('focus', e)
}
const onInputBlur = (e) => {
	emit('blur', e)
}
const onSelectItemClick = (item) => {
	if (item.disabled) return
	emit('update:modelValue', item.id)
	emit('change', item.id, item)
	popperVisible.value = false
}
const onSelectItemMouseover = (item) => {
	currentHoverItem.value = item
}
const onContainerMouseenter = () => {
	if (props.disabled) return
	showClose.value = !!currentSelect.value.id && props.clearable
}
const onContainerMouseleave = () => {
	if (props.disabled) return
	showClose.value = false
}
const scrollIntoView = () => {
	const container = document.querySelector('.select__dropdown-wrap')
	const selected = container.querySelector(`.select__dropdown-item-${currentSelect.value.id}`)
	if (!selected) {
		container.scrollTop = 0
		return
	}
	const top = selected.offsetTop - 12
	const bottom = top + selected.offsetHeight
	const viewRectTop = container.scrollTop
	const viewRectBottom = viewRectTop + container.clientHeight
	if (top < viewRectTop) {
		container.scrollTop = top
	} else if (bottom > viewRectBottom) {
		container.scrollTop = bottom - container.clientHeight
	}
}
const onClearClick = () => {
	emit('update:modelValue', '')
	emit('change', '', {})
	showClose.value = false
}
const onClosePopover = () => {
	popperVisible.value = false
}
const onAddClick = () => {
	if (!addKey.value || props.disabled) return
	const addOptionData = {
		id: utils.createUUID(),
		label: addKey.value
	}
	selectOptions.value.unshift(addOptionData)
	emit('update:modelValue', addOptionData.id)
	emit('change', addOptionData.id, addOptionData)
	nextTick(() => {
		addKey.value = ''
		selectInputRef.value.focus()
		currentHoverItem.value = currentSelect.value
		scrollIntoView()
	})
}
// [public]
const focus = () => {
	popperVisible.value = true
}
// [public]
const blur = () => {
	popperVisible.value = false
}
defineExpose({
	popperRef,
	focus,
	blur
})
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/varsty.styl'
.fx-select-container {
	display flex
	align-items center
	.input-container {
		position relative
		.select-input {
			padding 0 30px 0 10px
			margin-right 10px
			width 100%
			height 32px
			line-height 32px
			border 1px solid $fxElementBorder
			border-radius 4px
			color $fxGray2
			cursor pointer
			&:hover {
				border-color $fxGray3
			}
			&:focus {
				border-color $fxBlue2
			}
			&::placeholder {
				color $fxPlaceholder
			}
			&.input-disabled {
				background-color: $fxWhite3
				border-color: $fxGray4
				color: $fxGray3
				cursor not-allowed
			}
		}
		.select-arrow-down {
			position absolute
			top 9px
			right 9px
			width 14px
			height 14px
			font-weight bold
			color $fxPlaceholder
			transition: transform 0.3s;
			cursor pointer
			&.disabled {
				cursor not-allowed
			}
		}
		.select-arrow-up {
			transform: rotate(-180deg);
		}
		.select-circle-close {
			position absolute
			top 9px
			right 9px
			width 14px
			height 14px
			font-weight bold
			color $fxPlaceholder
			cursor pointer
		}
	}
	.add-btn{
		padding 8px 15px
		margin-left 10px
    color: $fxWhite
		border: 1px solid $fxElementBorder;
		border-color $fxBlue2
		background-color $fxBlue2
		font-size 12px
		line-height 12px
    border-radius 3px;
		cursor pointer
		&:hover {
			border-color $fxBlue3
			background-color $fxBlue3
		}
		&:active {
			background-color: $fxBlue4
			border-color: $fxBlue4
			color: $fxWhite
			outline 0
		}
		&.btn-disabled {
			background-color: $fxBlue5
			border-color: $fxBlue5
			cursor not-allowed
		}
	}
}
.select__dropdown {
	&-wrap {
		max-height 300px
		overflow auto
		margin-right -10px
	}
	&-item {
		padding 0 5px
		font-size 12px
		line-height 34px
		cursor pointer
		overflow hidden
		text-overflow ellipsis
		white-space nowrap
		&.selected {
			color $fxBlue2
			font-weight bold
		}
		&.hover {
			background-color: $fxWhite3
		}
		&.is-disabled {
			opacity: 0.6
			cursor: not-allowed
		}
	}
}
</style>