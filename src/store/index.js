/**
 * Create by CC on 2018/12/12
 */
import Vue from 'vue'
import Vuex from 'vuex'

// 真的是神坑啊, vuex-pathify如果需要修改options的参数,需要先引入vuex-pathify
// 简直太坑了...
import pathify from '@/plugins/vuex-pathify'
import modules from './modules'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  getters,
  plugins: [pathify.plugin]
})

export const ROOT_DISPATCH = Object.freeze({ root: true })
