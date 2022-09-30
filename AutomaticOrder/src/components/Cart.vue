<template>
    <div class="cart">
        <div class="cart_content">
			<div class="cart_info" v-if="totalNum">
				<h2>购物车</h2>				
				<div class="p_number">
					<div class="p_number_left">
	       				<p>用餐人数:{{peopleList.p_num}}人</p>
	       				<p>备注:{{peopleList.p_mark}}</p>
	       			</div>	       			
	       			<div class="p_number_right">
                        <router-link :to="{name:'EditPeopleInfo'}">
                            <img src="../assets/images/edit.png"/>
                            <p>修改</p>
                        </router-link>
	       			</div>					
				</div>
				<div class="cart_p_num">
					<p>购物车中总共有{{totalNum}}个菜</p>
	       			<p>合计：<span class="price">¥{{allPrice}}</span></p>
				</div>
			</div>
            <!-- 已经点的菜单 -->
			<div class="cart_list" v-if="totalNum">
				<ul>
					<li class="item" v-for="(item, index) in list" :key="index">
                        <div class="left_food" @click.stop.prevent="$router.push({name:'Pcontent',query:{id:item.id}})">
                            <img v-lazy="api+item.pic"/>       						
                            <div class="food_info">
                                <p>{{item.title}}</p>
                                <p class="price">¥{{item.price}}</p>
                            </div>
                        </div>
                        <div class="right_cart">
                            <div class="cart_num">
                                <div class="input_left" @click="decCount(item, index)">-</div>
                                <div class="input_center">
                                    <input type="text"  readonly="readonly" v-model="item.mount" name="num" id="num" />
                                </div>
                                <div class="input_right" @click="incCount(item, index)">+</div>				      
                            </div>	
                        </div>	
					</li>
				</ul>
			</div>
            <!-- 店铺推荐 -->
			<div class="hot_food">
				<h3>本店顾客最常点的菜</h3>
				<div class="item_list_outer">
					<ul class="item_list">
						<li v-for="item in hotFoodList" :key="item.id">	
                            <div class="inner">
                                <router-link :to="{name:'Pcontent', query:{id:item.id}}">
                                    <img v-lazy="api+item.pic" />
								    <p class="title">{{item.title}}</p>						
								    <p class="price">¥{{item.price}}</p>
                                </router-link>
                            </div>		
						</li>
					</ul>
				</div>
			</div>

            <!-- 用户未点餐 -->
            <div v-if="!totalNum&&peopleList.price==0" class="cart_empty">您的购物车空空的！</div>
            <div v-if="peopleList.price!=0" class="cart_empty">您已经成功提交订单！</div>
		</div>

		<!-- 导航栏组件,展开栏 -->
        <nav-footer></nav-footer>

		<div id="footer_cart" class="footer_cart" @click="addOrder()">
			<img src="../assets/images/doorder.png"/>
			<p v-if="totalNum">下单</p>
			<p v-else>查看</p>
		</div>
    </div>
</template>

<script>
    // 引入navfooter组件
    import NavFooter from './public/NavFooter.vue'
    // 引入配置文件
    import Config from '../model/config.js'
    import storage from '../model/storage'
    import {toast} from '../common/toast/toast.js'

    export default {
        data() {
            return {
                roomid: storage.get('roomid'),  // 房间号
                serial: storage.get('serial'),  // 订单编号
                api: Config.api,                // 接口跟地址
                list: [],                       // 购物车数据
                peopleList: {},                 // 用户列表
                allPrice: 0,                    // 总价钱  
                totalNum: 0,                    // 总数量
                hotFoodList: [],                // 最热门的菜
            }
        },
        components: {NavFooter},
        created() {
            this.getCartData()
            this.getPeopleInfoList()
            this.getHotFood()
        },
        sockets:{	// 接收服务器广播过来的 addcart
            addcart: function(){
                // 收到服务器广播了，重新获取购物车数据
                this.getCartData()
                // 收到服务器广播了，重新获取用户数据
                this.getPeopleInfoList()
            },
        },
        methods: {
            /** 获取购物车数据 */
            async getCartData() {
                if(this.serial==null||this.serial=='') {
                    toast('请先扫码再点餐')
                    return
                }else{
                    try {
                        var result = await this.$ajax.get('api/food/cartList?serial='+this.serial)
                        // console.log('获取购物车数据：', result)
                        if(result.data.success==true){
                            this.list = result.data.data
                            this.getTotalResult()
                        } else {
                            toast('请扫描二维码再点餐',500)
                        }
                    } catch (err){
                        console.log(err)
                    }
                }
            },
            /** 减少购物车数据 */
            async decCount(item, index) {
                if(this.serial==null||this.serial=='') {
                    toast('请先扫码再点餐')
                    return
                }
                try {   // 更新远程服务器数据
                    var food_id = item.id
                    var result = await this.$ajax.get(`api/food/decCart?serial=${this.serial}&food_id=${food_id}`)
                } catch (err){
                    console.log(err)
                }
                if(item.mount==1){//删除这条数据
                    this.list.splice(index,1)
                }else{
                    --item.mount
                }
                this.getTotalResult()
                // 修改购物车数据的时候，给服务器发送 scoket 数据
                this.$socket.emit('addcart', '随便写什么')
            },
            /** 增加购物车数据 */
            async incCount(item, index) {
                if(this.serial==null||this.serial=='') {
                    toast('请先扫描二维码再点餐')
                    return
                }
                try {   // 更新远程服务器数据
                    var food_id = item.id
                    var result = await this.$ajax.get(`api/food/incCart?serial=${this.serial}&food_id=${food_id}`)
                } catch (err){
                    console.log(err)
                }
                ++item.mount
                this.getTotalResult()
                // 修改购物车数据的时候，给服务器发送 scoket 数据
                this.$socket.emit('addcart', '随便写什么');
            },
            /** 计算商品总价 */
            getTotalResult() {
                var allPrice = 0
                var totalNum = 0
                this.list.forEach(item => {
                    allPrice += parseFloat(item.price*item.mount)
                    totalNum += parseInt(item.mount)
                })
                this.allPrice = allPrice
                this.totalNum = totalNum
            },
            /** 获取用户信息 =======================*/
            async getPeopleInfoList() {
                if(this.roomid==null||this.roomid=='') {
                    toast('请先扫码再点餐')
                    return
                }
                try {
                    var result = await this.$ajax.get(`api/food/roomidIsUsed?roomid=${this.roomid}`)
                    if(result.data.success==true) {
                        this.peopleList = result.data.data
                    }else{
                        toast('请先扫码再点餐')
                    }
                } catch (err){
                    console.log(err)
                }
            },
            /** 获取最热门的菜 */
            async getHotFood() {
                try {
                    var result = await this.$ajax.get(`api/food/getHotFood`)
                    if(result.data.success==true) {
                        this.hotFoodList = result.data.data
                        // console.log('最热门的菜：', this.hotFoodList)
                    }
                } catch (err){
                    console.log(err)
                }
            },
            /** 提交订单，打印小票，或者跳转到订单页面 */
            async addOrder() {
                if(this.serial==null||this.serial=='') {
                    toast('请先扫码再点餐')
                    return
                }
                if(this.totalNum!=0){   // 提交订单
                    var serial = this.serial
                    var order = JSON.stringify(this.list)
                    var result = await this.$ajax.post('api/food/addOrder',{serial,order})
                    if(result.data.success == true){    // 保存成功，跳转到订单页面
                        // 修改购物车数据的时候，给服务器发送 scoket 数据，更新数据
                        this.$socket.emit('addcart', '随便写什么')
                        toast('订单提交成功',1000)
                        var _this = this
                        setTimeout(function(){
                            _this.$router.push({name:'Order'})
                        },1000)
                    }else{
                        toast('订单提交失败！')
                    }
                }else{      // 查看订单
                    this.$router.push({name:'Order'})
                }

            }
        }
    }
