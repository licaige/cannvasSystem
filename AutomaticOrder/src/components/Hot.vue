<template>
    <div class="hot">
        <header class="hot_header header">
			<div class="title">
				本店热销榜
			</div>			
		</header>
		<div class="hot_content">	
			<ul class="item_list clearfix" v-if="hotFoodList.length>0">
				<li v-for="item in hotFoodList" :key="item.id" @click.stop.prevent="$router.push({name:'Pcontent', query:{id:item.id}})">
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
			<div class="none" v-else>没有数据</div>
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
				hotFoodList: [],				//最热门的菜
				api: Config.api,                // 接口跟地址
			}
		},
		components: {NavFooter},
		created() {
			this.getHotFood()
		},
		methods: {
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
		}
	}
</script>
<style  lang="less" scoped>
    .hot_header{
        height: 4rem;
        line-height: 4rem;
		font-size:1.6rem;
        text-align: center;
        width: 100%;
    }
    .hot_content{
        background:#fff;
        .item_list{
            padding:0rem .5rem;
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
