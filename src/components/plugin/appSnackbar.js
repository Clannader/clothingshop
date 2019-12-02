import AppSnackbarComponent from '../core/AppSnackbar'
import Vue from 'vue'

const AppSnackbar = {}

AppSnackbar.info = (color, message, duration = 3000) => {
  const AppSnackbarConstructor = Vue.extend(AppSnackbarComponent)
  const instance = new AppSnackbarConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)
  instance.color = color
  instance.message = message
  // setTimeout(() => {
  //   instance.show = false
  // }, duration)
}

export default AppSnackbar
