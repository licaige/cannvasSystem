<template>
    <div class="home">
        <!-- 导航栏 -->
        <header class="index_header">
			<div class="hlist" @click.stop.prevent="$router.push({name:'Hot'})">
				<img src="../assets/images/rexiao.png"/>
				<p>热销榜</p>				
			</div>
			<div class="hlist" @click.stop.prevent="$router.push({name:'New'})">
				<img src="../assets/images/caidan.png" />
				<p>最新菜品</p>				
			</div>
			<div class="hlist" @click.stop.prevent="$router.push({name:'Search'})">
				<img src="../assets/images/sousuo.png"/>
				<p>搜你喜欢</p>				
			</div>
		</header>
        <!-- 侧边栏 -->
		<aside class="left_cate" id="left_cate">
            <ul>
                <li v-for="(item, index) in list" :key="index" @click.stop.prevent="changeList(index)">{{item.title}}</li>
            </ul>
            <div id="nav_cate" class="nav_cate">
                <img src="../assets/images/nav.png"/>
                <p>菜单</p>
            </div>
		</aside>
        <!-- 菜品内容 -->
		<div class="content">
			<div class="item" v-for="(item, index) in list" :key="index">
				<h3 class="item_cate">{{item.title}}</h3>
				<ul class="item_list">
					<li v-for="(food,i) in item.list" :key="i">	
						<div class="inner">
							<router-link :to="{name:'Pcontent', query:{id:food.id}}">
                                <img v-lazy="api+food.pic" />
                                <p class="title">{{food.title}}</p>						
                                <p class="price">¥{{food.price}}</p>
                            </router-link>
						</div>		
					</li>
				</ul>
			</div>
		</div>
		<!-- 背景模态框 -->
		<div class="bg" id="bg"></div>

		<!-- 导航栏组件 -->
        <nav-footer></nav-footer>

        <!-- 购物车 -->
        <router-link :to="{name:'Cart'}">
            <div id="footer_cart" class="footer_cart">
                <img src="../assets/images/cart.png"/>
                <p>购物车</p>
                <span class="num">{{carNum}}</span>
            </div>
        </router-link>
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
                list: [],                           // 菜品列表
                api: Config.api,                    // url根地址
                carNum: 0,                          // 购物车数量
                serial: storage.get('serial'),      // 订单编号
            }
        },
        components: {
            NavFooter
        },
        mounted() { /** 生命周期函数 */
            this.asideDomInit()
            this.getProductData()
            this.getCartCount()
        },
        sockets:{	// 接收服务器广播过来的 addcart
            addcart: function(){
                // 收到服务器广播了，要更新购物车数量
                this.getCartCount()
            },
        },
        methods: {
            /** 侧滑导航的动画函数 */
            asideDomInit() {
                //按钮
                var navCate=document.getElementById('nav_cate')
                //分类
                var leftCate=document.getElementById('left_cate')
                //背景			  		
                var bg=document.getElementById('bg')	
                var flag=true
                bg.onclick=navCate.onclick=function(){
                    if(flag){
                        flag=false
                        leftCate.style.transform='translate(0,0)'
                        bg.style.display='block'
                    }else{	
                        flag=true
                        leftCate.style.transform='translate(-100%,0)'
                        bg.style.display='none'
                    }
                }
            },
            /** 点击侧边滑动栏，右侧滑动到相应位置 */
            changeList(index) {
                // 获取右侧目标元素节点
                var headerDom = document.querySelectorAll('.content>.item')[index]
                // 右侧滑动到相应位置,兼容移动端
                document.body.scrollTop = document.documentElement.scrollTop = headerDom.offsetTop
                /** 隐藏左侧菜单栏 */
                //分类
                var leftCate=document.getElementById('left_cate')
                //背景			  		   
                var bg=document.getElementById('bg')
                leftCate.style.transform='translate(-100%,0)'
                bg.style.display='none'
                // 启用下面代码，不然会出现一点点击无效的情况
                this.asideDomInit()
            },
            /** 请求所有菜品数据 */
            async getProductData() {
                try {
                    var result = await this.$ajax.get('api/food/productlist')
                    if(result.data.success==true) {
                        this.list = result.data.data
                    }
                } catch (err){
                    console.log(err)
                }
            },
            /** 请求已经点好的菜品总数量 */
            async getCartCount() {
                if(this.serial==null||this.serial==''){
                    toast('请先扫码再下单')
                    return
                }
                try {
                    var result = await this.$ajax.get('api/food/cartCount?serial='+this.serial)
                    // console.log('获取购物车数量', result)
                    this.carNum = result.data.data
                } catch (err){
                    console.log(err)
                }
            }
        }
    }
</script>
<style  lang="less" scoped> 
    @charset "utf-8";
    @import "../assets/css/config.less"; 

    .index_header{
        width: 96%;
        margin: 0 auto;
        height: 4.4rem;
        background:#fff;
        margin-top:1rem;
        display: flex;
        border-radius: .5rem;
        padding: 0.5rem 0;
        .hlist{
            flex: 1;
            text-align: center;
            padding-top: .2rem;
            border-right: 1px solid #eee;
            img{
                width: 2rem;
                height: 2rem;
                margin: 0 auto;
            }
            &:last-child{
                border-right: none;
            }
        }
    }
    /*列表*/
    .item{
        .item_cate{
            text-align: center;
            padding: .5rem;
        }
        .item_list{
            display: flex;
            flex-wrap: wrap;
            padding: 0px .5rem;
            li{
                width: 33.3%;
                padding: .5rem;
                box-sizing: border-box;
                .inner{
                    background: #fff;                
                    width: 100%;
                    border-radius: .5rem;    
                    overflow: hidden; 
                    a{
                        color:#666;
                    }
                    img{
                        width: 100%;
                        height:6rem;
                    }
                    p{
                        padding: .2rem .5rem;
                    }
                    .title{
                        font-weight: bold;
                    }
                }
            }
        }
    }
    /*侧边栏*/
    .left_cate{
        /*css3运动  加过渡效果*/   
        transition: all 0.2s;
        transform: translate(-100%,0);
        z-index: 2;
        width: 8rem;
        height: 100%;
        position: fixed;
        background: #eee;
        top:0px;
        left: 0px;
        text-align:center;
        ul{
            position: absolute;
            height: 100%;
            padding: .5rem;
            z-index: 3;
            background: #eee;
            width: 100%;
            box-sizing: border-box;
            li{
                line-height: 4.4rem;
                width:100%;
            }
        }
        .nav_cate{
            position: absolute;
            right: -3.5rem;
            background: #000;
            top:42%;
            width: 5rem;
            height: 5rem;
            text-align: center;
            border-radius: 0rem 50% 50% 0rem;
            z-index: 2;
            img{
                width: 1.8rem;
                height: 1.8rem;
                margin-left: 1rem;
                margin-top: .7rem;
            }
            p{
                color: #fff;
                margin-left: 1rem; 
                margin-top:-0.3rem
            }
        }
    }
    /*透明层*/
    .bg{
        /*css3运动  加过渡效果*/   
        transition: all 0.2s;
        position: fixed;
        width: 100%;
        height: 100%;   
        background: rgba(132, 128, 128, 0.4); 
        left: 0px; 
        top:0px;
        z-index: 1;
        display: none;
    }
</style>
