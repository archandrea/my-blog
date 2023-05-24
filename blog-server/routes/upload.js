const express = require('express')
const path = require('path')
const fs = require('fs')
const createError = require('http-errors')
const assert = require('http-assert')
const multer = require('multer')
const router = express.Router()

const config = require('../config')
const User = require('../dbmodels/User')

const category_map = {
  'user': 'user',
  'article': 'article'
}

let storage = multer.diskStorage({
  destination(req, file, cb) {
    let category = category_map[req.params['category'].trim()] ?? "other";
    const filePath = path.join(config.path.upload, category)
    fs.existsSync(filePath) || fs.mkdirSync(filePath);
    cb(null, filePath);
  },
  filename(req, file, cb) {
    const { ext, base, name } = path.parse(file.originalname)
    cb(null, name + '_' + Date.now() + ext);
  }
})

let upload = multer({
  storage,
  limits: {
    fileSize: config.limit.singleFileSize
  }
})

// 上传路由
router.post('/:category', upload.any(), async (req, res, next) => {
  try {
    let fileType = category_map[req.params['category']] ?? ''
    assert(fileType, 400, '文件上传分类不正确')
    let { uid } = req.body
    if (fileType === 'user') {
      assert(uid, 422, '用户头像必须指定UID')
    }
    if (req.files) {
      let fileURL = req.files.map((item) => {
        let { fieldname, originalname, destination, filename, size } = item
        return `${config.URL}/${path.parse(destination).name}/${filename}`
      })
      if (fileType === 'article') {
        res.status(200).send({
          "errno": 0,
          data: fileURL
        })
        return
      }
    }

    if (req.file) {
      let { fieldname, originalname, destination, filename, size } = req.file
      let fileURL = `${config.URL}/${path.parse(destination).name}/${filename}`
    }

    res.status(200).send({
      msg: "上传成功",
      payload: {
        fileURL
      }
    })

  } catch (err) {
    next(err)
  }
})

module.exports = router