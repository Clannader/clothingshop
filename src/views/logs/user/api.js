/**
 * Create by CC on 2020/10/30
 */
'use strict'
import api from '@/utils/request'

export function queryUserLog(params) {
  return api.post('/api/logs/user/search', params)
}
