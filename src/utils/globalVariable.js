/**
 * 一些静态的常量定义
 */
import RightsCode from './rightsCode'

const staticVal = {
  // 接口响应状态码
  Code: {
    Success: 100, // 成功
    Fail: 999, // 失败
    // TableError: -1, // 表格数据返回错误
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
  // tripleDES: {
  //   key: 'ClothingShopClothingShopClothingShopClothingShopClothingShopAAAA',
  //   iv: '8890880'
  // },
  RightsCode: RightsCode
}

export default staticVal
