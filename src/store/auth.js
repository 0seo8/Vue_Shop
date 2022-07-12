import axios from "axios";
const { VITE_API_KEY, VITE_USERNAME } = import.meta.env;

const END_POINT =
  "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth";

const headers = {
  "content-type": "application/json",
  apikey: VITE_API_KEY,
  username: VITE_USERNAME,
};

export default {
  namespaced: true,
  state() {
    return {
      user: {},
      token: null,
      logined: null,

      img: "",
    };
  },
  mutations: {
    setUser(state, payload) {
      console.log("payload: ", payload);
      state.user = payload.user;
      state.token = payload.token;
      state.logined = payload.logined;
      state.img = payload.img;
    },
  },
  getters: {
    userId(state) {
      return state.user;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    userimg(state) {
      return state.img;
    },
  },
  actions: {
    async login(context, payload) {
      const response = await fetch(
        "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            apikey: "FcKdtJs202204",
            username: "KDT2_TEAM5",
          },
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
          }),
        }
      );

      const dataForm = await response.json();
      window.localStorage.setItem("token", dataForm.accessToken);
      window.localStorage.setItem("user", JSON.stringify(dataForm.user));

      alert(dataForm);
      console.log("dataform: ", dataForm);
      // console.log("dataform: ", dataForm.user.profileImg);
      context.commit("setUser", {
        user: dataForm.user,
        token: dataForm.accessToken,

        img: dataForm.user.profileImg,
      });

      if (!response.ok) {
        console.log(dataForm);
        const error = new Error(
          dataForm.message || "Failed to authenticate. Check your login data."
        );
        throw error;
      }
    },
    async signup(context, payload) {
      const response = await fetch(
        "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            apikey: "FcKdtJs202204",
            username: "KDT2_TEAM5",
          },
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            displayName: payload.displayName,

            profileImgBase64: payload.profileImgBase64,
          }),
        }
      );

      const dataForm = await response.json();
      alert(dataForm);
      context.commit("setUser", {
        user: dataForm.user,
        token: dataForm.accessToken,

        img: dataForm.user.profileImg,
      });
    },
    async logOut() {
      const accessToken = window.localStorage.getItem("token");
      await fetch(
        "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            apikey: "FcKdtJs202204",
            username: "KDT2_TEAM5",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      window.localStorage.clear();
    },
    async changeProfile(context, payload) {
      const accessToken = window.localStorage.getItem("token");
      const res = await fetch(
        "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user",
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            apikey: "FcKdtJs202204",
            username: "KDT2_TEAM5",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            displayName: payload.displayName,
            oldPassword: payload.oldPassword,
            newPassword: payload.newPassword,

            profileImgBase64: payload.profileImgBase64,
          }),
        }
      );
      const dataForm = await res.json();
      window.localStorage.setItem("user", JSON.stringify(dataForm));
      alert(dataForm);
      context.commit("setUser", {
        img: dataForm.profileImg,
      });
      if (!res.ok) {
        console.log(dataForm);
        const error = new Error(
          dataForm.message || "Failed to authenticate. Check your login data."
        );
        throw error;
      }
    },
    findLocalStorageUser(context) {
      const accessToken = window.localStorage.getItem("token");
      if (accessToken == null) {
        context.commit("setUser", {
          logined: false,
        });
      } else {
        context.commit("setUser", {
          logined: true,
        });
      }
    },
    async authenticationCheck({ commit }) {
      const accessToken = window.localStorage.getItem("token");
      const { data } = await axios({
        url: `${END_POINT}/me`,
        method: "POST",
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      commit("setUser", { user: data });
    },
  },
};
