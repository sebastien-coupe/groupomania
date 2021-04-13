import { createStore } from 'vuex'

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || {},
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },

    setUser(state, user) {
      state.user = user
    },

    clearToken(state) {
      state.token = ''
    },

    clearUser(state) {
      state.user = {}
    }
  },
  actions: {
    login(context, { token, user }) {
      context.commit('setToken', token)
      context.commit('setUser', user)

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    logout(context) {
      context.commit('clearToken')
      context.commit('clearUser')

      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    updateUser(context, user) {
      context.commit('setUser', user);
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  modules: {
  },
  getters: {
    isAuthenticated: state => !!state.token,
    token: state => state.token,
    user: state => state.user
  }
})
