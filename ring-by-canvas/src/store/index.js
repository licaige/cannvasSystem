import Vue from 'vue'
import Vuex from 'vuex'

// 安装插件
Vue.use(Vuex)

// 创建对象
const store = new Vuex.Store({
  state:{
    count:12
  },
  mutations:{
    increment(state){
      state.count++
    }
  },
  actions:{

  },
  getters:{

  },
  modules:{
      
  }

})

export default store