import { createStore } from 'vuex'
import admin from './admin'
import product from './product'
import account from './account'
import auth from './auth'

export default createStore({
  state: () => ({
    isLoading: false,
  }),
  mutations: {
    changeLoadingStatus(state, status=true) {
      if(this.state === status) return 
      state.isLoading = status
    },
  },
  modules: {
    admin,
    product,
    account,
    auth,
  },
})
