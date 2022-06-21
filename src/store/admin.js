import axios from 'axios'
const { VITE_API_KEY, VITE_USERNAME } = import.meta.env

export default {
  namespaced: true,
  state: {
    productList: []
  },
  mutations: {
    setProductList(state, payload) {
      state.productList = payload
    }
  },
  actions: {
    async readProducts({ commit }) {
      const res = await requestRead()
      commit('setProductList', res)
    }
  }
}

async function requestRead() {
  const { data } = await axios({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      apikey: VITE_API_KEY,
      username: VITE_USERNAME,
      masterKey: true
    }
  })
  return data
}
