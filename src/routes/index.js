import { createRouter, createWebHistory } from 'vue-router'

import Home from './Home.vue'
import Login from '~/routes/Login.vue'
// import Admin from '~/routes/admin/Admin.vue'
import AddProduct from './admin/AddProduct.vue'
import Dashboard from './admin/Dashboard.vue'
import ProductList from './admin/ProductList.vue'
import DetailProduct from '~/routes/product/DetailProduct.vue'
import OrderForm from '~/routes/product/OrderForm.vue'
import OrderList from '~/routes/product/OrderList.vue'

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
      component: Dashboard
    },
    {
      path: '/admin/add-product',
      component: AddProduct
    },
    {
      path: '/admin/product-list',
      component: ProductList
    },
    {
      path: '/:id',
      component: DetailProduct,
      name: 'product',
    },
    {
      path: '/purchase',
      component: OrderForm,
    },
    {
      path: '/orderlist',
      component: OrderList,
    },
  ]
})
