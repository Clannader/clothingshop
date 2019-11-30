/**
 * Create by CC on 2018/12/12
 */
'use strict'
import { menuRouter } from '@/router'

const tagsView = {
  state: {
    language: localStorage.getItem('language') || 'zh',
    menuRouter: menuRouter
  },
  mutations: {
    // 设置语言
    SetLanguage: (state, language = 'zh') => {
      state.language = language
      localStorage.setItem('language', language)
    }
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SetLanguage', language)
    }
  }
}

export default tagsView
