import JSEncrypt from 'jsencrypt'
import Vue from 'vue'
import store from 'store'
import REQUESR_MAP from '@/maps/request.map'
import { publicKey_name } from '@/config/base.config'

export default async function encrypt(value) {
  //实例化 JSEncrypt
  let encrypt = new JSEncrypt()
  //设置公钥
  encrypt.setPublicKey(await getPubKey())
  //调用加密方法 encrypt.encrypt
  return encrypt.encrypt(value)
}

// 公钥获取，如果localstoraget没有存，就发起请求
export async function getPubKey() {
  let key = store.get(publicKey_name)
  //如果localstorage已存公钥则不用请求公钥
  if (!key || key === 'undefined') {
    try {
      let { url, method } = REQUESR_MAP['publicKey']
      let result = await Vue.prototype.$axios[method.toLowerCase()](url)
      // console.log(result)
      let key = result.payload.publicKey
      key = key.replace(/\. +/g, '')
      key = key.replace(/[\r\n]/g, '')
      store.set(publicKey_name, key)
      return key
    } catch (err) {
      console.log(err)
    }
  }
  return key
}