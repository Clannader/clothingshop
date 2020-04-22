/**
 * Create by CC on 2020/1/15
 */

'use strict'
import request from '@/utils/request'
import router, { resetRouter } from '@/router'

const userInfo = {
  state: {
    roles: undefined // 用户权限
  },
  mutations: {
    SetRoles: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    // 设置用户权限
    setRoles({ commit }) {
      commit('SetRoles', undefined)
    },
    // 获取用户权限
    async getRoles({ commit }) {
      const [err, data] = await request.post('/api/user/roles', {})
        .then(data => [null, data]).catch(err => [err])
      if (err) {
        return Promise.reject(err)
      }
      const roles = data.roles.split(',')
      commit('SetRoles', roles)
      data.roles = roles
      return Promise.resolve(data)
    },
    async changeRoles({ dispatch }) {
      const result = await dispatch('getRoles')
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
       */
    }
  }
}

export default userInfo
