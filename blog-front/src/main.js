import Vue from 'vue'

import './plugins/vant.js'
import './plugins/element'
import './plugins/axios'
import './plugins/http'
import './plugins/vuescroll'

import App from './App.vue'
import store from './store'
import router from './router'
import '@/assets/css/normalize.css'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')