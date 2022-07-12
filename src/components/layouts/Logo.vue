<template lang="">
  <RouterLink
    to="/"
    class="logo">
    <img
      src="../../assets/Logo.png"
      alt="Electron Mart" />
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
  color: #000;
  text-decoration: none;
  img {
    width: 100px;
    height: 100px;
  }
  &:hover {
    color: #000;
  }
}
</style>
