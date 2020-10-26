/**
 * Create by CC on 2020/10/26
 */
'use strict'
import api from '@/utils/request'

export function getUsersList(params) {
  return api.post('/api/user/search', params)
}
