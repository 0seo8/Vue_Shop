<template>
  <RouterLink to="/">
    HOME
  </RouterLink>
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">Email</label>
      <input
        id="name"
        v-model.trim="email"
        type="email" />
    </div>
    <div>
      <label for="ps1">password</label>
      <input
        id="ps1"
        v-model.trim="password"
        type="password" />
    </div>
    <input
      type="submit"
      value="로그인" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
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
  },
}
</script>

<style scoped></style>
