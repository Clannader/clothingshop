/**
 * Create by CC on 2019/12/16
 */
'use strict'

const statisticsRouter = {
  path: 'statistics',
  name: 'Statistics',
  meta: {
    title: 'menu.statistics',
    icon: 'c-statistics',
    right: 'ALL'
  },
  component: () => import('@/views/home')
}

export default statisticsRouter
