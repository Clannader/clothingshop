/**
 * Create by CC on 2018/12/12
 */
'use strict'
import { menuRouter } from '@/router'

const tagsView = {
  state: {
    language: localStorage.getItem('language') || 'zh', // 全局语言类型
    menuRouter: menuRouter, // 全局左侧导航栏
    showSnackbar: false, // 全局是否弹消息条,如果弹了,则不能再弹
    mini: localStorage.getItem('sidebarStatus') || false, // 是否收缩左侧栏
    currentRouter: {}, // 当前路由对象
    addViews: [] // 当前面包屑
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
    },
    // 设置当前面包屑数据
    SetAddViews: (state, views = []) => {
      state.addViews = views
    },
    ClearViews: (state) => {
      state.addViews = []
      sessionStorage.setItem('addViews', JSON.stringify([]))
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
    },
    setAddViews({ commit, state }, router) {
      const views = state.addViews // 获取当前views的值
      // 寻找当前路由是否已存在
      const index = views.findIndex(v => v.name === router.name)

      if (index !== -1) {
        // 路由已存在,那么与最后一个元素调换位置即可
      }

      // 遍历全部值,把disabled改成false
      views.map(item => {
        item.disabled = false
      })

      // 加入当前路由值
      const item = {
        text: router.meta.title,
        name: router.name,
        disabled: true
      }

      // views最多保留5个,这里判断如果原值已经是5个,那么删除第一个
      if (views.length === 5) {
        // 先取出第一个元素
        // const first = views[0]
        // TODO 这里判断第一个元素是否是资源锁列表的路由,如果是,那么需要解锁
        // 由于这块业务没有写,先注释掉,以后再说吧

        // 这里直接删除第一个元素
        views.shift()
      }

      views.push(item)
      sessionStorage.setItem('addViews', JSON.stringify(views))
      commit('SetAddViews', views)
    },
    clearViews({ commit }) {
      commit('ClearViews')
    }
  }
}

export default tagsView
