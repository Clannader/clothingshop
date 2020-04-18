/**
 * Create by CC on 2020/4/18
 */
'use strict'
import api from '@/utils/request'

export function getRightsList(params) {
  return api.post('/api/rights/getRightsList', params)
}
