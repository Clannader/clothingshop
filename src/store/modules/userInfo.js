/**
 * Create by CC on 2020/1/15
 */

'use strict'
import { make } from 'vuex-pathify'
import request from '@/utils/request'
import router, { resetRouter } from '@/router'
import { ROOT_DISPATCH } from '@/store'

const state = {
  namespaced: true,
  roles: null, // 用户权限
  systemConfig: {
    // dateFormat: '',
    // version: '',
    // author: '',
    // copyright: ''
  },
  sessionSchema: {
    // 用户结构
    // adminId: '',
    // adminName: '',
    // adminType: '',
    // lastTime: '',
    // shopId: '',
    // selfShop: '',
    // supplierCode: '',
    // shopName: '',
    // isFirstLogin: true
  }
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  clearRoles: ({ commit }) => {
    commit('roles', '')
  },
  // 获取用户权限
  getRoles: async({ commit, dispatch }) => {
    const [err, data] = await request.post('/api/user/roles', {})
      .then(data => [null, data]).catch(err => [err])
    // 新增获取系统配置信息
    const [configErr, configData] = await request.post('/api/system/config/search', {})
      .then(data => [null, data]).catch(err => [err])
    if (configErr) {
      return Promise.reject(configErr)
    }
    if (err) {
      return Promise.reject(err)
    }
    const roles = data.roles.split(',')
    // 这里遇到一个很奇怪的bug,如果在setSessionSchema之前去修改session
    // 则这个方法是不执行的,并且代码还不会往下执行
    // 应该说dispatch的参数进去后如果有修改,感觉就不会执行,不知道是不是这个现象
    data.roles = roles
    commit('roles', roles)
    commit('systemConfig', configData.config)
    dispatch('setSessionSchema', data['session'])
    return Promise.resolve(data)
  },
  changeRoles: async({ dispatch }) => {
    const [err, result] = await dispatch('getRoles').then(res => [null, res]).catch(err => [err])
    if (err) {
      return
    }
    const roles = result.roles
    resetRouter()
    const accessRoutes = await dispatch('tagsView/generateRoutes', roles, ROOT_DISPATCH)
    router.addRoutes(accessRoutes)
    /**
     * 记录一下如何获取store的module下的state的值
     * 该方法的第一个参数返回中有state rootState rootGetters
     * state返回的是本身的state
     * rootState返回的是全部module的state
     * rootGetters返回的是getters定义的state
     *
     * 如何调用其他module的方法
     * dispatch('其他module的方法名', 参数, { root: true})
     * 1.目前不知道的是如果有同名的方法会如何调用
     * 2.最后一个参数不知道有什么作用不
     * 3.还是说同名方法可以这样调用tagsView/test
     *
     * 记录多个不同路径进入同一个页面是的做法
     * 1.<router-view :key="$route.fullPath"/>
     * 2.使用computed计算值
     * 3.使用watch 检测'$route'或者'$route.path'
     */
  },
  userLogout: () => {
    router.push({ path: '/login' })
  },
  resetRouter: () => {
    resetRouter()
  },
  setSessionSchema: ({ commit, state }, session = {}) => {
    router.app.publicMethods.setUserSession(session)
    // const orgSession = state.sessionSchema || {}
    // for (const key in session) {
    //   orgSession[key] = session[key]
    // }
    commit('sessionSchema', { ...state.sessionSchema, ...session })
  },
  clearSession: ({ commit }) => {
    commit('sessionSchema', {})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
