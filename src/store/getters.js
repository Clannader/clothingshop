import Methods from '@/utils/methods'

/**
 * 这里的写法是对state里面的值进行转换,但是对于的模块里面的值还是原值,意思是对某些地方需要特殊处理
 * 值的时候,可以在这里进行转化一遍,如果值不需要处理的,那么就不需要在这里写了
 *
 * 所以这里的menuRouter和showSnackbar,可以不写在这里,后期注意这个问题
 */

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
  },
  roles: state => state.userInfo.roles,
  sessionSchema: state => state.userInfo.sessionSchema,
  systemConfig: state => state.userInfo.systemConfig
}
export default getters
