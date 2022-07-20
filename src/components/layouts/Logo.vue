<template lang="">
  <RouterLink
    to="/"
    class="logo">
    <img
      src="/assets/logo.png"
      alt="Electron Mart">
  </RouterLink>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.logo {
  display: inline-block;
  font-family: "GmarketSansMedium";
  font-size: 30px;
  color: var(--color-text-base);
  text-decoration: none;
  overflow: hidden;
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  &:hover {
    color: var(--color-text-base);
  }
}

@media screen and (max-width: 380px) {
  .logo img {
    width: 30px;
    height: 30px;
  }
}
</style>
