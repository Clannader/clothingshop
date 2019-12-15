import Methods from '@/utils/methods'

const getters = {
  language: state => {
    let lang = 'CN'
    switch (state.tagsView.language) {
      case 'en':
        lang = 'EN'
        break
    }
    return lang
  },
  menuRouter: state => state.tagsView.menuRouter, // 获取左侧菜单路由
  showSnackbar: state => state.tagsView.showSnackbar,
  mini: state => {
    // 这里要对mini的值进行转换,因为存进去的有可能是string,但是用的时候必须是boolean,要不然报错
    return Methods.convertStringToBoolean(state.tagsView.mini)
  }
}
export default getters
