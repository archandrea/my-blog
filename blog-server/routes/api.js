const express = require('express')
const createError = require('http-errors')
const assert = require('http-assert')
const qs = require('qs')
const router = express.Router()
const Pagination = require('mongoose-sex-page')
const { create_map, read_map, update_map, delete_map } = require('../map/ref-map')

// 列表查询
router.get('/', async (req, res, next) => {
  const { query = {}, page = 1, size = 100, display = 8 } = req.query
  queryString = qs.parse(query)
  try {
    let result = await Pagination(req.model)
      .find(queryString)
      .populate(read_map[req.model.modelName])
      .page(page)
      .size(size)
      .display(display)
      .exec()
    res.status(200).send({
      msg: "查询成功",
      payload: {
        data: result
      }
    })
  } catch (err) {
    next(createError(422, '列表请求错误'))
  }
})

// 详细查询
router.get('/:id', async (req, res, next) => {
  let modelName = req.model.modelName
  try {
    let result = await req.model.findById(req.params.id)
    if (modelName in read_map) {
      let option = read_map[modelName]
      result = await result.populate(option)
      res.status(200).send({
        msg: "查询成功",
        payload: {
          data: result
        }
      })
    }
  } catch (err) {
    next(err || createError(400, '查询错误'))
  }
})

// 创建
router.post('/', async (req, res, next) => {
  let modelName = req.model.modelName
  try {
    let doc = await req.model.create(req.body)
    // console.log(doc)
    if (modelName in create_map) {
      let { ref, ref_model, query, option } = create_map[modelName]
      let _id = doc._id
      let ref_id = req.body?.[ref] || doc?.[ref]
      assert(ref_id, 422, `需要${ref}字段`)
      await ref_model[query](ref_id, option(_id))
    }
    res.status(200).send({
      msg: "创建成功",
      payload: {
        data: doc
      }
    })
  } catch (err) {
    if (modelName === 'User')
      next(err || createError(400, '创建错误'))
  }
})

// 更新
router.put('/:id', async (req, res, next) => {
  let modelName = req.model.modelName
  let _id = req.params.id
  let valid = req.app.get("valid")
  let uid = req.app.get("uid")

  try {
    let { revisable, auth_field } = update_map[modelName]
    assert(valid, 400, "需要登录")
    assert(modelName in update_map, 400, "接口不存在")
    let data = await req.model.findById(_id)
    assert(data, 404, "资源不存在")
    assert.equal(uid, data?.[auth_field], 400, "无权限修改")
    let revisableDataArr = Object.entries(req.body).filter(([key, value]) => {
      return revisable.includes(key)
    })
    assert(revisableDataArr.length !== 0, 400, "无可修改字段")
    revisableData = Object.fromEntries(revisableDataArr)
    revisableData['date'] = new Date().toISOString()
    await req.model.findByIdAndUpdate(_id, revisableData)
    res.status(200).send({
      msg: "修改成功"
    })
  } catch (err) {
    next(err)
  }
})

// 删除
router.delete('/:id', async (req, res, next) => {
  try {
    await req.model.findByIdAndDelete(req.params.id)
    res.status(200).send({
      msg: '删除成功'
    })
  } catch (err) {
    next(createError(400, "删除失败"))
  }
})

module.exports = router


/* 

test user
{
  _id: ObjectId("63f86327875282dd488f2187"),
  username: 'anna',
  password: 'IfN8o403STExdBsfVm/rcbK0DRhKDfJEGEJDlWQu97OqDV76VAgMhV4WDFviPcmfqGc15K2T3iQtnpWzs6XotQ==',
  email: 'anna@qq.com',
  avatar: 'http://127.0.0.1:8080/public/images/default_avatar.jpg',
  nickname: '安娜',
  __v: 0
}

test category
{
    _id: ObjectId("63f874cb5ded3cccc8690daa"),
    name: 'default',
    articles: [ ObjectId("63f874f2e7628102f43dfb76") ],
    last_update: ISODate("2023-02-24T08:26:51.979Z"),
    __v: 0
  }

test article
{
    "title": "测试文章",
    "cover": "http://127.0.0.1:8080/upload/article/cover_default.jpg",
    "content": "这里是测试文字123",
    "click_count": 0,
    "comment_count": 0,
    "like_count": 0,
    "author": "63f86327875282dd488f2187",
    "comments": [],
    "category": "63f874cb5ded3cccc8690daa",
    "_id": "63f9c8e98e3acf3daf5f4225",
    "date": "2023-02-25T08:38:01.746Z",
    "__v": 0
}

test comment
{
    "content": "这里是测试文字123",
    "aid": "63f874f2e7628102f43dfb76",
    "_id": "63f878ea36695de5c384adec",
    "date": "2023-02-24T08:44:26.953Z",
    "__v": 0
}

*/