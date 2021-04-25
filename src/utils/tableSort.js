export default function tableSort(value1, value2) {
  var result
  if (value1 === value2) {
    return 0
  }
  const SortAsNumber = isNumeric(value1)
  // 如果是数字类型的比较
  if (SortAsNumber) {
    result = parseFloat(value1) > parseFloat(value2)
  } else {
    // 字符串类型的比较
    result = sortLikeWin(value1, value2)
    result = result > 0
  }
  result = result ? 1 : -1
  return result
}

function isNumeric(num) { // 验证是否是数字类型.
  return /^\d+(\.\d+)?$/.test(num)
}

// 如果是字符串，根据字符串和数字来排序
function sortLikeWin(v1, v2) {
  var a = v1
  var b = v2
  var reg = /[0-9]+/g
  var lista = a.match(reg)
  var listb = b.match(reg)
  if (!lista || !listb) {
    return a.localeCompare(b)
  }
  for (var i = 0, minLen = Math.min(lista.length, listb.length); i < minLen; i++) {
    var indexa = a.indexOf(lista[i])
    var indexb = b.indexOf(listb[i])
    var prefixa = a.substring(0, indexa)
    var prefixb = a.substring(0, indexb)
    var stra = lista[i]
    var strb = listb[i]
    var numa = parseInt(stra)
    var numb = parseInt(strb)
    if (indexa !== indexb || prefixa !== prefixb) {
      return a.localeCompare(b)
    } else {
      if (stra === strb) {
        if (i === minLen - 1) {
          return a.substring(indexa).localeCompare(b.substring(indexb))
        } else {
          a = a.substring(indexa + stra.length)
          b = b.substring(indexa + stra.length)
        }
      } else if (numa === numb) {
        return strb.lastIndexOf(numb + '') - stra.lastIndexOf(numa + '')
      } else {
        return numa - numb
      }
    }
  }
}

