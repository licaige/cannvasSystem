<template>
    <div class="order">
        <div class="order_content">
		 	<div class="order_info">
	       		<div class="order_top">
	       			<img src="../assets/images/timer.png" />	       		       		      			
	       			<div class="order_info_right">
	       				<h2>{{orderInfo.roomid}}号桌待门店接单</h2>
	       				<p>请及时联系服务员确认点菜品信息!</p>
	       			</div>	 
	       		</div>
       			<h3>已点菜品{{orderInfo.content_num}}份,合计 : <span class="price">{{orderInfo.price}}元</span> </h3>
	        </div>
            <h3 class="pay-status">支付状态 : 
                <span class="status" v-if="orderInfo.pay_status==0">未支付</span> 
                <span class="status" v-if="orderInfo.pay_status==1">
                    <template v-if="orderInfo.pay_type==1">以通过“微信”支付</template>
                    <template v-if="orderInfo.pay_type==2">以通过“支付宝支付”支付</template>
                </span> 
            </h3>
            <!--订单列表-->
            <div class="order_list">
                    <h3>菜品详情:</h3>
                    <ul class="list" v-if="orderInfo.content_order">
                        <li v-for="(item,index) in orderInfo.content_order" :key="index">
                            <div class="title">{{item.title}}</div>
                            <div class="num">{{item.mount}} 份</div>
                            <div class="price">{{item.price}} 元</div>
                            <div class="delete" v-if="orderInfo.status==0" @click.stop.prevent="deleteOrderFood(item.id)">删除</div>
                        </li>
                    </ul>
            </div>

           <!-- 立即支付按钮 -->
            <div class="do-pay" v-if="orderInfo.price>0">
                <div class="item" @click="doAliPay()">支付宝支付</div>
                <div class="item" @click="doWechatPay()">微信支付</div>
            </div>

		</div>
        <!-- 导航栏组件,展开栏 -->
        <nav-footer></nav-footer>

		<!-- <div id="footer_cart" class="footer_cart">
			<img src="../assets/images/doorder.png"/>
			<p >下单</p>
		</div> -->

    </div>
</template>

<script>
    // 引入navfooter组件
    import NavFooter from './public/NavFooter.vue'
    // 引入配置文件
    import Config from '../model/config.js'
    import storage from '../model/storage'
    import {toast} from '../common/toast/toast.js'
