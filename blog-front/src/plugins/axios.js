import Vue from 'vue';
import axios from "axios";
import store from 'store'
import { BASE_URL, TIMEOUT, publicKey_name, token_name } from '@/config/base.config'

// axios实例
const _axios = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})

// 请求拦截器
_axios.interceptors.request.use(
  async function (config) {
    let token = store.get(token_name)
    if (token) {
      config.headers.common['Authorization'] = 'Bearer ' + token
    }
    // console.log(config)
    return config
  }.bind(this), function (err) {
    return Promise.reject(err)
  }
);

// 响应拦截器
_axios.interceptors.response.use(
  function (response) {
    return response.data
  }.bind(this), function (err) {
    return Promise.reject(err)
  }
);

const vue_axios = function (Vue, options) {
  if (vue_axios.installed) return
  vue_axios.installed = true
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
      enumerable: false,
      configurable: false
    },
    $axios: {
      get() {
        return _axios;
      },
      enumerable: false,
      configurable: false
    },
  });
};

Vue.use(vue_axios)

export default vue_axios;
