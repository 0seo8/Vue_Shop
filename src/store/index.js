import { createStore } from 'vuex'
import admin from './admin'
import product from './product'

export default createStore({
  modules: {
    admin,
    product
  }
})
