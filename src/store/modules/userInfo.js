/**
 * Create by CC on 2020/1/15
 */

'use strict'
import request from '@/utils/request'
import router, { resetRouter } from '@/router'

const userInfo = {
  state: {
    roles: undefined, // 用户权限
    systemConfig: {
      dateFormat: 'dd/MM/yyyy'
    },
    sessionSchema: {
      // 用户结构
      adminId: '',
      adminName: '',
      adminType: '',
      lastTime: '',
      shopId: '',
      selfShop: '',
      supplierCode: '',
      shopName: '',
      isFirstLogin: true
    }
  },
  mutations: {
    SetRoles: (state, roles) => {
      state.roles = roles
    },
    SetSystemConfig: (state, config) => {
      state.systemConfig = config
    },
    SetSessionSchema: (state, session) => {
      state.sessionSchema = session
    }
  },
  actions: {
    // 设置用户权限
    clearRoles({ commit }) {
      commit('SetRoles', '')
    },
    // 获取用户权限
    async getRoles({ commit, dispatch }) {
      const [err, data] = await request.post('/api/user/roles', {})
        .then(data => [null, data]).catch(err => [err])
      if (err) {
        return Promise.reject(err)
      }
      const roles = data.roles.split(',')
      commit('SetRoles', roles)
      // 这里遇到一个很奇怪的bug,如果在setSessionSchema之前去修改session
      // 则这个方法是不执行的,并且代码还不会往下执行
      // 应该说dispatch的参数进去后如果有修改,感觉就不会执行,不知道是不是这个现象
      dispatch('setSessionSchema', data['session'])
      data.roles = roles
      return Promise.resolve(data)
    },
    async changeRoles({ dispatch }) {
      const [err, result] = await dispatch('getRoles').then(res => [null, res]).catch(err => [err])
      if (err) {
        return
      }
      const roles = result.roles
      resetRouter()
      const accessRoutes = await dispatch('generateRoutes', roles)
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
    userLogout() {
      router.push({ path: '/login' })
    },
    resetRouter() {
      resetRouter()
    },
    setSystemConfig({ commit }, config) {
      commit('SetSystemConfig', config)
    },
    setSessionSchema({ commit, state }, session = {}) {
      router.app.publicMethods.setUserSession(session)
      const orgSession = state.sessionSchema || {}
      for (const key in session) {
        orgSession[key] = session[key]
      }
      commit('SetSessionSchema', orgSession)
    },
    clearSession({ commit }) {
      commit('SetSessionSchema', undefined)
    }
  }
}

export default userInfo
