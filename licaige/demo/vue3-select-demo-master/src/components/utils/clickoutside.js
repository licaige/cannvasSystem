const nodeList = new Map()
const ctx = '@@fxClickoutsideContext'

let startClick
const isElement = (e) => {
	if (typeof Element === "undefined")
		return false
	return e instanceof Element
}
document.addEventListener("mousedown", (e) => startClick = e)
document.addEventListener("mouseup", (e) => {
	for (const handlers of nodeList.values()) {
		for (const { documentHandler } of handlers) {
			documentHandler(e, startClick)
		}
	}
})

function createDocumentHandler(el, binding) {
	let excludes = []
	if (Array.isArray(binding.arg)) {
		excludes = binding.arg
	} else if (isElement(binding.arg)) {
		excludes.push(binding.arg)
	}
	return function(mouseup, mousedown) {
		const popperRef = binding.instance.popperRef
		const mouseUpTarget = mouseup.target
		const mouseDownTarget = mousedown === null ? void 0 : mousedown.target
		const isBound = !binding || !binding.instance
		const isTargetExists = !mouseUpTarget || !mouseDownTarget
		const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget)
		const isSelf = el === mouseUpTarget
		const isTargetExcluded = excludes.length && excludes.some((item) => item === null ? void 0 : item.contains(mouseUpTarget)) || excludes.length && excludes.includes(mouseDownTarget)
		const isContainedByPopper = popperRef && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget))
		if (isBound || isTargetExists || isContainedByEl || isSelf || isTargetExcluded || isContainedByPopper) {
			return
		}
		binding.value(mouseup, mousedown)
	}
}

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-clickoutside="handleClose">
 * ```
 */
export default {
	beforeMount(el, binding) {
		if (!nodeList.has(el)) {
			nodeList.set(el, [])
		}
		nodeList.get(el).push({
			documentHandler: createDocumentHandler(el, binding),
			bindingFn: binding.value
		})
	},
	updated(el, binding) {
		if (!nodeList.has(el)) {
			nodeList.set(el, [])
		}
		const handlers = nodeList.get(el)
		const oldHandlerIndex = handlers.findIndex((item) => item.bindingFn === binding.oldValue)
		const newHandler = {
			documentHandler: createDocumentHandler(el, binding),
			bindingFn: binding.value
		}
		if (oldHandlerIndex >= 0) {
			handlers.splice(oldHandlerIndex, 1, newHandler)
		} else {
			handlers.push(newHandler)
		}
	},
	unmounted(el) {
		nodeList.delete(el)
	}
}
