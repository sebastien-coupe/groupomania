import { createStore } from 'vuex'

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || '',
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },

    setUserId(state, userId) {
      state.userId = userId
    },

    clearToken(state) {
      state.token = ''
    },

    clearUserId(state) {
      state.userId = ''
    }
  },
  actions: {
    login(context, { token, userId }) {
      context.commit('setToken', token)
      context.commit('setUserId', userId)

      localStorage.setItem('token', token)
      localStorage.setItem('userId', userId)
    },

    logout(context) {
      context.commit('clearToken')
      context.commit('clearUserId')

      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    }
  },
  modules: {
  },
  getters: {
    isAuthenticated: state => !!state.token
  }
})
