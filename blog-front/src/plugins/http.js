import Vue from 'vue'
import store from 'store'
import $store from '@/store/index'
import REQUESR_MAP from '@/maps/request.map'
import encrypt from '@/utils/encrypt'
import { BASE_URL, TIMEOUT, publicKey_name, token_name } from '@/config/base.config'

// axios二次封装
async function http({ path, data, headers }) {
  if (!REQUESR_MAP[path]) {
    return false
  }
  let res = await send({ path, data, headers })
  if (res.payload?.token) {
    let { token, uid } = res.payload
    store.set(token_name, token)
    store.set('uid', uid)
    $store.dispatch('login', res.payload)
  }
  return res
}

async function send({ path, data, headers }) {
  let { rest, url, method, toEncrypt, withToken } = REQUESR_MAP[path]
  if (rest) {
    let param = url.match(/:(.*)$/)[1]
    url = url.replace(/:(.*)$/, data[param])
  }
  let params = method === 'GET' ? data : {}
  data = method === 'GET' ? {} : data
  if (data && data[toEncrypt]) {
    data = {
      ...data
    }
    data[toEncrypt] = await encrypt(data[toEncrypt])
  }
  return await Vue.prototype.$axios({
    method: method.toLowerCase(),
    url,
    data,
    params
  })
}

const vue_http = function (Vue, options) {
  if (vue_http.installed) return
  vue_http.installed = true
  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        return http;
      },
      enumerable: false,
      configurable: false
    },
  });
};

Vue.use(vue_http)

export default http;