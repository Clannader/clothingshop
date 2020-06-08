/**
 * Create by CC on 2020/6/8
 */
'use strict'

import Mock from 'mockjs'

Mock.mock('/api/user/login',
  'post',
  {
    code: 1,
    credential: '123434467676'
  }
)

export default Mock
