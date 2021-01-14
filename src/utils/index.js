/**
 * Create by CC on 2018/12/6
 */
'use strict'
import methods from './methods'
import staticVal from './globalVariable'
import appSnackbar from '../plugins/core/appSnackbar'

// 把对象挂载到Vue对象上
export function useUtils(app) {
  // app.prototype.publicMethods = methods
  // app.prototype.staticVal = staticVal
  // app.prototype.$toast = appSnackbar

  // 设置只读,不能修改
  Object.defineProperty(app.prototype, 'publicMethods', {
    get() { return methods }
  })
  Object.defineProperty(app.prototype, 'staticVal', {
    get() { return staticVal }
  })
  Object.defineProperty(app.prototype, '$toast', {
    get() { return appSnackbar }
  })
}

