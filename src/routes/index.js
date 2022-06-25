import { createRouter, createWebHistory } from 'vue-router'

import Home from './Home.vue'
import HomeAppliances from '~/routes/product/HomeAppliances.vue'
import SeasonAppliances from '~/routes/product/SeasonAppliances.vue'
import Login from '~/routes/Login.vue'
import Admin from '~/routes/admin/Admin.vue'
import AddProduct from '~/routes/admin/AddProduct.vue'
import DetailProduct from '~/routes/product/DetailProduct.vue'
import CheckPayment from '~/routes/product/CheckPayment.vue'
import MyCart from '~/routes/product/MyCart.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/admin',
      component: Admin
    },
    {
      path: '/admin/add-product',
      component: AddProduct
    },
    {
      path: '/HomeAP',
      component: HomeAppliances
    },
    {
      path: '/SeasonAP',
      component: SeasonAppliances
    },
    {
      path: '/:id',
      component: DetailProduct,
      name: 'product',
    },
    {
      path: '/purchase',
      component: CheckPayment,
    },
    {
      path: '/cart',
      component: MyCart,
    },

  ]
})
