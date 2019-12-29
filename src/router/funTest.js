/**
 * Create by CC on 2019/12/29
 */
'use strict'

const TestRouter = {
  path: 'test',
  name: 'FunctionTest',
  meta: {
    title: 'menu.test',
    icon: 'crop',
    right: 'ALL'
  },
  component: () => import('@/views/test'),
  children: [
    {
      path: 'one',
      name: 'TestOne',
      meta: {
        title: 'menu.test',
        icon: 'crop',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'two',
      name: 'TestTwo',
      meta: {
        title: 'menu.test',
        icon: 'crop',
        chip: 'new',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'three',
      name: 'TestThree',
      meta: {
        title: 'menu.test',
        icon: 'crop',
        right: ''
      },
      component: () => import('@/views/blank'),
      children: [
        {
          path: 'one',
          name: 'TestFour',
          meta: {
            title: 'menu.test',
            icon: 'crop',
            right: ''
          },
          component: () => import('@/views/blank')
        },
        {
          path: 'two',
          name: 'TestFive',
          meta: {
            title: 'menu.test',
            icon: 'crop',
            right: ''
          },
          component: () => import('@/views/blank')
        }
      ]
    }
  ]
}

export default TestRouter
