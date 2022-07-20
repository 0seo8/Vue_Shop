<template>
  <div class="login-box">
    <form @submit.prevent="submitForm">
      <div class="user-box">
        <label for="email" />
        <input
          id="email"
          v-model.trim="email"
          placeholder="E-mail: 사용자 아이디 (필수!)"
          type="email">
      </div>
      <div class="user-box">
        <label for="name" />
        <input
          id="name"
          v-model.trim="displayName"
          placeholder="Id: 사용자 이름, 8자 이하 (필수!)"
          maxlength="5"
          type="name">
      </div>
      <div class="user-box">
        <label for="ps1" />
        <input
          id="ps1"
          v-model.trim="psw"
          type="password"
          placeholder="비밀번호: 8자 이상 필수">
      </div>

      <div class="user-box">
        <label for="user-profile-picture" />
        <input
          id="user-profile-picture"
          class="form-input"
          type="file"
          accept=".png, .jpg"
          @change="selectfile">
      </div>
      <p
        v-if="!formIsValid">
        올바르게 입력해주세요!
      </p>
      <button
        type="submit"
        class="btn btn-light">
        회원가입
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      psw: '',
      displayName: '',
      formIsValid: true,

      profileImgBase64: null,
    }
  },
  methods: {
    selectfile(event) {
      const { files } = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', () => {
          this.profileImgBase64 = reader.result
        })
      }
    },
    async submitForm() {
      this.formIsValid = true
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.psw.length < 6
      ) {
        this.formIsValid = false
        return
      }

      const actionPayload = {
        email: this.email,
        password: this.psw,
        displayName: this.displayName,

        profileImgBase64: this.profileImgBase64,
      }

      await this.$store.dispatch('auth/signup', actionPayload)
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
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
  .user-box {
    position: relative;
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
  }
}

@media screen and (max-width: 380px) {
.login-box {
  width: 100vw;
}
}
</style>
