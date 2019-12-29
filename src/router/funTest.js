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
  redirect: {
    name: 'FunctionTestSubMenu'
  },
  component: () => import('@/views/test'),
  children: [
    {
      path: ' ', // 添加空格，用以防止路由不匹配导致路由导航重复的问题
      name: 'FunctionTestSubMenu',
      meta: {
        title: 'menu.test',
        hidden: true
      },
      component: () => import('@/views/common/SubItem')
    },
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
      path: 'four',
      name: 'TestSix',
      meta: {
        title: 'menu.test',
        chip: 'hidden',
        hidden: true,
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'four11',
      name: 'TestSix11',
      meta: {
        title: 'menu.test',
        chip: 'hidden',
        right: ''
      },
      component: () => import('@/views/blank'),
      children: [
        {
          path: 'foureee',
          name: 'TestSixeee',
          meta: {
            title: 'menu.test',
            chip: 'hidden',
            // hidden: true,
            right: ''
          },
          component: () => import('@/views/blank')
        },
        {
          path: 'fourfff',
          name: 'TestSixfff',
          meta: {
            title: 'menu.test',
            chip: 'hidden',
            // hidden: true,
            right: ''
          },
          component: () => import('@/views/blank')
        }
      ]
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
