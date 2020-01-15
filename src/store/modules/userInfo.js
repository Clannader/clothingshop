/**
 * Create by CC on 2020/1/15
 */

'use strict'
import request from '@/utils/request'

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
      return Promise.resolve(data)
    }
  }
}

export default userInfo