/**
 * Create by CC on 2020/11/22
 */
'use strict'

import { sync } from 'vuex-pathify'

export default {
  name: 'change-meta',
  computed: {
    ...sync('tagsView', ['currentRouter'])
  },
  metaInfo() {
    const info = {}
    const path = this.currentRouter.path
    if (path) {
      // 这里由于登录页的title异常的原因,退出时还是上一个页面的title
      // 这里判断如果退出了,那么内存就没有path了
      info.title = this.$t(`${this.currentRouter.meta.title}`)
      if (this.currentRouter.meta.i18nParams) {
        info.title = this.$t(`${this.currentRouter.meta.title}`, this.currentRouter.meta.i18nParams)
      }
      info.titleTemplate = path === '/login' ? '%s' : '%s - Clothingshop'
    } else {
      info.title = 'Clothingshop'
    }
    return info
  }
}
