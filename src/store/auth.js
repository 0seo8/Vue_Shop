import axios from 'axios'
const { VITE_API_KEY, VITE_USERNAME } = import.meta.env

const END_POINT =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth'

const headers = {
  'content-type': 'application/json',
  apikey: VITE_API_KEY,
  username: VITE_USERNAME,
}

export default {
  namespaced: true,
  state() {
    return {
      user: {},
      token: null,
      findAdmin: false,
    }
  },
  mutations: {
    setUser(state, payload) {
      for (const key in payload) {
        state[key] = payload[key]
      }
      console.log(state)
    },
  },
  actions: {
    async login({ commit }, payload) {

      try {
        const { data } = await axios({
          url: `${END_POINT}/login`,
          method: 'POST',
          headers: {
            ...headers,
          },
          data: payload,
        })
        window.localStorage.setItem('token', data.accessToken)
        commit('setUser', { user: data.user })
  
      }catch(error){
        console.log(error)
        window.localStorage.clear()
      }
    },
    async signup({ commit }, payload) {
      const { data } = await axios({
        url: `${END_POINT}/signup`,
        method: 'POST',
        headers: {
          ...headers,
        },
        data: payload,
      }).catch((error) => {
        console.log(error)
      })
      commit('setUser', { user: data.user })
    },

    async logOut({commit}) {
      const accessToken = window.localStorage.getItem('token')
      await axios({
        url: `${END_POINT}/logout`,
        method: 'POST',
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      }).catch((error) => {
        console.log(error)
      })
      window.localStorage.clear()
      commit('setUser', {user: {}})
    },
    async changeProfile({ commit }, payload) {
      console.log('payload', payload)
      const accessToken = window.localStorage.getItem('token')
      const { data } = await axios({
        url: `${END_POINT}/user`,
        method: 'PUT',
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
        data: payload,
      })
      commit('setUser', { user: data })
    },
    async authenticationCheck({ commit }) {
      const accessToken = window.localStorage.getItem('token')
      const { data } = await axios({
        url: `${END_POINT}/me`,
        method: 'POST',
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      })
      commit('setUser', { user: data })
    },
    deleteAdminInfo({ commit }) {
      commit('setUser', { findAdmin: false })
    },
    async findAdmin({ commit }) {
      const accessToken = window.localStorage.getItem('token')
      if (accessToken) {
        const { data } = await axios({
          url: `${END_POINT}/me`,
          method: 'POST',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
        })
        commit('setUser', { findAdmin: data.email.includes('admin') })
      }
    },
  },
}
