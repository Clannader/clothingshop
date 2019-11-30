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
  menuRouter: state => state.tagsView.menuRouter // 获取左侧菜单路由
}
export default getters
