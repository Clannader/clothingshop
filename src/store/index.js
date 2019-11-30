/**
 * Create by CC on 2018/12/12
 */
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  getters
})
