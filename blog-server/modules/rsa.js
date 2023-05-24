const fs = require('fs')
const path = require('path')
const NodeRSA = require('node-rsa')
const config = require('../config.js')

//创建秘钥
function generateKeys() {
  //实例化 b 秘钥位 bit 越大越安全 256 , 512, 1024 - 4096
  const newkey = new NodeRSA({ b: 512 })

  //设置秘钥模式
  newkey.setOptions({ encryptionScheme: 'pkcs1' })

  //设置公钥 
  let public_key = newkey.exportKey('pkcs8-public')//公钥,

  //设置私钥
  let private_key = newkey.exportKey('pkcs8-private') //私钥

  //写入公钥 私钥 cer文件
  fs.writeFileSync(config.path.privateKey, private_key)
  fs.writeFileSync(config.path.publicKey, public_key)
}

//加密
function encrypt(plain) {
  //读取秘钥 公钥
  let public_key = fs.readFileSync(config.path.publicKey, 'utf8')

  const nodersa = new NodeRSA(public_key)

  //设置秘钥 scheme
  nodersa.setOptions({ encryptionScheme: 'pkcs1' })

  //调用加密方法  plain是需要加密的明文 加密生成的格式
  const encrypted = nodersa.encrypt(plain, 'base64')
  return encrypted
}

//解密
function decrypt(cipher) {
  // 获取私钥
  let private_key = fs.readFileSync(config.path.privateKey, 'utf8', () => { })
  //私钥实例化 NodeRSA
  let prikey = new NodeRSA(private_key)

  //设置 模式 scheme pkcs1
  prikey.setOptions({ encryptionScheme: 'pkcs1' })
  // decrypt(解密密文, 解密后格式)
  return prikey.decrypt(cipher, 'utf8')
}

module.exports = {
  generateKeys,
  encrypt,
  decrypt,
}