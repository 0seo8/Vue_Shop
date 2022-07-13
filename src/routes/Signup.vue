<template>
  <RouterLink to="/"> HOME </RouterLink>
  <div class="login-box">
    <form @submit.prevent="submitForm">
      <div class="user-box">
        <label for="email"></label>
        <input
          placeholder="E-mail: 사용자 아이디 (필수!)"
          id="email"
          v-model.trim="email"
          type="email"
        />
      </div>
      <div class="user-box">
        <label for="name"></label>
        <input
          placeholder="Id: 사용자 이름, 20자 이하 (필수!)"
          id="name"
          v-model.trim="displayName"
          type="name"
        />
      </div>
      <div class="user-box">
        <label for="ps1"></label>
        <input
          id="ps1"
          v-model.trim="psw"
          type="password"
          placeholder="비밀번호: 8자 이상 필수"
        />
      </div>

      <div class="user-box">
        <label for="user-profile-picture"></label>
        <input
          class="form-input"
          type="file"
          id="user-profile-picture"
          accept=".png, .jpg"
          @change="selectfile"
        />
      </div>
      <p v-if="!formIsValid">입력 제대로 하셈.</p>
      <input type="submit" value="회원가입" />
    </form>
  </div>
</template>

<script>
import Login from "./Login.vue";
export default {
  components: {
    Login,
  },
  data() {
    return {
      email: "",
      psw: "",
      displayName: "",
      formIsValid: true,

      profileImgBase64: null,
    };
  },
  methods: {
    selectfile(event) {
      // console.log(event)
      // const files= event.target.files
      const { files } = event.target;
      for (const file of files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
          this.profileImgBase64 = reader.result;
        });
      }
    },
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.psw.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      const actionPayload = {
        email: this.email,
        password: this.psw,
        displayName: this.displayName,

        profileImgBase64: this.profileImgBase64,
      };

      await this.$store.dispatch("auth/signup", actionPayload);
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
}

.login-box {
  position: relative;
  top: 250px;
  left: 50%;
  margin-bottom: 120px;
  width: 500px;
  padding: 50px;
  transform: translate(-50%, -50%);
  background: #f2555a;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

input::placeholder {
  color: #fff;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

input:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
