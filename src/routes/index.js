import { createRouter, createWebHistory } from 'vue-router'

import Home from './Home.vue'
import Login from './Login.vue'
// import Admin from './admin/Admin.vue'
import AddProduct from './admin/AddProduct.vue'
import Dashboard from './admin/Dashboard.vue'
import ProductList from './admin/ProductList.vue'
import TheProducts from './product/TheProducts.vue'
import DetailProduct from './product/DetailProduct.vue'
import OrderForm from './product/OrderForm.vue'
import OrderList from './product/OrderList.vue'
import SearchProduct from './product/SearchProduct.vue'
import EditProduct from './admin/EditProduct.vue'
import MyPage from './MyPage.vue'
import Signup from './Signup.vue'
import ProfileChange from './ProfileChange.vue'

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
      path: '/:category',
      name: 'product',
      component: TheProducts
    },
    {
      path: '/product/:id',
      component: DetailProduct,
      name: 'detailpage'
    },
    {
      path: '/purchase',
      component: OrderForm
    },
    {
      path: '/orderlist',
      component: OrderList
    },
    {
      path: '/search',
      name: 'search',
      component: SearchProduct
    },
    {
      path: '/admin/edit-product/:id',
      component: EditProduct,
      props: true
    },
    {
      path: '/amdmin/transaction-detail'
    },
    {
      path: '/mypage',
      component: MyPage
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/profilechange',
      component: ProfileChange
    }
  ]
})
