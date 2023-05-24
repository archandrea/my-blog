const express = require('express')
const createError = require('http-errors')
const { expressjwt } = require('express-jwt')
const { getPublicKey, getPrivateKey } = require('../modules/key-handler.js')
const { getToken } = require('../modules/token.js')
const router = express.Router()

const User = require('../dbmodels/User')

// 主页路由
router.get('/', async (req, res, next) => {
  if (!req.app.get('valid')) {
    next(createError(400, '验证失效，请登录'))
    return
  }
  try{
    let user = await User.findOne({ _id: req.app.get("uid")})
    let { _id, avatar, username, nickname, date } = user
    let token = await getToken(user)
    res.status(200).send({
      msg: 'token valid',
      payload: {
        uid: _id,
        avatar,
        username,
        nickname,
        date,
        token
      }
    })
  }catch(err) {
    next(err)
  }
}
)

module.exports = router