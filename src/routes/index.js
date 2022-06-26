import { createRouter, createWebHistory } from "vue-router";

import Home from "./Home.vue";
import Admin from "./admin/Admin.vue";
import AddProduct from "./admin/AddProduct.vue";
import MyPage from "./MyPage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/admin",
      component: Admin,
    },
    {
      path: "/admin/add-product",
      component: AddProduct,
    },
    {
      path: "/mypage",
      component: MyPage,
    },
  ],
});
