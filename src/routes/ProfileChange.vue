<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">New Id: </label>
      <input type="name" id="name" v-model.trim="displayName" />
    </div>
    <div>
      <label for="ps1">Old password: </label>
      <input
        type="password"
        id="ps1"
        v-model.trim="oldPsw"
        placeholder="8자 이상 필수"
      />
    </div>
    <div>
      <label for="ps2">New password: </label>
      <input
        type="password"
        id="ps2"
        v-model.trim="newPsw"
        placeholder="8자 이상 필수"
      />
    </div>
    <!-- <p v-if="!formIsValid">입력 제대로 하셈.</p> -->
    <input type="submit" value="회원정보 수정" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      oldPsw: "",
      newPsw: "",
      displayName: "",
    };
  },
  methods: {
    async submitForm() {
      if (this.oldPsw.length < 6 || this.newPsw.length < 6) {
        return;
      }

      const actionPayload = {
        oldPassword: this.oldPsw,
        newPassword: this.newPsw,
        displayName: this.displayName,
      };

      await this.$store.dispatch("auth/changeProfile", actionPayload);
      this.$router.push("/mypage");
    },
  },
};
</script>

<style scoped>
form {
  padding-top: 80px;
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
  padding: 0.15rem;
}

input:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
