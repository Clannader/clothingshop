/**
 * Create by CC on 2018/12/12
 */
'use strict'
import { menuRouter } from '@/router'

const tagsView = {
  // 这里的state也可以传一个无参的方法进行初始化默认值
  state: {
    language: localStorage.getItem('language') || 'zh', // 全局语言类型
    menuRouter: menuRouter, // 全局左侧导航栏
    showSnackbar: false, // 全局是否弹消息条,如果弹了,则不能再弹
    mini: localStorage.getItem('sidebarStatus') || false, // 是否收缩左侧栏
    currentRouter: {}
  },
  mutations: {
    // 设置语言
    SetLanguage: (state, language = 'zh') => {
      state.language = language
      localStorage.setItem('language', language)
    },
    // 设置是否显示snackbar
    SetShowSnackbar: (state, show = false) => {
      state.showSnackbar = show
    },
    // 设置左侧栏是否收缩
    SetMini: (state, drawer = false) => {
      state.mini = drawer
      localStorage.setItem('sidebarStatus', drawer)
    },
    // 设置当前路由的Name
    SetCurrentRouter: (state, router = {}) => {
      state.currentRouter = router
    }
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SetLanguage', language)
    },
    setShowSnackbar({ commit }, show) {
      commit('SetShowSnackbar', show)
    },
    setMini({ commit }, drawer) {
      commit('SetMini', drawer)
    },
    setCurrentRouter({ commit }, router) {
      commit('SetCurrentRouter', router)
    }
  }
}

export default tagsView
