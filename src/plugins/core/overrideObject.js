/**
 * Create by CC on 2020/5/14
 */
'use strict'

/**
 * 重写一些类的方法
 */
import moment from 'moment'

Date.prototype.format = function(fmt = 'yyyy-MM-dd') {
  return moment(this).format(fmt.replace(/y/g, 'Y').replace(/d/g, 'D'))
}

String.prototype.format = function(fmt = 'yyyy-MM-dd') {
  return moment(this).format(fmt.replace(/y/g, 'Y').replace(/d/g, 'D'))
}

String.prototype.createMoment = function(fmt) {
  return moment(this, fmt)
}
