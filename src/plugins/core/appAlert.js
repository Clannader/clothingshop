import Vuetify from 'vuetify'
import AppSnackbar from './alert/AppSnackbar'

let appAlert
const version = Vuetify.version

// vuetify 2.3.x以上版本使用
const [v1, v2] = version.split('.')
if (parseInt(v1) === 2 && parseInt(v2) <= 2) {
  appAlert = AppSnackbar
}

export default appAlert
