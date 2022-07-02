import { createRouter, createWebHistory } from 'vue-router'

import Home from './Home.vue'
import ProductList from './admin/ProductList.vue'
import AddProduct from './admin/AddProduct.vue'
import Dashboard from './admin/Dashboard.vue'
import EditProduct from './admin/EditProduct.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
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
      name: 'EditProduct',
      path: '/admin/edit-product/:id',
      component: EditProduct,
      props: true
    },
    {
      path: '/amdmin/transaction-detail'
    }
  ]
})
