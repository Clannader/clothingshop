import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

const opts = {
  breakpoint: {
    mobileBreakpoint: 960
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
