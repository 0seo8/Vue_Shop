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
    }
  },
  mutations: {
    setState(state, payload) {
      for (const key in payload) {
        state[key] = payload[key]
      }
      console.log(state)
    },
  },
  actions: {
    async getCurrentAccounts({ commit }) {
      const accessToken = window.localStorage.getItem('token')
      try{
        commit('changeLoadingStatus', true, { root: true })
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
        commit('changeLoadingStatus', false, { root: true })
      }
    },
    async getAllAccount({ commit }) {
      const accessToken = window.localStorage.getItem('token')
      try {
        commit('changeLoadingStatus', true, { root: true })
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
        commit('changeLoadingStatus', false, { root: true })
      }
    },
    async connectAccount(_, payload) {
      const accessToken = window.localStorage.getItem('token')
      const { bankCode, accountNumber } = payload
      try {
        commit('changeLoadingStatus', true, { root: true })
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
        commit('changeLoadingStatus', false, { root: true })
      }
    },
    async disConnectAccount(_, accountId) {
      const accessToken = window.localStorage.getItem('token')
      try {
        commit('changeLoadingStatus', true, { root: true })
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
        commit('changeLoadingStatus', false, { root: true })
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
