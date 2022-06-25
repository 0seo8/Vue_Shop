import axios from 'axios'
const { VITE_API_KEY, VITE_USERNAME } = import.meta.env

const END_POINT = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products'

const headers = {
  'content-type': 'application/json',
  'apikey': VITE_API_KEY,
  'username': VITE_USERNAME
}

export default {
  namespaced: true,
  state() {
    return {
      products: [],
      seletedProduct: [],
    }
  },
  mutations: {
    setState(state, payload) {
      for(const key in payload) {
        state[key] = payload[key]
      }
      console.log('state', state)
    },
  },
  actions: {
    async readAllProducts({commit}) {
      const {data} = await axios({
        url: END_POINT,
        method: 'GET',
        headers: {
          ...headers,
          'masterKey': 'true'
        }
      })
        commit('setState', {products: data})
    },
    async readProductDetail({commit}, id) {
      const {data} = await axios({
        url: `${END_POINT}/${id}`,
        method: 'GET',
        headers
      })
        commit('setState', {seletedProduct: data})
    },
    async requestPurchase({commit}, info) {
      const token = localStorage.getItem('token')
      await axios({
        url: `${END_POINT}/buy`,
        method: 'POST',
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`
        },
        data: info
      })
      commit('setState', {cart: info})
    },
  }
}
