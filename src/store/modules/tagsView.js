/**
 * Create by CC on 2018/12/12
 */

'use strict'
import { make } from 'vuex-pathify'
import { menuRoutes, constantRoutes, phoneRoutes } from '../../router'
import Methods from '@/utils/methods'
import moment from 'moment'

// 这里用不了Methods的方法,因为state的初始化不行,其他方法可以
function convertStringToBoolean(str = '') {
  return (typeof str === 'string' && str === 'true') || (typeof str === 'boolean' && str)
}

// 定义store的基础变量名
const state = {
  language: localStorage.getItem('language') || 'zh', // 全局语言类型
  menuRouter: [], // 全局左侧导航栏
  showSnackbar: false, // 全局是否弹消息条,如果弹了,则不能再弹
  mini: convertStringToBoolean(localStorage.getItem('sidebarStatus')) || false, // 是否收缩左侧栏
  currentRouter: {}, // 当前路由对象
  addViews: [], // 当前面包屑
  drawer: null // 左侧栏是否隐藏,当窗口小于一定px时就会隐藏 true显示,false隐藏
}

// 把state定义的自动生成对应的mutations
// 调用使用名字即可,例如commit('language')
const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  setLanguage: ({ commit }, language = 'zh') => {
    let momentLang = ''
    switch (language) {
      case 'zh':
        momentLang = 'zh-cn'
        break
      case 'en':
        momentLang = 'en'
        break
    }
    moment.locale(momentLang)
    localStorage.setItem('language', language)
    commit('language', language)
  },
  setMini: ({ commit }, mini = false) => {
    localStorage.setItem('sidebarStatus', mini)
    commit('mini', mini)
  },
  clearCurrentRouter: ({ commit }) => {
    commit('currentRouter', {})
  },
  setAddViews: ({ commit, state }, router) => {
    // 这个设置views真的很坑,需要很熟悉vue的加载顺序才能写得出来
    // 首先先申明加载顺序,进入路由,调用setAddViews方法,再进入组件,然后才调用setAddViews的then方法
    // 所以保存路由不能在setAddViews中保存,需要在then方法后面执行
    const views = state.addViews // 获取当前views的值,第一次进来时,该值是[]
    // 寻找当前路由是否已存在
    const index = views.findIndex(v => v.path === router.fullPath)
    // 加入当前路由值
    const item = {
      text: router.meta.title,
      path: router.fullPath,
      i18nParams: router.meta.i18nParams,
      disabled: true
    }

    // 由于动态路由可能导致路由不存在,也加进了views里面
    // 如果没有text,则不加进去
    if (!item.text) {
      return
    }

    // 第一次进来index为-1
    if (index !== -1) {
      // 路由已存在,那么与最后一个元素调换位置即可
      // 需求制定
      // 1.进入首页不显示面包屑
      // 2.首页永远是第一个
      if (item.path === '/home') {
        // 如果进入首页,清空views
        // TODO 记得解锁
        if (views.length > 1) {
          // 这里是进入首页之后,清空首页后面的全部路由
          views.splice(1, views.length - 1)
        }
        return
      }
      // 拷贝一个对象出来,否则对象地址一样,修改值会影响views里面的元素
      // const lastEle = Object.assign({}, views[views.length - 1], {
      //   disabled: false
      // })
      // 2个元素交换位置,先把其中一个插入到原本位置,再把另一个插入到另一个位置
      // 这里是路由交换逻辑
      // views.splice(index, 1, lastEle)
      // views.splice(views.length - 1, 1, item)

      // 改为一直往后加的逻辑
      // 先把当前存在的这个删除掉
      views.splice(index, 1)
      // 更新最后一个元素的状态值
      views[views.length - 1].disabled = false
      views.push(item)
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
    commit('addViews', views)
  },
  clearViews: ({ commit }) => {
    // TODO 这里应该不能直接这样删除,如果碰到锁资源路由需要解锁,所以这里还得遍历views才可以
    commit('addViews', [])
  },
  // 生成权限路由
  generateRoutes: ({ commit, rootState }, roles) => {
    // 首先找到登录页的路由在无权限路由的数组的位置,虽然定义的是在第0位,为了代码的准确性,自己找一遍
    // 克隆一个对象
    const cloneRoutes = Methods.extend(true, [], constantRoutes)
    // const cloneRoutes = [...constantRoutes]
    const loginIndex = cloneRoutes.findIndex(v => v.path === '/')
    const loginRoutes = cloneRoutes[loginIndex]

    // 根据权限计算好menuRouter
    const mobile = rootState.userInfo.sessionSchema.mobile
    let router
    if (mobile) {
      loginRoutes.component = () => import('components/phoneHomePage')
      router = filterAsyncRoutes(phoneRoutes, roles)
    } else {
      router = filterAsyncRoutes(menuRoutes, roles)
    }
    loginRoutes.children = router

    commit('menuRouter', loginRoutes.children)
    return Promise.resolve(cloneRoutes)
  },
  clearMenuRouter: ({ commit }) => {
    commit('menuRouter', [])
  }
}

const filterAsyncRoutes = function(routes, roles) {
  const tempRoutes = []
  // 路由名重复加载问题
  routes.forEach(route => {
    const temp = { ...route }
    if (temp.children && temp.children.length > 0) {
      // 有子路由的情况
      const groupRoutes = filterAsyncRoutes(temp.children, roles)
      if (groupRoutes.length > 0) {
        temp.children = groupRoutes
        tempRoutes.push(temp)
      }
    } else {
      // 没有子路由时
      if (!temp.meta.right) {
        // 没有right节点的时候默认开放路由
        tempRoutes.push(temp)
      } else if (roles.indexOf(temp.meta.right) !== -1) {
        tempRoutes.push(temp)
      }
    }
  })

  return tempRoutes
}

const getters = {
  // mini: state => {
  //   // 这里要对mini的值进行转换,因为存进去的有可能是string,但是用的时候必须是boolean,要不然报错
  //   return Methods.convertStringToBoolean(state.mini)
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
