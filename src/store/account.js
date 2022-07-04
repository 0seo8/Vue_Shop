import axios from "axios";
const { VITE_API_KEY, VITE_USERNAME } = import.meta.env;

export default {
  namespaced: true,
  state() {
    return {
      currentAccounts: [],
      allAccount: [],
    };
  },
  mutations: {
    setCurrentAccounts(state, payload) {
      state.currentAccounts = payload;
    },
    setAllAccount(state, payload) {
      state.allAccount = payload;
    },
  },
  actions: {
    async getCurrentAccounts({ commit }) {
      const accessToken = window.localStorage.getItem("token");
      const res = await axios({
        url: "https://asia-northeast3-heropy-api.cloudfunctions.net/api/account",
        method: "GET",
        headers: {
          "content-type": "application/json",
          apikey: "FcKdtJs202204",
          username: "KDT2_TEAM5",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      commit("setCurrentAccounts", res.data);
    },
    async getAllAccount({ commit }) {
      const accessToken = window.localStorage.getItem("token");
      const res = await axios({
        url: "https://asia-northeast3-heropy-api.cloudfunctions.net/api/account/banks",
        method: "GET",
        headers: {
          "content-type": "application/json",
          apikey: "FcKdtJs202204",
          username: "KDT2_TEAM5",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      commit("setAllAccount", res.data);
    },
    async connectAccount(context, payload) {
      const { bankCode, accountNumber } = payload;
      const accessToken = window.localStorage.getItem("token");
      await fetch(
        "https://asia-northeast3-heropy-api.cloudfunctions.net/api/account",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            apikey: "FcKdtJs202204",
            username: "KDT2_TEAM5",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            bankCode,
            accountNumber: randomNumber(accountNumber),
            phoneNumber: "01012345678",
            signature: true,
          }),
        }
      );
    },
    async disConnectAccount(context, accountId) {
      const accessToken = window.localStorage.getItem("token");
      await fetch(
        "https://asia-northeast3-heropy-api.cloudfunctions.net/api/account",
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            apikey: "FcKdtJs202204",
            username: "KDT2_TEAM5",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            accountId,
            signature: true,
          }),
        }
      );
    },
  },
};

function randomNumber(n) {
  let str = "";
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}
