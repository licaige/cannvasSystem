import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import canva from './module/canva'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wh: {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    },
  },
  mutations: {
    windowResize(state, wh) {
      state.wh.innerWidth = wh.innerWidth;
      state.wh.innerHeight = wh.innerHeight;
    },
  },
  actions: {
    //
  },
  getters:{

  },
  modules: {
    user,
    app,
    canva
  }
})
