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

export function saveRights(isNew = true, params) {
  return api.post(isNew ? '/api/rights/createRights' : '/api/rights/modifyRights', params)
}

export function getRightsCode(params) {
  return api.post('/api/rights/getRightsCode', params)
}

