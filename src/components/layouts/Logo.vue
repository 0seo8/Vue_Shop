<template>
  <RouterLink
    to="/"
    class="logo">
    <div class="logo__box">
      <img
        class="logo__img"
        src="/public/assests/logo.png"
        alt="로고" />
    </div>
    <h1><span>Eletronic</span>Market</h1>
  </RouterLink>
</template>

<style lang="scss" scoped>
.logo {
  align-items: center;
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  // color: $black;
  display: flex;
  flex-shrink: 0;
  &__img {
    width: 100%;
  }
  span {
    // color: $primary;
  }
}
</style>
