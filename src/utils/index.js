/**
 * Create by CC on 2018/12/6
 */
'use strict'
import Vue from 'vue'
import methods from './methods'
import staticVal from './globalVariable'
// import snackbar from '@/components/plugin/appSnackbar'

// 把对象挂载到Vue对象上
Vue.prototype.publicMethods = methods
Vue.prototype.staticVal = staticVal
// Vue.prototype.$toast = snackbar
