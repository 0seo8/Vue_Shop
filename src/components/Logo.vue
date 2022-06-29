<template lang="">
  <RouterLink
    to="/"
    class="logo">
    <img
      src="../assets/Logo.png"
      alt="Electron Mart" />
  </RouterLink>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.logo {
  font-family: "Kdam Thmor Pro", sans-serif;
  font-size: 30px;
  color: $black;
  text-decoration: none;
  img {
    width: 100px;
    height: 100px;
  }
  &:hover {
    color: $black;
  }
}
</style>
