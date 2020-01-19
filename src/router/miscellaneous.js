/**
 * Create by CC on 2019/12/16
 */
'use strict'

const miscellRouter = {
  path: 'miscellaneous',
  name: 'Miscellaneous',
  to: 'miscellaneous',
  meta: {
    title: 'menu.miscellaneous',
    icon: 'iconfont icon-c-miscellaneous',
    chip: 'new',
    right: '7000'
  },
  component: () => import('@/views/blank')
}

export default miscellRouter
