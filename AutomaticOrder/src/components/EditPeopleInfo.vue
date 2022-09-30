<template>
    <div id="start">
		<div  class="start_content">			
			<header class="start_header">				
				<img src="../assets/images/canju.png"/> 修改用餐人数
			</header>			
			<p class="notice">请选择正确的用餐人数</p>
			<div class="content">
				<ul class="user_list">
					<li :class="{active:item==p_num}" v-for="(item, index) in 12" :key="index" @click="p_num=item"><span>{{item}}人</span></li>
				</ul>
                <div class="mark_input">
                    <input type="text" v-model='p_input' placeholder="您还有其它要求吗（可不填）"/>
                </div>
                <ul class="mark_list">
                    <li :class="{active:item==mark_choose}" v-for="(item,index) in markList" :key="index" @click="mark_choose=item"><span>{{item}}</span></li>
                </ul>
			</div>
		</div>
        <div id="start_cancel" class="start_cancel" @click="$router.go(-1)">
            <span>取消修改</span>
        </div>
        <div id="start_ok" class="start_ok" @click="addPeopleInfo()">
            <span>确认修改</span>
        </div>
    </div>
</template>

<script>
    // 引入提示组件
    import {toast} from '../common/toast/toast.js'
    import storage from '../model/storage'

    export default {
        data() {
            return {
                roomid: storage.get('roomid'),  // 房间号
                markList: ['微辣','中辣','麻辣'],       // 用户需求
                mark_choose: '',                        // 用户选中了哪项要求
                p_num: 0,           // 用餐人数
                p_input: '',        // 用户选择的要求
            }
        },
        created() {
            this.getPeopleInfoList()
        },
        methods: {
            /** 增加用户信息 */
            async addPeopleInfo() {
                // 拼合成用户需求
                var p_mark = this.p_input?this.p_input+','+this.mark_choose : this.mark_choose
                if(!this.p_num){
                    toast('请选择用餐人数')
                    return
                }
                try {
                    var result = await this.$ajax.post('api/food/addPeopleInfo',{
                        roomid: this.roomid,
                        p_mark: p_mark,
                        p_num: this.p_num
                    })
                    // console.log(result)
                    if(result.data.success==true){
                        // 修改用户数据的时候，给服务器发送 scoket 数据
                        this.$socket.emit('addcart', '用户数据修改了')
                        // 成功以后跳转到购物车页面
                        this.$router.push({name:'Cart'})
                    } else {
                        toast(result.data.msg)
                    }
                } catch (err){
                    console.log(err)
                }
            },
            /** 获取用户信息 */
            async getPeopleInfoList() {
                try {
                    var result = await this.$ajax.get(`api/food/roomidIsUsed?roomid=${this.roomid}`)
                    if(result.data.success==true) {
                        var peopleList = result.data.data
                        this.p_input = peopleList.p_mark
                        this.p_num = parseInt(peopleList.p_num)
                    }
                    // console.log(result)
                } catch (err){
                    console.log(err)
                }
            }
        }
    }
</script>
<style  lang="less" scoped>
    @charset "utf-8";
    .start_content{
        .start_header{
            height: 3.2rem;
            line-height: 3rem;
            background: #000;
            color: #fff;
            width: 10rem;
            margin: 5rem auto 0rem auto;
            border-radius: .5rem;
            img{
                height:2.2rem;
                line-height: 2.2rem;
                position: relative;
                top:.5rem;
                margin-left: 0.9rem;
            }
        }
        .notice{
            color: red;
            text-align: center;
            margin:1rem 0rem;
        }
        .mark_input{
            padding: 1rem;
            input{
                height: 3rem;
                line-height:3rem;
                width:100%;
                border:1px solid #eee;
            }
        }
        .user_list,.mark_list{
            display: flex;
            flex-wrap: wrap;
            padding: .5rem;
            li{
                width: 25%;
                padding: .5rem;             
                box-sizing: border-box;   /*盒子的宽度=盒子本身宽度    默认 盒子的宽度=盒子的宽度+padding+border*/
                span{
                    display: block;
                    width: 100%;
                    height: 3.2rem;
                    line-height: 3.2rem;
                    text-align: center;
                    background: #fff;
                    border-radius: .5rem;
                    border: 1px solid #ccc;
                }
            }
            li.active{
                span{
                    background: red;                 
                    border: 1px solid red;
                    color:#fff;
                }
            }
        }

    }
    .start_ok{
        position: fixed;
        bottom: 5rem;
        right: 20%;
        width: 4.4rem;
        height: 4.4rem;
        border-radius: 50%;
        background: red;
        color: #fff;
        span{
            display: block;
            width: 2.4rem;
            margin: 0 auto;
            position: relative;
            top:0.5rem;
            text-align:center;
        }
    }
    .start_cancel{
        position: fixed;
        bottom: 5rem;
        left: 20%;
        width: 4.4rem;
        height: 4.4rem;
        border-radius: 50%;
        background: red;
        color: #fff;
        span{
            display: block;
            width: 2.4rem;
            margin: 0 auto;
            position: relative;
            top:0.5rem;
            text-align:center;
        }
    }
</style>
