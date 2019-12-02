'use strict'

import 'vuetify/dist/vuetify.min.css'
import 'ant-design-vue/dist/antd.min.css'
import './style/icon/iconfont.css'
import './style/style.scss'

import Vue from 'vue'
import Vuetify from 'vuetify'
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

Vue.config.productionTip = false

Vue.use(Vuetify)

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
