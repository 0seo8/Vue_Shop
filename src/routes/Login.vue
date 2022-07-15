<template>
  <RouterLink to="/">
    HOME
  </RouterLink>
  <div class="login-box">
    <form @submit.prevent="submitForm">
      <div class="user-box">
        <label for="name" />
        <input
          id="name"
          v-model.trim="email"
          placeholder="Email"
          type="email">
      </div>
      <div class="user-box">
        <label for="ps1" />
        <input
          id="ps1"
          v-model.trim="password"
          placeholder="Password"
          type="password">
      </div>
      <input
        :disabled="!validated"
        type="submit"
        value="로그인">
    </form>
    <button
      class="btn btn-primary"
      @click="$router.push('/signup')">
      회원가입
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    validated() {
      return this.validateEmail(this.email)
    },
  },
  methods: {
    async submitForm() {
      const actionPayload = {
        email: this.email,
        password: this.password,
      }
      await this.$store.dispatch('auth/login', actionPayload)
      await this.$store.dispatch('auth/findAdmin')
      this.$router.push('/mypage')
    },
    validateEmail(email) {
      const re =
        // eslint-disable-next-line no-useless-escape
        /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/
      return re.test(email)
    },
  },
}
</script>

<style scoped lang="scss">
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
</style>
