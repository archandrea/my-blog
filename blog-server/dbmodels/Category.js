const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  //更新日期
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now
  },
  //文章 ids
  articles: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Article",
    default: []
  }],
  uid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  }
})

module.exports = mongoose.model('Category', schema)