/**
 * Create by CC on 2020/11/22
 */
'use strict'

import '@mdi/font/css/materialdesignicons.css'
import Vuetify from 'vuetify'

const opts = {
  breakpoint: {
    mobileBreakpoint: 960 // 当窗口小于960px时,系统就认为是手机模式
  },
  icons: {
    iconfont: ['mdiSvg'] // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
  },
  theme: {
    themes: {
      light: {
        primary: '#0055b8'
      }
    }
  }
}

export function useVuetify(app) {
  app.use(Vuetify)
}

export default new Vuetify(opts)
