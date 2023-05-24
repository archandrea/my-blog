const http = require('http')
const createError = require('http-errors')
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { expressjwt } = require('express-jwt')
const { getPublicKey, getPrivateKey } = require('./modules/key-handler.js')
const config = require('./config')
const translate_map = require('./map/translate-map')
require('./modules/socket')

// 启动mongoose连接
const mongoose = require('./modules/mongodb')
// 资源路由中间件
const resource_midware = require('./middlewares/resource')
// 数据库User的model
const User = require('./dbmodels/User')

const app = express()

// 跨域设置
app.use(cors({
  "origin": true, //true 设置为 req.origin.url
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //容许跨域的请求方式
  "allowedHeaders": "x-requested-with,Authorization,token, content-type", //跨域请求头
  "preflightContinue": false, // 是否通过next() 传递options请求 给后续中间件 
  "maxAge": 1728000, //options预验结果缓存时间 20天
  "credentials": true, //携带cookie跨域
  "optionsSuccessStatus": 200 //options 请求返回状态码
}))

// 日志打印
app.use(morgan('short'))

// 请求信息预处理
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 静态服务器
app.use(express.static('public'))
app.use(express.static('upload'))

// 路由
const index_route = require('./routes/index')
const api_route = require('./routes/api')
const admin_route = require('./routes/admin')
const publicKey_route = require('./routes/publicKey')
const upload_route = require('./routes/upload')
const search_route = require('./routes/search')

// 测试路由
app.use((req, res, next) => {
  next()
})

// 用户验证信息置空
app.use((req, res, next) => {
  app.set("valid", false)
  app.set("uid", null)
  next()
})

// token验证
app.use(
  expressjwt({
    // 私钥
    secret: getPrivateKey(),
    // 如果为false，在没有携带token时会跳到下一个中间件，默认 true
    credentialsRequired: false,
    // 加密算法 RSA 256
    algorithms: ['RS256'],
    // 回调 在数据库中验证用户是否存在
    async isRevoked(req, token) {
      try {
        let { user_id, user_name, exp, iat } = token.payload
        // console.log(token)
        let result = await User.findById(user_id)
        // console.log(result)
        req.app.set("valid", true)
        req.app.set("uid", user_id)
      } catch (err) {
        req.app.set("valid", false)
        console.log("token verified")
      }
    },
    // 过期验证
    onExpired(req, err) {
      req.app.set('valid', false)
      console.log("token expired")
    }
  }).unless({
    path: [
      { url: '/api/rest/comment?s', methods: ['GET', 'POST'] },
      { url: '/api/rest/column?s', methods: ['GET'] },
      { url: '/api/rest/article?s', methods: ['GET'] },
      { url: '/admin/login' },
      { url: '/admin/register' },
      { url: '/search' },
      { url: '/publicKey' },
    ]
  }))


app.use('/', index_route)
// 资源路由
app.use('/api/rest/:resource', resource_midware(), api_route)
// 上传路由
app.use('/upload', upload_route)
// 登录/注册路由
app.use('/admin', admin_route)
// 搜索路由
app.use('/search', search_route)
// 公钥路由
app.use('/publicKey', publicKey_route)


// 404捕获
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function (err, req, res, next) {
  // console.log(err)

  let errors

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.message.indexOf('duplicate key error') !== -1) {
    err.status = 422,
      err.message = '字段重复'
    errors = Object.fromEntries(Object.entries(err.keyValue).map(([key, value], idx, arr) => {
      return [key, `${translate_map[key]}已存在`]
    }))
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    err.status = 422,
      err.message = `文件不能大于 ${config.limit.singleFileSize} bytes`
  }

  if (err?.errors) {
    errors = Object.fromEntries(Object.entries(err?.errors).map(([key, value], idx, arr) => {
      return [key, value['message']]
    }))
    err.status = 422,
      err.message = JSON.stringify(errors)
  }

  // 响应错误状态码和信息
  res.status(err.status || 500).send({
    status: err.status,
    msg: err.message,
    errors
  })
});

let server = http.createServer(app).listen(config.port)

module.exports = app