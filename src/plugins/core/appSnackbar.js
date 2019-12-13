import AppSnackbarComponent from 'components/core/AppSnackbar'
import Vue from 'vue'
import store from '@/store'

class AppSnackbar {
  static toast(message = '', color = 'success', duration = 3000) {
    // color:[success, error, info, cyan darken-2]
    // 如果有弹框了,则不再显示其余的弹框
    if (store.getters.showSnackbar) {
      return
    }
    const AppSnackbarConstructor = Vue.extend(AppSnackbarComponent)
    const instance = new AppSnackbarConstructor()
    instance.$mount(document.createElement('div'))

    // vuetify 2.x版本需要以下写法
    // color的问题是没有在v-application下,查看.v-application .error
    document.getElementById('app').appendChild(instance.$el)

    // 如果是vuetify 1.5.x版本可以使用以下写法
    // document.body.appendChild(instance.$el)
    instance.color = color
    instance.message = message
    store.dispatch('setShowSnackbar', true)
    setTimeout(() => {
      instance.show = false
      store.dispatch('setShowSnackbar')
    }, duration)
  }

  static success(message, duration) {
    this.toast(message, 'success', duration)
  }

  static info(message, duration) {
    this.toast(message, 'info', duration)
  }

  static error(message, duration) {
    this.toast(message, 'error', duration)
  }
}

export default AppSnackbar
