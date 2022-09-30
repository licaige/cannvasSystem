<template>
    <div id="start">
		<div  class="start_content">			
			<header class="start_header">				
				<img src="../assets/images/canju.png"/> 用餐人数
			</header>			
			<p class="notice">请选择正确的用餐人数 ，小二马上给你送餐具</p>
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
        <div id="start" class="start" @click="addPeopleInfo()">
            <span>开始点菜</span>
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
                markList: ['微辣','中辣','麻辣'],        // 用户需求
                mark_choose: '',                        // 用户选中了哪项要求
                p_num: 0,                               // 用餐人数
                p_input: '',                            // 用户选择的要求
                roomid: storage.get('roomid')          // 桌子号
            }
        },
        created() {
           this.roomidIsUsed() 
        },
        methods: {
            /** 判断此桌子是否在使用中 */
            async roomidIsUsed() {
                if(this.roomid==null||this.roomid==''){
                    toast('请先扫码再下单')
                }
                try {
                    var result = await this.$ajax.get('api/food/roomidIsUsed?roomid='+this.roomid)
                    if(result.data.success==true){  //使用中
                        console.log('判断此桌子是否在使用中:', result)
                        storage.set('serial', result.data.data.serial)  // 本地保存订单编号
                        // console.log(storage.get('serial'));
                        
                        if(result.data.data.price>0){ // 此桌使用中，已经提交订单，跳转到支付页面
                            this.$router.push({name:'Order'})                
                        } else {    // 此桌使用中，但是还没提交订单，跳转到菜单页面
                            this.$router.push({name:'Home'})                
                        }
                    }else{  //没有使用                         
                        storage.set('serial', '')                       // 清除本地保存订单编号
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            /** 桌子没有使用，需要增加用户信息 */
            async addPeopleInfo() {
                // 拼合成用户需求
                var p_mark = this.p_input?this.p_input+','+this.mark_choose : this.mark_choose
                if(this.roomid==null||this.roomid==''){
                    toast('请先扫码再下单')
                }
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
                    // console.log('用户基本信息，保存了数据了',result.data)
                    if(result.data.success==true){  //保存成功
                        storage.set('serial', result.data.data.serial)  // 本地保存订单编号
                        this.$router.push({name:'Home'})                // 成功以后跳转到首页
                    } else {
                        toast(result.data.msg)
                    }
                } catch (error){
                    console.log(error)
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
                margin-left: 1.5rem;
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
    .start{
        position: fixed;
        bottom: 2rem;
        left: 50%;
        margin-left: -3rem;
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        background: red;
        color: #fff;
        span{
            display: block;
            width: 2.4rem;
            margin: 0 auto;
            position: relative;
            top:1.5rem;
        }
    }
</style>
