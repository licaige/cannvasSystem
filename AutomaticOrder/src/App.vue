<template>
	<div id="app">
		<!--router-link :to="{name:'Start'}">开始</router-link>
		<router-link :to="{name:'Home'}">点餐</router-link>
		<router-link :to="{name:'Cart'}">购物车</router-link-->
		<router-view></router-view>
	</div>
</template>

<script>
	// 引入公共的scss
	import './assets/css/basic.less' 

	export default {
		data () {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		components: {},
		created() {},
	}
</script>

<style lang="less">

</style>
