import { createStore } from "vuex";
import admin from "./admin";
import account from "./account";

export default createStore({
  modules: {
    admin,
    account,
  },
});
