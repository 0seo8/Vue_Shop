import { createStore } from 'vuex'
import admin from './admin'
import product from './product'
import user from './user'

export default createStore({
  modules: {
    admin,
    product,
    user
  }
})
