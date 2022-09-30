<template>
    <div class="search">
        <header class="search_header header">
			<input class="search" type="search" placeholder="请输入菜的名称" v-model="key"/>
		</header>
		<div class="search_content">	
			<ul class="item_list clearfix" v-if="foodList.length>0">
				<li v-for="item in foodList" :key="item.id" @click.stop.prevent="$router.push({name:'Pcontent', query:{id:item.id}})">
					<img class="item_img" v-lazy="api+item.pic"/>
					<div class="inner">
						<h3 class="title">
							{{item.title}}
							<p class="price">¥{{item.price}}/份</p>
						</h3>							
						<span class="description">{{item.description}}</span>
					</div>
				</li>
			</ul>
			<div class="none" v-else>{{notice}}</div>
		</div>
		<!-- 导航栏组件,展开栏 -->
        <nav-footer></nav-footer>
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
				foodList: [],						//食品列表
				api: Config.api,            		// 接口跟地址
				key: '',							// 搜索的关键字
				notice: '请搜索您喜欢的菜！',	      //提示文字	
			}
		},
		components: {NavFooter},
		created() {
			// this.getHotFood()
		},
		methods: {
			/** 获取最热门的菜 */
            async getHotFood() {
				if(this.key.trim()==''){
					toast('请输入菜名')
					return
				}
                try {
                    var result = await this.$ajax.get(`api/food/searchFood?key=`+this.key)
                    if(result.data.success==true) {
                        this.foodList = result.data.data
						// console.log('最热门的菜：', this.foodList)
						if(this.foodList.length==0){
							this.notice="没有搜索到您想要的菜"
						}
                    }
                } catch (err){
                    console.log(err)
                }
            },
		},
		watch: {
			/** 用户输入关键字，调取接口 */
			key(curVal,oldVal){
				this.getHotFood()
			},
		}
	}
</script>
<style  lang="less" scoped>
    .search_header{
        height: 5rem;
        line-height: 5rem;
        text-align: center;
        width: 100%;
        .search{
            width: 90%;
            height: 3.8rem;
            line-height:3.8rem;
            border-radius: .5rem;
            border: 1px solid #eee;
			text-indent:0.5rem;
        }
    }
    .search_content{
		.none{
			background: none;
			font-size: 1.4rem;
			text-align:center;
			margin-top:3rem;
		}
        .item_list{
            padding:0rem .5rem;
			background: #fff;
            li{
                display: flex;
                border-bottom: 1px solid #EEE;
                padding-top: 1rem;
                padding-bottom: 1rem;
                img{
                    width: 6rem;
                    height: 6rem;
                }
                .inner{
                    flex: 1;
                    padding-left: 1rem;
					.title{
						margin-bottom:0.5rem;
					}
					.price{
						color:red;
						font-size: 1.4rem;
						float: right;
					}
					.description{
						font-size:1rem;
						color:#999;
					}
                }
            }
        }
    }
</style>
