/**
 * Create by CC on 2018/11/24
 */
'use strict'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  }
}

const i18n = new VueI18n({
  locale: localStorage.getItem('language') || 'zh',
  messages
})

export default i18n
