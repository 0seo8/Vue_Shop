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
      products: []
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
  }
}
