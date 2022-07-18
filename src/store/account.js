import axios from 'axios'
const { VITE_API_KEY, VITE_USERNAME } = import.meta.env

const END_POINT =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account'

const headers = {
  'content-type': 'application/json',
  apikey: VITE_API_KEY,
  username: VITE_USERNAME,
}

export default {
  namespaced: true,
  state() {
    return {
      currentAccounts: [],
      allAccount: [],
      isLoading: false,
    }
  },
  mutations: {
    setState(state, payload) {
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
    async getCurrentAccounts({ commit }) {
      const accessToken = window.localStorage.getItem('token')
      try{
        commit('changeLoaingStatus')
        const { data } = await axios({
          url: END_POINT,
          method: 'GET',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
        })
        commit('setState', { currentAccounts: data })
      } catch(err) {
        console.log(err)
      } finally {
        commit('changeLoaingStatus', false)      
      }
    },
    async getAllAccount({ commit }) {
      const accessToken = window.localStorage.getItem('token')
      try {
        commit('changeLoaingStatus')
        const { data } = await axios({
          url: `${END_POINT}/banks`,
          method: 'GET',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
        })
        commit('setState', { allAccount: data })
      } catch(err) {
        console.log(err)
      } finally {
        commit('changeLoaingStatus', false)
      }
    },
    async connectAccount({commit}, payload) {
      const accessToken = window.localStorage.getItem('token')
      const { bankCode, accountNumber } = payload
      try {
        commit('changeLoaingStatus')
        await axios({
          url: END_POINT,
          method: 'POST',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            bankCode,
            accountNumber: randomNumber(accountNumber),
            phoneNumber: '01012345678',
            signature: true,
          },
        })
      } catch(err) {
        console.log(err)
      } finally {
        commit('changeLoaingStatus', false)
      }
    },
    async disConnectAccount({commit}, accountId) {
      const accessToken = window.localStorage.getItem('token')
      try {
        commit('changeLoaingStatus')
        await axios({
          url: END_POINT,
          method: 'DELETE',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            accountId,
            signature: true,
          },
        })
      } catch(err) {
        console.log(err)
      } finally {
        commit('changeLoaingStatus', false)
      }
    },
  },
}

function randomNumber(n) {
  let str = ''
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10)
  }
  return str
}
