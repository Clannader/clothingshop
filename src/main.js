'use strict'

// Polyfills for IE Support
// import 'babel-polyfill'
// import 'event-source-polyfill'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import 'ant-design-vue/dist/antd.min.css'
// import 'roboto-npm-webfont' // 使用font-family: 'Roboto', sans-serif 字体
import './styles/icon/iconfont.css'
import './styles/style.scss'

import Vue from 'vue'
import vuetify from './plugins/vuetify'
import { registerPlugins } from './plugins'
// 翻译资源文件

import i18n from './i18n'
import 'moment/locale/zh-cn'
// 公共方法
// import './plugins/core/overrideObject'
// import './utils'
import App from './App'
// store结构
import store from './store'
// 路由
import router from './router'
// 注册全局自定义组件
// import './plugins/components'
registerPlugins(Vue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
