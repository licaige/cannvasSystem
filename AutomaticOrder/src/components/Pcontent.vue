<template>
    <div class="pcontent">
        <div class="back" @click="$router.go(-1)">返回</div>
		<div class="p_content" v-if="content">		
			<div class="p_info">				
				<img :src="api+content.pic"/>				
				<h2>{{content.title}}</h2>				
				<p class="price">￥{{content.price}} / 份</p>
			</div>
			<div class="p_detial">
				<h3>商品详情</h3>
				<div class="p_content" v-html="content.content"></div>
			</div>
		</div>
		<footer class="pfooter">
			<div class="cart">				
				<strong>数量:</strong>
				<div class="cart_num">
		          <div class="input_left" @click="decNum()">-</div>
		          <div class="input_center">
		              <input type="text" v-model="num" readonly="readonly"  name="num" id="num" />
		          </div>
		          <div class="input_right" @click="addNum()">+</div>				      
		        </div>								
			</div>
            <button class="addcart" @click="addCart()">加入购物车</button>
		</footer>
    </div>
</template>

<script>
    // 引入配置文件
    import Config from '../model/config.js'
    // 引入提示组件
    import {toast} from '../common/toast/toast.js'
    import storage from '../model/storage'

    export default {
        data() {
            return {
                api: Config.api,                    // 根路由
                id : this.$route.query.id,          // 当前所选菜品id
                content: {},                        // 当前菜品的详情
                num: 1,                             // 用户选择的点菜数量
                serial: storage.get('serial'),      // 订单编号   
                roomid: storage.get('roomid'),      // 订单编号   
            }
        },
        created() {
            this.getCurrentData(this.id)
            // indicator(1,1000)
        },
        methods: {
            /** 请求菜品数据 */
            async getCurrentData(id) {
                try {
                    var result = await this.$ajax.get('api/food/productcontent?id='+id)
                    this.content=result.data.data
                } catch (err){
                    console.log(err)
                }
            },
            /** 减少点菜数量 */
            decNum() {
                this.num = this.num==1? 1:--this.num
            },
            /** 添加菜品数量 */
            addNum() {
                ++this.num
            },
            /** 点菜，往服务器传输数据， */
            async addCart() {
                // console.log(this.serial)
                // console.log(this.roomid)
                if(this.serial==null||this.serial==''){
                    toast('请先扫码再点餐')
                    return
                }
                if(this.roomid==null||this.roomid==''){
                    toast('请先扫码再点餐')
                    return
                }
                // 获取数据，加入购物车
                try {
                    var result = await this.$ajax.post('api/food/addcart',{
                        serial: this.serial,
                        num: this.num,
                        food_id: this.content.id,
                    })
                    if(result.data.success==true){
                        // 加入购物车的时候，给服务器发送 scoket 数据
                        this.$socket.emit('addcart', '随便写什么');
                        // 弹出提示信息
                        toast('已添加',500)
                        
                    } else {
                        toast('请扫描二维码再点餐',500)
                    }
                    // 成功后跳转到相应的页面
                    var _this = this
                    setTimeout(function(){
                        // 跳转路由
                        _this.$router.push({name:'Home'})
                    }, 500)
                } catch (err){
                    console.log(err)
                }

            }
        }
    }
</script>
<style  lang="less" scoped>
    .back{
        height: 3.8rem;
        line-height: 3.8rem;
        width: 3.8rem;
        border-radius: 50%;
        background: #000;
        position: fixed;
        top: .5rem;
        left: .5rem;
        color: #fff;
        &:before{
            content: "";
            display: block;
            width: .8rem;
            height: .8rem;
            border-left: .2rem solid #fff;
            border-bottom: .2rem solid #fff;
            float: left;
            position: relative;
            top:1.3rem;
            left:.6rem;
            transform: rotate(45deg);
            margin-right: .4rem;
        }
    }
    .p_content{
        margin-bottom:4rem;
        .p_info{
            background: #fff;      
            img{
                width: 100%;
                height: 18rem
            } 
            h2{
                padding: .2rem .5rem;
            } 
            .price{
                padding: .2rem .5rem;
                color: red;
            }
        }
        .p_detial{
            background: #fff;
            margin-top: 1rem;
            h3{
                padding: .5rem;
            }
            .p_content{
                padding: 1rem;
                img{
                    max-width: 100%;
                    display: block;
                    margin: 0 auto;
                }
                *{
                    line-height: 1.5;
                    color: #666;
                }
            }
        }
    }
    /*底部*/
    .pfooter{
        position: fixed;  
        bottom: 0px;  
        height: 4.4rem;  
        line-height: 4.4rem;
        background: #fff;
        left: 0px;
        width: 100%;
        border-top: 1px solid #eee;
        .cart{
            float: left;
            display:flex;   
            strong{
                flex: 1;
                font-size: 1.6rem;
                padding: 0rem .5rem;
            }
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
        }
        .addcart{
            float: right;
            background: red;
            color: #fff;
            height: 3rem;
            border: none;
            padding: 0 .5rem;
            border-radius: .5rem;
            margin-top: .8rem;
            margin-right: .5rem;
        }
    }

</style>
