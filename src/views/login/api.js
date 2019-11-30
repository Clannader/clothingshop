/**
 * Create by CC on 2018/12/8
 */
'use strict'

import api from '@/utils/request'

export function login(params) {
  return api.post('/api/user/login', params)
}
