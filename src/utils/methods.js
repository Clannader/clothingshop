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
    }
    store.commit('SetMenuRouter', []) // 清除menuRouter
    store.dispatch('setRoles') // 清除权限
    store.dispatch('clearViews') // 清除面包屑视图
    store.dispatch('setCurrentRouter', {}) // 清除当前路由
    store.dispatch('resetRouter')// 重置路由,避免不刷新页面导致缓存
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

  convertStringToBoolean(str = '') {
    return (typeof str === 'string' && str === 'true') || (typeof str === 'boolean' && str)
  },

  // 哎,自己写一个深拷贝吧,不然太不习惯了
  extend: function() {
    let options; let name; let src; let copy; let copyIsArray; let clone
      let target = arguments[0] || {}
      let i = 1
      const length = arguments.length
      let deep = false

    // Handle a deep copy situation
    if (typeof target === 'boolean') {
      deep = target

      // Skip the boolean and the target
      target = arguments[i] || {}
      i++
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== 'object' && typeof target !== 'function') {
      target = {}
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
      target = this
      i--
    }

    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          src = target[name]
          copy = options[name]

          // Prevent never-ending loop
          if (target === copy) {
            continue
          }

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (this.isPlainObject(copy) ||
            (copyIsArray = Array.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false
              clone = src && Array.isArray(src) ? src : []
            } else {
              clone = src && this.isPlainObject(src) ? src : {}
            }

            // Never move original objects, clone them
            target[name] = this.extend(deep, clone, copy)

            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }

    // Return the modified object
    return target
  },

  isPlainObject(obj) {
    const class2type = {}
    const toString = class2type.toString
    const hasOwn = class2type.hasOwnProperty
    const fnToString = hasOwn.toString

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if (!obj || toString.call(obj) !== '[object Object]') {
      return false
    }

    const proto = Object.getPrototypeOf(obj)

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if (!proto) {
      return true
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    const Ctor = hasOwn.call(proto, 'constructor') && proto.constructor
    return typeof Ctor === 'function' && fnToString.call(Ctor) === fnToString.call(Object)
  }
}

// const methods = new Methods()
export default methods
