const fs = require('fs').promises
const config = require('../config.js')
const { generateKeys, encrypt, decrypt } = require('../modules/rsa.js')
const { keepFigure } = require('../modules/tools.js')

module.exports = { addUser, findUser, verifyUser }

// 用户数据操作方法库

// 添加用户
async function addUser(username, password) {
  // 用户数据库读取
  let json = await fs.readFile(config.path.userdata, 'utf8', () => { })
  let data = JSON.parse(json)
  let result
  // 格式化用户名和密码
  username = String(username)
  password = String(password)
  // 查询用户名是否存在，防止重复
  let user = await findUser({ user_name: username })
  // 用户名已存在
  if (user.idx !== -1) {
    return false
  }
  // 用户数据库有数据，在最后一个数据后存入用户
  if (data.length !== 0) {
    let id = keepFigure(Number((data[data.length - 1]["user_id"])) + 1)
    result = {
      user_id: id,
      user_name: username,
    }
    data.push({
      ...result,
      user_password: await encrypt(password)
    })
    
  }
  // 用户数据库尚未存有数据，也就是说存入第一个用户
  if (data.length === 0) {
    result = {
      user_id: "0000",
      user_name: username,
    }
    data.push({
      ...result,
      user_password: await encrypt(password)
    })
  }
  await fs.writeFile(config.path.userdata, JSON.stringify(data))
  return result
}

// 寻找用户
// return
// -1 未找到
// 1  成功找到
async function findUser({ user_id, user_name } = {}) {
  // 用户数据库读取
  let json = await fs.readFile(config.path.userdata, 'utf8', () => { })
  let data = JSON.parse(json)
  // console.log(data,user_id,user_name)
  for (let i = 0, len = data.length; i < len; i++) {
    // id和name都传入的情况
    if ((user_id && user_name) && (data[i]["user_id"] === user_id && data[i]["user_name"] === user_name)) {
      return {
        ...data[i],
        idx: i
      }
    }
    // id和name只有一个传入的情况
    if ((user_id || user_name) && (data[i]["user_id"] === user_id || data[i]["user_name"] === user_name)) {
      return {
        ...data[i],
        idx: i
      }
    }
  }
  return { idx: -1 }
}

// 验证用户数据
// return
// -1 未找到
// 0  密码错误
// 1  成功找到
async function verifyUser(username, password) {
  let user = await findUser({ user_name: username })
  // console.log(user)
  if (user.idx === -1) {
    return { code: -1 }
  }
  try {
    let storage_password = await decrypt(await decrypt(user.user_password))
    let request_password = await decrypt(password)
    // console.log(storage_password, request_password)
    if (storage_password !== request_password) {
      return { code: 0 }
    }
  }
  catch (err) {
    return { code: 0 }
  }
  return { code: 1, ...user }
}
