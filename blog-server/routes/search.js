const express = require('express');
const router = express.Router();
const Article = require('../dbmodels/Article');
const assert = require('http-assert');

/*
  文章搜索 search API

  title body

  http://127.0.0.1:3000/search?q=你好
*/

router.get('/', async (req, res, next) => {
  let { q = '' } = req.query
  let regExp = new RegExp(q, 'i')
  try {
    let result = await Article.find({
      $or: [
        { title: { $regex: regExp } },
        { content: { $regex: regExp } },
      ]
    })
    res.send(200, {
      msg: '查询成功',
      payload: {
        data: result
      }
    })
  } catch (err) {
    next(err)
  }
});

module.exports = router;