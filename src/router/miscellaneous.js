/**
 * Create by CC on 2019/12/16
 */
'use strict'

const miscellRouter = {
  path: 'miscellaneous',
  name: 'Miscellaneous',
  meta: {
    title: 'menu.miscellaneous',
    icon: 'iconfont icon-c-miscellaneous',
    right: 'ALL'
  },
  component: () => import('@/views/home')
}

export default miscellRouter
