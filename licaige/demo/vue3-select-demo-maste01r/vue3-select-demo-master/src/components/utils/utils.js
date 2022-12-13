// 生成uuid
const createUUID = function () {
	const myDate = new Date()
	const myM = myDate.getMinutes()
	const myS = myDate.getSeconds()
	const myMS = myDate.getMilliseconds()
	const random = Math.round(Math.random() * 1000000)
	return `${myM}${myS}${myMS}${random}`
}

export default {
	createUUID
}