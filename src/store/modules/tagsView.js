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
      // 这个设置views真的很坑,需要很熟悉vue的加载顺序才能写得出来
      // 首先先申明加载顺序,进入路由,调用setAddViews方法,再进入组件,然后才调用setAddViews的then方法
      // 所以保存路由不能在setAddViews中保存,需要在then方法后面执行
      const views = state.addViews // 获取当前views的值,第一次进来时,该值是[]
      // 寻找当前路由是否已存在
      const index = views.findIndex(v => v.name === router.name)
      // 加入当前路由值
      const item = {
        text: router.meta.title,
        name: router.name,
        disabled: true
      }

      // 第一次进来index为-1
      if (index !== -1) {
        // 路由已存在,那么与最后一个元素调换位置即可
        // 需求制定
        // 1.进入首页不显示面包屑
        // 2.首页永远是第一个
        if (item.name === 'Home') {
          // 如果进入首页,清空views
          // TODO 记得解锁
          if (views.length > 1) {
            views.splice(1, views.length - 1)
          }
          return
        }
        // 拷贝一个对象出来,否则对象地址一样,修改值会影响views里面的元素
        const lastEle = Object.assign({}, views[views.length - 1], {
          disabled: false
        })
        // 2个元素交换位置,先把其中一个插入到原本位置,再把另一个插入到另一个位置
        views.splice(index, 1, lastEle)
        views.splice(views.length - 1, 1, item)
        return
      }

      // 遍历全部值,把disabled改成false
      views.map(item => {
        item.disabled = false
      })

      // views最多保留6个,这里判断如果原值已经是6个,那么删除第二个,因为第一个是首页,不能删除
      if (views.length >= 6) {
        // 先取出第二个元素
        // const two = views[1]
        // TODO 这里判断第二个元素是否是资源锁列表的路由,如果是,那么需要解锁
        // 由于这块业务没有写,先注释掉,以后再说吧

        // 这里直接删除第二个元素
        views.splice(1, 1)
        // 加这一句的原因是,怕views已经是大于6个了,即使删除第二个元素还是大于6个,直接把后面的全删了
        // 删除第二个元素后,应该只剩5个
        // 避免代码出bug
        if (views.length > 5) {
          // TODO 这里需要调用循环解锁路由,以后写一个解锁路由的方法,一个个循环即可
          views.splice(5, views.length - 5)
        }
      }
      views.push(item)
      commit('SetAddViews', views)
    },
    clearViews({ commit }) {
      // TODO 这里应该不能直接这样删除,如果碰到锁资源路由需要解锁,所以这里还得遍历views才可以
      commit('ClearViews')
    }
  }
}

export default tagsView
