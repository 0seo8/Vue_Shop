import { createRouter, createWebHistory } from 'vue-router'

import Home from './Home.vue'
import Admin from '~/routes/admin/Admin.vue'
import AddProduct from '~/routes/admin/AddProduct.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/admin',
      component: Admin
    },
    {
      path: '/admin/add-product',
      component: AddProduct
    }
  ]
})
