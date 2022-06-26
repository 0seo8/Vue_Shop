<template>
  <header>
    <div class="header">
      <Logo />
      <NavBar />
    </div>
  </header>
</template>

<script>
import Logo from '~/components/layouts/Logo.vue'
import NavBar from '~/components/layouts/NavBar.vue'
export default {
  components: {
    Logo,
    NavBar,
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 80vw;
  height: 80px;
  margin: 0 auto;
  display: flex;
  align-items: center;
}
</style>

