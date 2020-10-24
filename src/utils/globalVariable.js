/**
 * 一些静态的常量定义
 */

const staticVal = {
  // 接口响应状态码
  Code: {
    Success: 1, // 成功
    Fail: 0, // 失败
    TableError: -1, // 表格数据返回错误
    NotFound: 404, // 地址不存在
    Error: 999, // 未知的异常
    Invalid: 901, // 无效的凭证
    Expired: 902 // 凭证过期
  },
  LanguageList: [{
    code: 'zh',
    desc: '简体中文'
  }, {
    code: 'en',
    desc: 'English'
  }],
  tripleDES: {
    key: 'ClothingShop',
    iv: '8890880'
  }
}

export default staticVal
