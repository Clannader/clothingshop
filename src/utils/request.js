import axios from 'axios'
import store from '@/store'
import snackbar from '@/plugins/core/appSnackbar'
import staticVal from './globalVariable'

// 创建axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000, // 请求超时设置
  headers: { // 自定义请求头
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    config.headers['credential'] = sessionStorage.getItem('credential') || ''
    config.headers['language'] = store.getters.language
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    const code = response.data.code
    if (code === staticVal.Code.Success) {
      return response.data
    } else {
      snackbar.error(response.data.msg)
      return Promise.reject(response.data)
    }
  },
  error => {
    snackbar.error(error)
    return Promise.reject(error)
  }
)

export default service
