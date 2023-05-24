import Vue from 'vue'
import Vuex from 'vuex'
import modal from './modules/modal'
import router from '@/router'
import store from 'store'
import { io } from 'socket.io-client'
import { BASE_URL, TIMEOUT, publicKey_name, token_name } from '@/config/base.config'

let isMyAct = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: store.get(token_name) || '',
    scrollTop: {
      articleList: 0
    },
  },
  getters: {
    userData(state) {
      if (state.token) {
        return state.user
      }
    }
  },
  mutations: {
    SET_TOKEN(state) {
      state.token = store.get(token_name)
    },
    DELETE_TOKEN(state) {
      state.token = '',
        store.remove(token_name)
    },
    SET_USER(state, user) {
      state.user = user
      store.remove('uid')
    },
    DELETE_USER(state) {
      state.user = {}
    },
    SET_SCROLLTOP(state, key, scrollTop) {
      state.scrollTop[key] = scrollTop
    },
    SOCKET_LISTEN(state) {
      state.socketListen = true
    }
  },
  actions: {
    login({ commit, dispatch }, data) {
      commit('SET_TOKEN')
      commit('SET_USER', data)
    },
    async getUserData({ commit, dispatch }) {
      try {
        let res = await Vue.prototype.$http({ path: 'user' })
        dispatch('online')
        commit('SET_USER', res.payload)
      } catch (err) {
        console.log(err)
        Vue.prototype.$notify.error({
          title: '错误',
          message: err,
        })
      }
    },
    logout({ commit, state }) {
      commit('DELETE_TOKEN')
      commit('DELETE_USER')
      isMyAct = true
      Vue.prototype.$socket.close()
      state.socketListen = false
      if (router.app._route.name !== 'index') {
        router.push('/index')
      }
    },
    online({ getters, dispatch }) {
      Vue.prototype.$socket = io(process.env.VUE_APP_SOCKET_URL, { transports: ['websocket'] })

      Vue.prototype.$socket.on('connect', () => {
        console.log('建立连接')
      })

      let { uid, nickname } = getters.userData
      Vue.prototype.$socket.emit('online', { uid, name: nickname })

      Vue.prototype.$socket.on('disconnect', (reason) => {
        Vue.prototype.$notify.info({
          title: '通知',
          message: isMyAct ? '账户已登出' : '已断开链接'
        })
        if (!isMyAct) {
          dispatch('logout')
        }
        Vue.prototype.$socket = null
        isMyAct = false
      })
    }
  },
  modules: {
    modal
  }
})


