<template>
  <RouterLink to="/">HOME</RouterLink>
  <form @submit.prevent="submitForm">
    <div>
      <label for="email">E-Mail: </label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div>
      <label for="name">Id: </label>
      <input type="name" id="name" v-model.trim="displayName" />
    </div>
    <div>
      <label for="ps1">password: </label>
      <input
        type="password"
        id="ps1"
        v-model.trim="psw"
        placeholder="8자 이상 필수"
      />
    </div>
    <p v-if="!formIsValid">입력 제대로 하셈.</p>
    <input type="submit" value="회원가입" />
  </form>
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
    };
  },
  methods: {
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
      };

      await this.$store.dispatch("auth/signup", actionPayload);
      this.$router.push("/login");
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
