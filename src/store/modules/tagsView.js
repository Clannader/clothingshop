/**
 * Create by CC on 2018/12/12
 */
'use strict'
import { menuRouter } from '@/router'

const tagsView = {
  state: {
    language: localStorage.getItem('language') || 'zh', // 全局语言类型
    menuRouter: menuRouter, // 全局左侧导航栏
    showSnackbar: false // 全局是否弹消息条,如果弹了,则不能再弹
  },
  mutations: {
    // 设置语言
    SetLanguage: (state, language = 'zh') => {
      state.language = language
      localStorage.setItem('language', language)
    },
    SetShowSnackbar: (state, show = false) => {
      state.showSnackbar = show
    }
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SetLanguage', language)
    },
    setShowSnackbar({ commit }, show) {
      commit('SetShowSnackbar', show)
    }
  }
}

export default tagsView
