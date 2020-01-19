/**
 * Create by CC on 2018/12/6
 * 公共方法
 */
'use strict'
import api from './request'
import store from '@/store'

const methods = {
  async removeUserSession() {
    // 判断用户是否登录过,避免频繁调退出登录操作
    if (this.getUserSession()) {
      // 这个ajax请求,如果没有参数,也得必须填一个参数{},否则不会执行请求操作
      await this.getPromise(api.post('/api/user/logout', {}))
      // 这里据说由于动态路由的坑,需要重新刷新浏览器才行...
      // location.reload()
    } else {
      store.commit('SetMenuRouter', []) // 清除menuRouter
      store.dispatch('setRoles') // 清除权限
      store.dispatch('clearViews') // 清除面包屑视图
      store.dispatch('setCurrentRouter', {}) // 清除当前路由
    }
    sessionStorage.removeItem('credential')
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('addViews')

  },

  getUserSession() {
    // 获取用户凭证
    return sessionStorage.getItem('credential') || ''
  },

  setUserSession(session = '') {
    // 设置用户凭证
    sessionStorage.setItem('credential', session)
  },

  hotkeys(fn, keyCode, ...args) {
    // 快捷键设置
    // fn 执行方法
    // keyCode 快捷键对应按键代码
    // args 方法参数
    document.onkeydown = (e) => {
      const code = e.key
      if (code === keyCode && typeof fn === 'function') {
        fn.apply(this, args)
        e.preventDefault()
      }
    }
  },

  getPromise(fn) {
    // 获取promise的错误和成功信息
    return fn.then(data => [null, data]).catch(err => [err])
  },

  /**
   * 把code,desc的数组自定义转换key,value的数组
   */
  formatArr(arr, k = 'value', v = 'label') {
    const temp = []
    if (!Array.isArray(arr)) {
      return []
    }
    arr.forEach(value => {
      const obj = {}
      obj[k] = value.code
      obj[v] = value.desc
      temp.push(obj)
    })
    return temp
  },

  convertStringToBoolean(str = '') {
    return (typeof str === 'string' && str === 'true') || (typeof str === 'boolean' && str)
  }
}

// const methods = new Methods()
export default methods
