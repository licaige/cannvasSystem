<template>
    <div class="navfooter">
        <div id="footer_nav" class="footer_nav" @click.stop.prevent="flag=!flag">
			<img src="../../assets/images/navigation.png"/>
			<p>导航</p>
		</div>
	 	<div class="footer_nav_show" v-if="flag" @click="flag=false">
            <ul class="list">                    
                <li @click.stop.prevent="$router.push({name:'Home'})">
                    <img src="../../assets/images/menu.png"/>
                    <p>菜单</p>
                </li>
                <li @click.stop.prevent="$router.push({name:'Cart'})">
                        <img src="../../assets/images/cart.png"/>
                    <p>购物车</p>
                </li>
                <!-- <li @click.stop.prevent="$router.push({name:'Order'})">	
                    <img src="../../assets/images/order.png"/>
                    <p>我的订单</p>
                </li>				 -->
                <li @click.stop.prevent="$router.push({name:'Order'})">	
                    <img src="../../assets/images/wallet.png"/>
                    <p>结账</p>
                </li>
                <li @click.stop.prevent="flag=!flag">
                    <img src="../../assets/images/close.png"/>
                    <p>返回</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            flag: false,
        }
    },
    components: {},
    methods: {
        aaa(){
            alert(1)
        }
    }
}
</script>
<style  lang="less" scoped>

</style>
