import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

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

export default new Vuetify(opts)
