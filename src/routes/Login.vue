<template>
  <div class="login-box">
    <div class="login-title">
      <h5>Electron Market에 오신걸 환영합니다!</h5>
    </div>
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
      <div class="btn-box">
        <button
          class="btn-login btn btn-light btn-sm"
          type="submit"
          :disabled="!validated">
          로그인
        </button>
        <button
          id="signup"
          type="button"
          class="btn btn-light btn-sm"
          @click="$router.push('/signup')">
          회원가입
        </button>
      </div>
    </form>
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
  .login-box {
    position: relative;
    top: 250px;
    left: 50%;
    margin-bottom: 120px;
    width: 500px;
    padding: 50px;
    transform: translate(-50%, -50%);
    background: var(--color-sub-primary);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
    border-radius: 10px;
  .login-title {
    text-align: center;
    margin-bottom: 20px;
    color: var(--color-pirmary);
    background-color: #fff;
    padding: 0.7rem;
    border-radius: 4px;
    h5 {
      margin: 0;
    }
  }
  .user-box {
    position: relative;
    label {
      position: absolute;
      top: 0;
      left: 0;
      padding: 10px 0;
      font-size: 16px;
      color: #fff;
      pointer-events: none;
      transition: 0.5s;
    }
    input {
      width: 100%;
      padding: 10px 0;
      font-size: 16px;
      color: #fff;
      margin-bottom: 30px;
      border: none;
      border-bottom: 1px solid #fff;
      outline: none;
      background: transparent;
      &::placeholder {
        color: var(--color-gray-100)
      }
      &:focus {
        border-color: var(--color-pirmary);
        outline: none;
        border-width: 2px;
      }
    }
  }
  .btn-box {
    #signup {
        color: var(--color-pirmary);
      }
    .btn-login {
      margin-right: 0.5rem;
      color: var(--color-pirmary);
      .login {
        background-color: inherit;
        color: var(--color-pirmary);
        border: none;
        &[disabled] {
          color: var(--color-gray-600);
        }
      }
    }
  }
  /* h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
    } */
  }
}
</style>
