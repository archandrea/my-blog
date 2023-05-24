const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1:27017/userdata')

const db = mongoose.connection

db.on('error', (err) => {
  console.log(err)
})
db.on('open', (err) => {
  console.log('mongodb://127.0.0.1:27017/userdata opened!!!!!')
})

module.exports = mongoose