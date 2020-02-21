'use strict'

// Polyfills for IE Support
import 'babel-polyfill'
import 'event-source-polyfill'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'ant-design-vue/dist/antd.min.css'
// import 'roboto-npm-webfont' // 使用font-family: 'Roboto', sans-serif 字体
import './style/icon/iconfont.css'
import './style/style.scss'
import 'handsontable/dist/handsontable.min.css'

import Vue from 'vue'
import vuetify from './plugins/vuetify'
// 翻译资源文件
import i18n from './i18n'
// 公共方法
import './utils'
import App from './App'
// store结构
import store from './store'
// 路由
import router from './router'

import { Table, Upload, Icon, Input } from 'ant-design-vue'

Vue.component(Table.name, Table)
Vue.component(Table.Column.name, Table.Column)
Vue.component(Table.ColumnGroup.name, Table.ColumnGroup)
Vue.component(Upload.name, Upload)
Vue.component(Upload.Dragger.name, Upload.Dragger)
Vue.component(Icon.name, Icon)
Vue.component(Input.name, Input)

// 注册全局自定义组件
import './plugins/components'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
