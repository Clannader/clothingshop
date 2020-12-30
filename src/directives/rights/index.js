/**
 * Create by CC on 2020/12/30
 */
'use strict'

import store from '@/store'
import rightsCode from '@/utils/rightsCode'

function inserted(el, binding/*, vnode*/) {
  const value = binding.value
  const roles = store.getters.roles

  if (Array.isArray(value) && value.length > 0) {
    let hasPermission = true
    value.some(role => {
      if (!roles.includes(rightsCode[role].code)) {
        hasPermission = false
        return true // 跳出循环
      }
    })
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}

function unbind() {

}

function update(el, binding) {
  // if (binding.value === binding.oldValue) return
  //
  // inserted(el, binding)
}

/**
 * Example <div v-rights=['1000', '1002']></div>
 * @type {{inserted: inserted, unbind: unbind}}
 */
export const Rights = {
  inserted,
  unbind,
  update
}

export default Rights
