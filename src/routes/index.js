import { createRouter, createWebHistory } from 'vue-router'

import Home from './Home.vue'
import ProductList from './admin/ProductList.vue'
import AddProduct from './admin/AddProduct.vue'
import Dashboard from './admin/Dashboard.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/admin',
      component: ProductList
    },
    {
      path: '/admin/add-product',
      component: AddProduct
    },
    {
      path: '/admin/dashboard',
      component: Dashboard
    }
  ]
})
