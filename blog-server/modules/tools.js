module.exports = {
  // 将数字转化为4位,比如0 => 0000
  keepFigure(num, figure = 4) {
    num = String(num).trim()
    if (num.length > figure) return num.slice(0, figure)
    for (let i = 0, len = figure - num.length; i < len; i++) {
      num = '0' + num
    }
    return num
  },

  getTempId () {
    return Date.now() + Math.random().toString(36).slice(-6)
  }
}