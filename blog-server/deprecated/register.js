const express = require('express')
const createError = require('http-errors')
const assert = require('http-assert')
const { getToken } = require('../modules/token.js')
const { generateKeys, encrypt, decrypt } = require('../modules/rsa')
const router = express.Router()

const User = require('../dbmodels/User')

// 注册路由
router.post('/', async (req, res, next) => {
  let { username, password } = req.body
  // 验证登录信息非空
  if (!username || username?.trim().length === 0 || !password || password?.trim().length === 0) {
    assert(false, 422, '不能为空')
  }
  // 验证用户数据库
  try {
     req.body.password = encrypt(password)
    //  console.log(encrypt(password))
    let user = await User.create(req.body)
    console.log(user)
    // 注册成功，签发token
    let token = await getToken(user)
    res.status(200).send({
      msg: '注册成功',
      payload: {
        uid: user._id,
        token
      }
    })
  } catch (err) {
    next(createError(422))
  }
})

module.exports = router