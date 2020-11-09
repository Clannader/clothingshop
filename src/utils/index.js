/**
 * Create by CC on 2018/12/6
 */
'use strict'
import Vue from 'vue'
import methods from './methods'
import staticVal from './globalVariable'
import appAlert from '@/plugins/core/appAlert'

// 把对象挂载到Vue对象上
Vue.prototype.publicMethods = methods
Vue.prototype.staticVal = staticVal
Vue.prototype.$toast = appAlert
