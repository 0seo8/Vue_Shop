<template>
  <div class="profile-box">
    <form @submit.prevent="submitForm">
      <div class="user-box">
        <label for="name">New Id: </label>
        <input
          id="name"
          v-model.trim="displayName"
          type="name"
          placeholder="Id: 사용자 이름, 8자 이하 (필수!)"
          maxlength="5">
      </div>
      <div class="user-box">
        <label for="ps1">Old password: </label>
        <input
          id="ps1"
          v-model.trim="oldPsw"
          type="password"
          placeholder="8자 이상 필수"
          minlength="8">
      </div>
      <div class="user-box">
        <label for="ps2">New password: </label>
        <input
          id="ps2"
          v-model.trim="newPsw"
          type="password"
          placeholder="8자 이상 필수"
          minlength="8">
      </div>

      <div class="user-box">
        <label for="user-profile-picture">프로필 사진</label>
        <input
          id="user-profile-picture"
          class="form-input"
          type="file"
          accept=".png, .jpg"
          @change="selectFile">
      </div>
      <!-- <p v-if="!formIsValid">입력 제대로 하셈.</p> -->
      <input
        type="submit"
        value="회원정보 수정">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPsw: '',
      newPsw: '',
      displayName: '',

      profileImgBase64: '',
    }
  },
  methods: {
    async submitForm() {
      if (this.oldPsw.length < 6 || this.newPsw.length < 6) {
        return
      }

      const actionPayload = {
        oldPassword: this.oldPsw,
        newPassword: this.newPsw,
        displayName: this.displayName,

        profileImgBase64: this.profileImgBase64,
      }

      await this.$store.dispatch('auth/changeProfile', actionPayload)
      this.$router.push('/mypage')
    },

    selectFile(event) {
      const { files } = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', () => {
          this.profileImgBase64 = reader.result
        })
      }
    },
  },
}
</script>

<style scoped>
.profile-box {
  position: relative;
  top: 350px;
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

/* form {
  margin: 1rem;
  padding: 1rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  width: 50%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem; */
/* } */

.profile-box .user-box input {
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
.profile-box .user-box label {
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
