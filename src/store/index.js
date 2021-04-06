import Vue from 'vue'
import Vuex from 'vuex'
import {apiDomain, staticDomain} from '@/tool/path'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiDomain,
    staticDomain,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
