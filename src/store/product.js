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
      selectedProduct: {},
      selectedPrice:'',
      searchProductList: [],
      PurchaseHistories: [],
    }
  },
  getters: {
    getPurchasedProductId(state) {
      return state.PurchaseHistories.map(purchased => purchased.detailId)
    },
    myCartList(state) {
      return state.PurchaseHistories.filter(product => !product.done)
    }
  },
  mutations: {
    setState(state, payload) {
      for(const key in payload) {
        state[key] = payload[key]
      }
    },
  },
  actions: {
    async readAllProducts({commit}) {
      try {
        commit('changeLoadingStatus', true, { root: true })
        const {data} = await axios({
          url: END_POINT,
          method: 'GET',
          headers: {
            ...headers,
            'masterKey': 'true'
          }
        })
        commit('setState', {products: data})
      } catch(err) {
        console.log(err.code)
      } finally {
        commit('changeLoadingStatus', false, { root: true })
      }
    },
    async readProductDetail({commit}, id) {
      try {
        commit('changeLoadingStatus', true, { root: true })
        const {data} = await axios({
          url: `${END_POINT}/${id}`,
          method: 'GET',
          headers
        })
          commit('setState', {selectedProduct: data, selectedPrice:data.price.toLocaleString('ko-KR')})  
      } catch(err) {
        console.log(err.code)
      } finally {
        commit('changeLoadingStatus', false, { root: true })
      }
    },
    async requestPurchase({commit}, info) {
      const token = localStorage.getItem('token')
      try {
        commit('changeLoadingStatus', true, { root: true })
        await axios({
          url: `${END_POINT}/buy`,
          method: 'POST',
          headers: {
            ...headers,
            Authorization: `Bearer ${token}`
          },
          data: info
        })
      } catch(err) {
        console.log(err.code)
      } finally {
        commit('changeLoadingStatus', false, { root: true })
      }
    },
    async readPurchaseAllHistory({commit}) {
      const token = localStorage.getItem('token')
      try {
        commit('changeLoadingStatus', true, { root: true })
        const {data} = await axios({
          url: `${END_POINT}/transactions/details`,
          method: 'GET',
          headers: {
            ...headers,
            Authorization: `Bearer ${token}`
          },
        })
        const list = data.sort((a, b) => {
          const aTime= new Date(a.timePaid).getTime()
          const bTime= new Date(b.timePaid).getTime()
      
          return bTime - aTime
        })
          commit('setState', {PurchaseHistories: list})  
      } catch(err) {
        console.log(err.code)
      } finally {
        commit('changeLoadingStatus', false, { root: true })
      }
    },
    async cancelOrder({dispatch, commit}, id) {
      const token = localStorage.getItem('token')
      try {
        commit('changeLoadingStatus', true, { root: true })
        await axios({
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
        dispatch('readPurchaseAllHistory')
      } catch(err) {
        console.log(err.code)
      } finally {
        commit('changeLoadingStatus', false, { root: true })
      }
    },

    async confirmPurchase({dispatch, commit}, id) {
      const token = localStorage.getItem('token')
      try {
        commit('changeLoadingStatus', true, { root: true })
        await axios({
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
        dispatch('readPurchaseAllHistory')  
      } catch(err) {
        console.log(err.code)
      } finally {
        commit('changeLoadingStatus', false, { root: true })
      }
    },
    async searchProducts({commit}, search) {
      try {
        commit('changeLoadingStatus', true, { root: true })
        const {data} = await axios({
          url: `${END_POINT}/search`,
          method: 'POST',
          headers,
          data: search
        })
        commit('setState', {searchProductList: data})  
      } catch(err) {
        console.log(err.code)
      } finally {
        commit('changeLoadingStatus', false, { root: true })
      }
    },
  }
}

