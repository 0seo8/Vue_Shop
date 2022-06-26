import axios from 'axios'
const { VITE_API_KEY, VITE_USERNAME } = import.meta.env

export default {
  namespaced: true,
  state: {
    productList: [],
    totalTransaction: []
  },
  mutations: {
    setProductList(state, payload) {
      state.productList = payload
    },
    setTotalTransaction(state, payload) {
      state.totalProduct = payload
    }
  },
  actions: {
    async readProducts({ commit }) {
      const res = await request('', 'GET')
      commit('setProductList', res)
    },
    async readTotalTransactions({ commit }) {
      const res = await request('/transactions/all', 'GET')
      commit('setTotalTransaction', res)
    }
  }
}

async function request(url = '', method) {
  const { data } = await axios({
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products${url}`,
    method: method,
    headers: {
      'content-type': 'application/json',
      apikey: VITE_API_KEY,
      username: VITE_USERNAME,
      masterKey: true
    }
  })
  return data
}
