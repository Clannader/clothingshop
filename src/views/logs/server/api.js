/**
 * Create by CC on 2020/10/30
 */
'use strict'
import api from '@/utils/request'

export function getSearchLogsList(params) {
  return api.get('/api/logs/server/search', params)
}

export function downloadLogs(params) {
  return api.post('/api/logs/server/download', params)
}

export function deleteLogs(params) {
  return api.post('/api/logs/server/delete', params)
}
