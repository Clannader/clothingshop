// import Vuetify from 'vuetify'
import Vue from 'vue'
// import AppAlertComponent from 'components/core/AppAlert'
import AppSnackbarComponent from 'components/core/AppSnackbar'

// 获取vuetify的版本
// const version = Vuetify.version

// 分隔版本号,取版本信息
// const [v1, v2] = version.split('.')

// 定义v2版本以下的变量名
// vuetify 2.2.x以下版本使用
// const isV2Down = parseInt(v1) <= 2 && parseInt(v2) <= 2

// 定义v2版本以上的变量名
// vuetify 2.3.x版本以上使用
// const isV2Up = parseInt(v1) >= 2 && parseInt(v2) > 2

class AppSnackbar {
  static toast(message = '', color = 'green', duration = 5000) {
    // color:[success, error, info, cyan darken-2]
    // const Constructor = isV2Down
    //   ? Vue.extend(AppSnackbarComponent)
    //   : Vue.extend(AppAlertComponent)
    const Constructor = Vue.extend(AppSnackbarComponent)
    const instance = new Constructor(
      {
        propsData: {
          timeout: duration
        }
      }
    )
    instance.$mount(document.createElement('div'))

    // vuetify 2.x版本需要以下写法
    // color的问题是没有在v-application下,查看.v-application .error
    document.getElementById('app').appendChild(instance.$el)

    // 如果是vuetify 1.5.x版本可以使用以下写法
    // document.body.appendChild(instance.$el)
    instance.color = color
    instance.message = message
    // instance.timeout = duration // 这里不能这样赋值timeout,因为在初始化对象的时候,定时器已经开始
    // 必须在new的时候传入timeout值

    // setTimeout(() => {
    //   // 这里有个坑,那就是多次点击的时候,同时点关闭,这里的异步导致如下顺序
    //   // 先点击,变true,异步中,点关闭 false,其实这时候false了,异步在存在,然后点击,true,然后异步结束false
    //   // 但是这时候的异步用户不知道是否结束,然后又点击就可以出现框,弹双重的框
    //   instance.show = false
    //   // 只有error才不能弹多个
    //   if (color === 'error') {
    //     store.dispatch('setShowSnackbar')
    //   }
    // }, duration)
  }

  static success(message, duration) {
    this.toast(message, 'green', duration)
  }

  static info(message, duration) {
    this.toast(message, 'blue', duration)
  }

  static error(message, duration) {
    // 如果有弹框了,则不再显示其余的弹框
    // if (store.getters.showSnackbar) {
    //   return
    // }
    // store.dispatch('setShowSnackbar', true)
    this.toast(message, 'red', duration)
  }
}

export default AppSnackbar
