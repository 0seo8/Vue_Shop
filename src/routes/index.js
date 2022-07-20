import { createRouter, createWebHistory } from 'vue-router'

import Home from './Home.vue'
import Login from './Login.vue'
import AddProduct from './admin/AddProduct.vue'
import Dashboard from './admin/Dashboard.vue'
import AdminProductList from './admin/AdminProductList.vue'
import TheProducts from './product/TheProducts.vue'
import DetailProduct from './product/DetailProduct.vue'
import OrderForm from './product/OrderForm.vue'
import OrderList from './product/OrderList.vue'
import SearchProduct from './product/SearchProduct.vue'
import EditProduct from './admin/EditProduct.vue'
import MyPage from './MyPage.vue'
import Signup from './Signup.vue'
import ProfileChange from './ProfileChange.vue'
import store from '~/store'
import NotFound from './product/NotFound.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
        },
      ]
    },
    {
      path: '/mypage',
      component: MyPage,
      meta: { auth: true },
    },
    {
      path: '/signup',
      component: Signup,
    },
    {
      path: '/profilechange',
      component: ProfileChange,
      meta: { auth: true },
    },
    {
      path: '/category/:category',
      name: 'product',
      component: TheProducts,
    },
    {
      path: '/product/:id',
      component: DetailProduct,
      name: 'detailpage',
      meta: { auth: true },
    },
    {
      path: '/purchase',
      component: OrderForm,
      meta: { auth: true },
    },
    {
      path: '/orderlist',
      component: OrderList,
      meta: { auth: true },
    },
    {
      path: '/search',
      name: 'search',
      component: SearchProduct,
    },
    // admin 페이지
    {
      path: '/admin',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        const isAdmin = store?.state?.auth.findAdmin
        if (!isAdmin) {
          confirm('관리자만 접근이 가능합니다.')
          return next({ path: '/' })
        }
        next()
      },
    },
    {
      path: '/admin/add-product',
      component: AddProduct,
    },
    {
      name: 'AdminProductList',
      path: '/admin/product-list',
      component: AdminProductList,
    },
    {
      name: 'EditProduct',
      path: '/admin/edit-product/:id',
      component: EditProduct,
      props: true,
    },
    {
      path: '/amdmin/transaction-detail',
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
      meta: { hideNavigation: true },
    },
  ],
})
