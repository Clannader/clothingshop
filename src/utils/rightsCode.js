/**
 * Create by CC on 2020/10/30
 */
'use strict'

const RightsCode = {
  FrontdeskManager: {
    code: '1000',
    desc: '前台管理'
  },
  ShopInfo: {
    code: '1001',
    desc: '店铺信息'
  },
  CategoryManager: {
    code: '1002',
    desc: '分类管理'
  },
  ClothesManager: {
    code: '1003',
    desc: '服装管理'
  },
  OrderManager: {
    code: '1004',
    desc: '订单管理'
  },
  LogsManager: {
    code: '2000',
    desc: '日志管理'
  },
  UserLogs: {
    code: '2001',
    desc: '用户日志'
  },
  ServerLogs: {
    code: '2002',
    desc: '服务器日志'
  },
  MailLogs: {
    code: '2003',
    desc: '邮件日志'
  },
  OtherSetup: {
    code: '3000',
    desc: '其他设置'
  },
  SupplierSetup: {
    code: '3100',
    desc: '集团设置' // 以后设计集团和店铺都属于同一个表,通过一个字段来区分,然后集团的信息可以应用至到对于绑定的店铺中去
  },
  ShopSetup: {
    code: '3200',
    desc: '店铺设置'
  },
  UserSetup: {
    code: '3300',
    desc: '用户设置'
  },
  RightsSetup: {
    code: '3400',
    desc: '权限设置'
  },
  RightsGroupSetup: {
    code: '3410',
    desc: '权限组设置'
  },
  RightsGroupCreate: {
    code: '3411',
    desc: '新建权限组'
  },
  RightsGroupModify: {
    code: '3412',
    desc: '编辑权限组'
  },
  RightsGroupDelete: {
    code: '3413',
    desc: '删除权限组'
  },
  RightsCodeSetup: {
    code: '3420',
    desc: '权限代码设置' // 一般设置这个权限就是查看的权限,但是编辑新建还需要另外的权限控制
  },
  RightsCodeModify: {
    code: '3421',
    desc: '编辑权限代码'
  },
  SystemSetup: {
    code: '3500',
    desc: '系统数据设置'
  },
  MailSetup: {
    code: '3600',
    desc: '邮件设置'
  },
  RepairData: {
    code: '3700',
    desc: '修复数据'
  },
  StatisticSetup: {
    code: '5000',
    desc: '数据统计模块'
  },
  OrderStatistic: {
    code: '5001',
    desc: '店铺订单统计'
  },
  IncomeStatistic: {
    code: '5002',
    desc: '店铺收益统计'
  },
  UserAccessStatistic: {
    code: '5003',
    desc: '用户访问统计'
  },
  InterfaceStatistic: {
    code: '5004',
    desc: '接口调用统计'
  },
  SystemMonitor: {
    code: '6000',
    desc: '系统监控'
  },
  UserAccessMonitor: {
    code: '6001',
    desc: '用户访问数据监控'
  },
  InterfaceMonitor: {
    code: '6002',
    desc: '接口调用监控'
  },
  DBMonitor: {
    code: '6003',
    desc: '数据库性能监控'
  },
  ChangeUserPws: {
    code: '9000',
    desc: '能否修改其他用户的密码'
  },
  CreateIFCUser: {
    code: '9001',
    desc: '能否创建接口用户'
  },
  CreateSYSUser: {
    code: '9002',
    desc: '能否创建SYSTEM用户'
  },
  DeleteSYSUser: {
    code: '9003',
    desc: '能否删除用户'
  },
  ChangeUserStatus: {
    code: '9004',
    desc: '能否修改用户状态'
  },
  DeleteServerLog: {
    code: '9005',
    desc: '能否删除服务器日志'
  },
  CreateSYSAny: {
    code: '9006',
    desc: '能否新建SYSTEM的数据'
  }
}

export default RightsCode