import config from '../model/config.js';
    export default {
        data() {
            return {
                roomid: storage.get('roomid'),      // 房间号
                serial: storage.get('serial'),      // 订单编号
                api: Config.api,                    // api地址
                return_url: Config.return_url,      // 前端支付成功的跳转地址
                orderInfo: {},                      // 订单信息
            }
        },
        components: {NavFooter},
        created() {
            this.getOrderInfo()
        },
        sockets:{	// 接收服务器广播过来的 addcart
            addcart: function(){
                // 收到服务器广播了，重新获取订单数据
                this.getOrderInfo()
            },
        },
        methods: {
            /** 获取整个订单信息 */
            async getOrderInfo() {
                if(this.roomid==null||this.roomid=='') {
                    toast('请先扫码再点餐')
                    return
                }
                try {
                    var result = await this.$ajax.get(`api/food/roomidIsUsed?roomid=${this.roomid}`)
                    if(result.data.success==true) {
                        this.orderInfo = result.data.data
                        this.orderInfo.content_order = JSON.parse(this.orderInfo.content_order)
                        // console.log('订单信息：',this.orderInfo)
                    }else{
                        toast('请扫描二维码点餐')
                    }
                } catch (err){
                    console.log(err)
                }
            },
            /** 删除一个菜 */
            async deleteOrderFood(id) {
                if(this.serial==null||this.serial=='') {
                    toast('请先扫码再点餐')
                    return
                }
                try {
                    var result = await this.$ajax.get(`api/food/deleteOneFood?serial=${this.serial}&id=${id}`)
                    if(result.data.success==true) {
                        // console.log('删除一个菜了', result)
                        // 修改购物车数据的时候，给服务器发送 scoket 数据
                        this.$socket.emit('addcart', '随便写什么')
                        // 重新获取订单信息
                        this.getOrderInfo()
                    }else{
                        toast('请扫描二维码点餐')
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            /** 请求支付宝支付接口 */
            async doAliPay() {
                var _this = this
                var roomid = this.roomid
                var serial = this.serial 
                try {
                    var result = await this.$ajax.post('api/food/doPay', {  // 请求服务器的支付接口地址
                        roomid,serial,                                      // 订单编号，桌号
                        total_price: _this.orderInfo.price,                 // 总价钱
                        return_url: this.return_url                         // 支付成功后的回跳地址（支付成功页面）
                    })
                    // 请求到了服务器给的，支付宝的支付接口了
                    console.log(result.data.result.data) 
                    // 页面跳转到支付宝地址去
                    if(result.data.result.message=='success'){
                        location.href=result.data.result.data        
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            /** 请求微信支付 */
            doWechatPay(){
                var serial = this.serial 
                // 跳转到后端集成了微信支付sdk页面的url地址
                location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+config.wxappid+'&redirect_uri='+config.apiPayUrl+'?serial='+serial+'&response_type=code&scope=snsapi_base#wechat_redirect';
            }
        }
    }
</script>
<style  lang="less" scoped>
    @charset "utf-8";
    .order_content{
        padding: 1rem;
        .order_info{
            background: #fff;
            border-radius: .5rem;
            .order_top{
                display: flex;
                img{
                    width: 5.6rem;
                    height: 5.6rem;
                }
                .order_info_right{
                    flex: 1;
                    padding-top: .5rem;
                }           
            }
            h3{
                line-height: 2;
                padding: .5rem;
                .price{
                    font-size: 2rem;
                    color: red;
                }
            }
        }
        // 支付状态
        .pay-status{
            margin: 1rem auto 0;
            text-indent: 0.5rem;
            .status{
                color:red;
            }
        }
        // 立即支付
        .do-pay {
            width:100%;
            height:40px;
            color:#fff;
            font-size:1.6rem;
            line-height: 40px;
            text-align:center;
            margin-top:1rem;
            margin:1rem auto 0;
            display: flex;
            .item{
                flex:1;
                background:red;
                margin-right:5px;
                &:last-child{
                    margin-right:0;
                    margin-left:5px;
                }
            }
        }
        //  订单列表
        .order_list{
            background: #FFFFFF;
            border-radius: .5rem;
            margin-top: 1rem;
            padding: .5rem;
            h3{
                
                line-height: 2;
            }
            .list{
                li{
                    display: flex;
                    line-height: 2;
                    padding: .5rem 0rem;
                    .title{
                        flex: 2;
                    }
                    .num{
                        flex: 1;
                        text-align: center;
                    }
                    .price{
                        flex: 1;
                        text-align: center;
                    }
                    .delete{
                        flex: 1;
                        text-align: center;
                        color:blue;
                    }
                }
            }
        }
        /*支付页面*/
        .order_pay{
            background: #fff;
            border-radius: .5rem;
            h3{
                padding:2rem 0rem .5rem 0rem;
                font-size: 2rem;
                text-align: center;
            }
            .order_pay_detail{
                display: flex;
                line-height: 2;
                border-bottom: 1px solid #eee;
                padding: .5rem;
                .d_num,.p_num,.order_time{
                    flex:1;
                }
            }
            .order_pay_info{
                line-height: 2;
                display: flex;
                margin: 1rem 0rem;
                padding: .5rem .5rem 1rem .5rem;
                .price_list{
                    flex: 1;
                    .price{
                        font-size: 2rem;
                        color: red;
                    }
                }
                .pay_button{
                    width: 10rem;
                    border-radius: .5rem;
                    background: red;
                    color: #fff;
                    text-align: center;
                    height: 2.6rem;
                    line-height: 2.6rem;
                    position: relative;
                    top:.5rem
                }
            }
        }
    }
</style>
