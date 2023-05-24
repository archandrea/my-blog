const express = require('express')
const { getPublicKey, getPrivateKey } = require('../modules/key-handler.js')
const router = express.Router()

// 公钥获取路由
router.get('/', async (req, res, next) => {
  res.status(200).send({
    msg: "公钥获取成功",
    payload: {
      publicKey: await getPublicKey()
    }
  })
})

module.exports = router