</script>
<style  lang="less" scoped>
    @charset "UTF-8";
    .cart_content{
        padding: 1rem;
        /*头部信息*/
        .cart_info{
            background: #fff;
            h2{
                text-align: center;
                font-size: 1.8rem;
                padding: .8rem 0px;
                border-bottom: 1px solid #eee;
            }
            border-radius:.5rem;
            padding: .5rem;
            .p_number{
                display: flex;
                padding: .5rem 0;
                border-bottom: 1px solid #eee;
                .p_number_left{
                    flex: 1;
                    p{
                        line-height: 2;
                        &:first-child{
                            color: red;
                        }
                    }
                }
                .p_number_right{
                    width: 4rem;
                    height: 4rem;
                    text-align: center;
                    a{
                        color:#333;
                    }
                    img{
                        width: 1.8rem;
                        height: 1.8rem;
                        margin: 0 auto;
                    }
                }
            }
            /*购物车总数量*/
            .cart_p_num{
                border-bottom: 1px solid #eee;
                p{
                    line-height: 2;
                    .price{
                        font-size: 2.4rem;
                        color:red;
                    }
                }
            }
        }
        /*购物车列表*/
        .cart_list{
            margin-top: 1rem;
            padding: .5rem;
            background: #fff;
            border-radius: .5rem;
            display: flex;
            ul{
                width: 100%;
                .item{
                    display: flex;
                    width:100%;
                    border-bottom: 1px solid #eee;
                    padding: 1rem 0px;
                    .left_food{
                        flex: 1;
                        display: flex;                       
                        img{
                            width: 4rem;
                            height: 4rem;
                            border-radius: 10%;
                            margin-right: .8rem;
                        }
                        .food_info{
                            flex: 1;
                        }
                    }
                    .right_cart{
                        width: 10rem;
                    }
            }
            }
        }
        /*最长点的菜*/
        .hot_food{
            background: #fff;
            margin-top: 1rem;
            border-radius: .5rem;
            margin-bottom: 4rem;
            h3{
                font-size: 1.4rem;
                padding: .5rem 0px;
            }
            .item_list_outer{
                width: 100%;
                overflow-x:auto;
                .item_list{
                    padding: 0px .5rem;                
                    width: 100rem;
                    li{
                        width: 8rem;
                        padding: .5rem;
                        box-sizing: border-box;                    
                        float: left;
                        a{
                            color:#333;
                        }
                        .inner{
                            background: #fff;
                            width: 100%;
                            border-radius: .5rem;
                            overflow: hidden;
                            img{
                                width:100%;
                                height:5rem;
                            }
                        }
                    }
                }
            }
        }
    }
    /*购车加减*/
    .cart_num{
        width: 10rem;      
        display: flex;
        margin-top: .8rem;
        .input_left,.input_right{
            flex: 1;
            width: 2.8rem;
            height: 2.8rem;
            line-height: 2.8rem;
            text-align: center;
            color: red;
            border: 1px solid #eee;
            font-size: 2.4rem;
        }    
        .input_center{
            flex: 1;
            input{
                width: 2rem;
                text-align: center;
                width: 100%;
                height: 2.8rem; 
                border: none;
                    border-top: 1px solid #eee;
                    border-bottom: 1px solid #eee;
                    float: left;
            }
        }
    }
    /*购车空*/
    .cart_empty{
        text-align: center;
        line-height: 3;
        h3{
            font-size: 1.8rem;
        }
    }
</style>
