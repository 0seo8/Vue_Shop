<template>
  <header>
    <RouterLink
      to="/"
      class="logo">
      <img
        src="~/assets/logo.png"
        alt="로고" />
      <span>Eletronic</span>Market
    </RouterLink>
  </header>
</template>

<style lang="scss" scoped>
.logo {
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  color: $black;
  span {
    color: $primary;
  }
}
</style>
