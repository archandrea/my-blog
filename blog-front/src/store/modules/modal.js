export default {
  namespaced: true,
  state: {
    isVisible: false,
    modalType: ''
  },
  getters: {
  },
  mutations: {
    OPEN(state) {
      state.isVisible = true
    },
    CLOSE(state) {
      state.isVisible = false
    },
    SET_TYPE(state, type) {
      state.modalType = type
    }
  },
  actions: {
    close({commit}) {
      commit('CLOSE')
    },
    open({commit},type) {
      commit('SET_TYPE',type)
      commit('OPEN')
    },
    // submit() {
    //   alert('submited!')
    // }
  },
  modules: {
  }
}