const mongoose = require('mongoose')
const config = require('../config')
const { keepFigure } = require('../modules/tools')

let schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    index: true,
    required: [true, '用户名不能为空'],
    validate: {
      validator(val) {
        return /^(?![\W_]).{4,8}$/.test(val)
      },
      message: '用户名长度应为4-8位 且不能以符号开头'
    }
  },
  password: {
    type: String,
    select: false,
    required: [true, '密码不能为空'],
  },
  email: {
    type: String,
    // required: [true, '邮箱不能为空'],
    validate: {
      validator: function (val) {
        return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(val)
      },
      message: "邮箱格式不正确"
    },
  },
  avatar: {
    type: String, //URL,
    default: config.URL + "/user/avatar_default.webp"
  },
  nickname: {
    type: String,
    validate: {
      validator: function (val) {
        return /^[0-9a-zA-Z\u0391-\uFFE5]{1,8}$/.test(val)
      },
      message: "昵称只能为数字/英文/汉字 且长度为1-8位"
    },
    default: '用户' + keepFigure(parseInt(Math.random() * 99999), 5)
  },
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now
  },
})

module.exports = mongoose.model('User', schema)