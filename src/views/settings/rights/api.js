/**
 * Create by CC on 2020/4/18
 */
'use strict'
import api from '@/utils/request'

export function getRightsList(params) {
  return api.post('/api/rights/getRightsList', params)
}

export function findRightsById(params) {
  return api.post('/api/rights/findRightsById', params)
}

export function deleteRights(params) {
  return api.post('/api/rights/deleteRights', params)
}
