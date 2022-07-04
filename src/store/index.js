import { createStore } from "vuex";
import admin from "./admin";
import product from "./product";
import user from "./user";
import account from "./account";
import auth from "./auth";

export default createStore({
  modules: {
    admin,
    product,
    user,
    account,
    auth,
  },
});
