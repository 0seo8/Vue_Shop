import router from "./index.js";

router.beforeEach((to) => {
  if (to.meta.auth) {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      alert("로그인을 해주세요!");
      return "/login";
    }
  }

  return true;
});
