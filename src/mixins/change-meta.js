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
    return {
      title: this.$t(`${this.currentRouter.meta.title}`),
      titleTemplate: '%s - Clothingshop'
    }
  }
}
