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
      cart: [],
      PurchaseHistories: [],
    }
  },
  getters: {
    getPurchasedProductId(state) {
      return state.PurchaseHistories.map(purchased => purchased.detailId)
    }
  },
  mutations: {
    setState(state, payload) {
      for(const key in payload) {
        state[key] = payload[key]
      }
      console.log(state)
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
    async requestPurchase(_, info) {
      const token = localStorage.getItem('token')
      console.log(token)
      await axios({
        url: `${END_POINT}/buy`,
        method: 'POST',
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`
        },
        data: info
      })
    },
    async readPurchaseAllHistory({commit}) {
      const token = localStorage.getItem('token')
      const {data} = await axios({
        url: `${END_POINT}/transactions/details`,
        method: 'GET',
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`
        },
      })
        console.log(data)
        commit('setState', {PurchaseHistories: data})
    },
    async cancelOrder({dispatch}, id) {
      console.log('id', id)
      const token = localStorage.getItem('token')
      const {data} = await axios({
        url: `${END_POINT}/cancel`,
        method: 'POST',
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`
        },
        data: {
          detailId: id
        }
      })
      console.log(data) 
      dispatch('readPurchaseAllHistory')
    },
    async confirmPurchase({dispatch}, id) {
      const token = localStorage.getItem('token')
      console.log(id, token)
      const {data} = await axios({
        url: `${END_POINT}/ok`,
        method: 'POST',
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`
        },
        data: {
          detailId: id
        }
      })
      console.log(data) 
      dispatch('readPurchaseAllHistory')
    },
  }
}
