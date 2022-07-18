<template lang="">
  <RouterLink
    to="/"
    class="logo">
    <img
      src="/public/assets/Logo.png"
      alt="Electron Mart">
  </RouterLink>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
@import "~/scss/main.scss";
.logo {
  display: inline-block;
  font-family: "GmarketSansMedium";
  font-size: 30px;
  color: var(--color-text-base);
  text-decoration: none;
  img {
    width: 36px;
    height: 36px;
    border-radius: 20px;
  }
  &:hover {
    color: var(--color-text-base);
  }
}
</style>
