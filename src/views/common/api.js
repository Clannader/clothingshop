/**
 * Create by CC on 2020/10/24
 */
'use strict'
import api from '@/utils/request'

export function changePassword(params) {
  return api.post('/api/user/changePassword', params)
}
