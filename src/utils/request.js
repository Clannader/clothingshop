import axios from 'axios'
import store from '@/store'
import snackbar from '@/plugins/core/appSnackbar'
import staticVal from './globalVariable'

// 为了避免弹了提示框又点击其他请求,从而需要把其他请求都中断了,等用户关闭提示框才能再一次请求
// const CancelToken = axios.CancelToken
// let cancel // 取消方法

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
    // TODO 后面删除
    console.log(JSON.stringify(process.env))
    // if (store.getters.showSnackbar) {
    //   if (typeof cancel === 'function') {
    //     cancel('取消请求')
    //   }
    // }
    // config.cancelToken = new CancelToken((c) => {
    //   cancel = c
    // })
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
    if (code === staticVal.Code.Fail) {
      snackbar.error(response.data.msg)
      return Promise.reject(response.data)
    } else if (code === staticVal.Code.Success) {
      return response.data
    }
  },
  error => {
    snackbar.error(error)
    return Promise.reject(error)
  }
)

export default service
