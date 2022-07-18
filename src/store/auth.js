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
      isLoading: false,
    }
  },
  mutations: {
    setUser(state, payload) {
      for (const key in payload) {
        state[key] = payload[key]
      }
      console.log(state)
    },
    changeLoaingStatus(state, status=true) {
      state.isLoading = status
    },
  },
  actions: {
    async login({ commit }, payload) {
      try {
        commit('changeLoaingStatus')
        const { data } = await axios({
          url: `${END_POINT}/login`,
          method: 'POST',
          headers: {
            ...headers,
          },
          data: payload,
        })
        commit('setUser', { user: data.user })
        window.localStorage.setItem('token', data.accessToken)
      }catch(error){
        console.log(error)
        window.localStorage.removeItem('token')
      } finally {
        commit('changeLoaingStatus', false)       
      }
    },
    async signup({ commit }, payload) {
      try {
        commit('changeLoaingStatus')
        const { data } = await axios({
          url: `${END_POINT}/signup`,
          method: 'POST',
          headers: {
            ...headers,
          },
          data: payload,
        })
        commit('setUser', { user: data.user })
      } catch(err) {
        console.log(err)
      } finally {
        commit('changeLoaingStatus', false)
      }
      
    },

    async logOut({commit}) {
      const accessToken = window.localStorage.getItem('token')
      try {
        commit('changeLoaingStatus')
        await axios({
          url: `${END_POINT}/logout`,
          method: 'POST',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
        })
        window.localStorage.removeItem('token')
        commit('setUser', {user: {}})
      } catch(err) {
        console.log(err)
      } finally {
        commit('changeLoaingStatus', false)
      }
    },
    async changeProfile({ commit }, payload) {
      const accessToken = window.localStorage.getItem('token')
      try {
        commit('changeLoaingStatus')
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
      } catch(err) {
        console.log(err)
      } finally {
        commit('changeLoaingStatus', false)
      }
    },
    async authenticationCheck({ commit }) {
      const accessToken = window.localStorage.getItem('token')
      try {
        commit('changeLoaingStatus')
        const { data } = await axios({
          url: `${END_POINT}/me`,
          method: 'POST',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
        })
        commit('setUser', { user: data })
      } catch(err) {
        console.log(err)
      } finally {
        commit('changeLoaingStatus', false)
      }
    },
    deleteAdminInfo({ commit }) {
      commit('setUser', { findAdmin: false })
    },
    async findAdmin({ commit }) {
      const accessToken = window.localStorage.getItem('token')
      if (accessToken) {
        try {
          commit('changeLoaingStatus')
          const { data } = await axios({
            url: `${END_POINT}/me`,
            method: 'POST',
            headers: {
              ...headers,
              Authorization: `Bearer ${accessToken}`,
            },
          })
          commit('setUser', { findAdmin: data.email.includes('admin') })
        } catch(err) {
          console.log(err)
        } finally {
          commit('changeLoaingStatus', false)
        }
      }
    },
  },
}
