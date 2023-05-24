const fs = require('fs').promises
const config = require('../config.js')
const { generateKeys, encrypt, decrypt } = require('./rsa.js')

// 密钥获取操作
module.exports = {
  // 获取公钥
  async getPublicKey() {
    let key
    try {
      key = await fs.readFile(config.path.publicKey, 'utf-8')
    } catch (err) {
      await generateKeys()
      key = await fs.readFile(config.path.publicKey, 'utf-8')
    }
    return key
  },
  // 获取私钥
  async getPrivateKey() {
    let key
    try {
      key = await fs.readFile(config.path.privateKey, 'utf-8', () => { })
      
    } catch (err) {
      await generateKeys()
      key = await fs.readFile(config.path.privateKey, 'utf-8', () => { })
    }
    return key
  }
}