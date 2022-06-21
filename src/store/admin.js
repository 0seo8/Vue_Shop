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
      const res = await this.$fetch('/products', {
        headers: {
          masterKey: true
        },
        method: 'GET'
      })
      commit('setProductList', res)
    }
  }
}

const _URL = '/products'

const res = this.$fetch(`${_URL}`, {
  method: 'GET',
  headers: {
    masterKey: true
  }
})

console.log(res)
