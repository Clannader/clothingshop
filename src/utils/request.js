import axios from 'axios'
import store from '@/store'
import appSnackbar from '@/plugins/core/appSnackbar'
import staticVal from './globalVariable'
import methods from './methods' // 我觉得这个引入有点奇怪,因为request和methods已经是互相引用了

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
    // console.log(JSON.stringify(process.env))
    // if (store.getters.showSnackbar) {
    //   if (typeof cancel === 'function') {
    //     cancel('取消请求')
    //   }
    // }
    // config.cancelToken = new CancelToken((c) => {
    //   cancel = c
    // })
    // 现在就是不知道如何让请求抛异常,如果抛异常是不是就说明请求就会中断?
    if (!config.headers['credential']) {
      config.headers['credential'] = sessionStorage.getItem('credential') || ''
    }
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
    if (code === staticVal.Code.Success || code === 1000) {
      return response.data
    } else {
      if (code === staticVal.Code.Invalid) {
        // session失效了,退回登录页面
        // 先删除session
        sessionStorage.removeItem('credential')
        // 这样调用removeSession时不会再去调用退出接口了
        methods.removeUserSession()
        store.dispatch('userLogout')// 这里跳回登录页面
      } else {
        appSnackbar.error(response.data.msg)
      }
      return Promise.reject(response.data)
    }
  },
  error => {
    appSnackbar.error(error)
    return Promise.reject(error)
  }
)

export default service
