const express = require('express')
const createError = require('http-errors')
const assert = require('http-assert')
const { getToken } = require('../modules/token.js')
const { generateKeys, encrypt, decrypt } = require('../modules/rsa')
const router = express.Router()

const translate_map = require('../map/translate-map')
const User = require('../dbmodels/User')

const admin_map = {
  async login(req) {
    let { username, password } = req.body
    let user = await User.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')
    assert.equal(decrypt(password), decrypt(decrypt(user.password)), 422, '密码错误')
    return user
  },
  async register(req) {
    let { username, password } = req.body
    req.body.password = encrypt(password)
    let user = await User.create(req.body)
    // console.log(user)
    return user
  }
}

// 登录注册路由
router.post('/:action', async (req, res, next) => {
  let action = req.params.action
  // console.log(action)
  assert(action in admin_map, 422, '无效请求')
  let { username, password } = req.body
  // 验证登录信息非空
  let isEmpty = (!username || username?.trim().length === 0 || !password || password?.trim().length === 0)
  assert(!isEmpty, 422, '不能为空')
  // 验证用户数据库
  try {
    let user = await admin_map[action](req)
    let { _id, avatar, username, nickname, date } = user
    // 登录成功，签发token
    let token = await getToken(user)
    res.status(200).send({
      msg: `${translate_map[action]}成功`,
      payload: {
        uid: _id,
        avatar,
        username,
        nickname,
        date,
        token
      }
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router