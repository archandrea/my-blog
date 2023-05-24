const mongoose = require('mongoose')
const config = require('../config')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "默认标题" + new Date().toDateString()
  },
  //封面图
  cover: {
    type: String, //URL
    default: config.URL + '/article/cover_default.jpg'
  },
  //文章内容
  content: {
    type: String, // URIencode(HTMLCode)
    required: true,
  },
  //更新日期
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now
  },
  //点击量
  click_count: {
    type: Number,
    default: 0
  },
  //评论数量
  comment_count: {
    type: Number,
    default: 0
  },
  //喜欢 点赞
  like_count: {
    type: Number,
    default: 0
  },
  //作者
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  //评论集合
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Comment"
    }
  ],
  //分类
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category',
  }
})

module.exports = mongoose.model('Article', schema)