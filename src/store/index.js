/**
 * Create by CC on 2018/12/12
 */
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import getters from './getters'
import pathify from '@/plugins/vuex-pathify'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  getters,
  plugins: [pathify.plugin]
})

export const ROOT_DISPATCH = Object.freeze({ root: true })
