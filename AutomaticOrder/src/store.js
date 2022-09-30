import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'     //调错
import User from './common/js/user.js'          //用户原型
Vue.use(Vuex)

//测试工具,调试模式，debug为true就会开启//严格模式：监测state的修改，是否是通过mutaions来修改的
const debug = process.env.NODE_ENV !== 'production'

//定义常量
export const SET_USER = 'SET_USER'                  //用户对象
//定义用户对象
var user = new User({ //用户对象
    tel: ''
})

//本地获取用户对象,如果存在，就给vuex用户信息赋值
var local_user = localStorage.getItem('wx_user')
local_user = JSON.parse(local_user)
if(local_user){
    user = local_user
}

//创建vuex对象仓库
var store = new Vuex.Store({
    state: {    //组件获取数据： this.$store.state.***
        user,   //用户对象  
    },
    getters: {  //组件获取方法： this.$store.getters.****
        user(state) {     //返回用户信息
            return state.user
        },
        user_tel(state) {   //返回用户电话
            return state.user.tel
        }
    },
    mutations:{     //组件获取方法： this.$store.commit('方法名', 参数)
        SET_USER(state, user){  //修改用户信息
            state.user = user
        },
        SET_USER_TEL(state, user_tel) { //修改用户电话
            state.user.tel = user_tel
        },
        SET_USER_PWD(state, user_pwd) { //修改用户登录
            state.user.pwd = user_pwd
        },
    },
    actions: { //设置一系列mutations
        //修改播放信息，播放歌曲
        // selectPlay({commit, state}, {list, index}) {
        //     commit(SET_SEQUENCE_LIST, list)   
        // }
    },
    strict: debug,
    plugins: debug?[createLogger()]:[]
})

export default store