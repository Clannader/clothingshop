/**
 * Create by CC on 2020/4/18
 */
'use strict'
import api from '@/utils/request'

export function getSystemGroup(params) {
  return api.post('/api/system/group/search', params)
}

