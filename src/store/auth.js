import axios from 'axios'
const { VITE_API_KEY, VITE_USERNAME } = import.meta.env

const END_POINT =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth'

const headers = {
  'content-type': 'application/json',
  apikey: VITE_API_KEY,
  username: VITE_USERNAME
}

export default {
  namespaced: true,
  state() {
    return {
      user: {},
      token: null,
      logined: null
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user
      state.token = payload.token
      state.logined = payload.logined
    }
  },
  getters: {
    userId(state) {
      return state.user
    },
    token(state) {
      return state.token
    },
    isAuthenticated(state) {
      return !!state.token
    }
  },
  actions: {
    async login(context, payload) {
      const response = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            apikey: 'FcKdtJs202204',
            username: 'KDT2_TEAM5'
          },
          body: JSON.stringify({
            email: payload.email,
            password: payload.password
          })
        }
      )

      const dataForm = await response.json()
      window.localStorage.setItem('token', dataForm.accessToken)
      window.localStorage.setItem('user', JSON.stringify(dataForm.user))

      context.commit('setUser', {
        user: dataForm.user,
        token: dataForm.accessToken
      })
    },
    async signup(context, payload) {
      const response = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            apikey: 'FcKdtJs202204',
            username: 'KDT2_TEAM5'
          },
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            displayName: payload.displayName
          })
        }
      )

      const dataForm = await response.json()

      context.commit('setUser', {
        user: dataForm.user,
        token: dataForm.accessToken
      })
    },
    async logOut() {
      const accessToken = window.localStorage.getItem('token')
      await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            apikey: 'FcKdtJs202204',
            username: 'KDT2_TEAM5',
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      window.localStorage.clear()
    },
    async changeProfile(context, payload) {
      const accessToken = window.localStorage.getItem('token')
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user',
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            apikey: 'FcKdtJs202204',
            username: 'KDT2_TEAM5',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            displayName: payload.displayName,
            oldPassword: payload.oldPassword,
            newPassword: payload.newPassword
          })
        }
      )
      const dataForm = await res.json()
      window.localStorage.setItem('user', JSON.stringify(dataForm))
    },
    findLocalStorageUser(context) {
      const accessToken = window.localStorage.getItem('token')
      if (accessToken == null) {
        context.commit('setUser', {
          logined: false
        })
      } else {
        context.commit('setUser', {
          logined: true
        })
      }
    },
    async authenticationCheck({ commit }) {
      const accessToken = window.localStorage.getItem('token')
      const { data } = await axios({
        url: `${END_POINT}/me`,
        method: 'POST',
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`
        }
      })
      commit('setUser', { user: data })
    }
  }
}
