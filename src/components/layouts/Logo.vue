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
    <span>Eletronic</span>Market
  </RouterLink>
</template>

<style lang="scss" scoped>
.logo {
  align-items: center;
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  color: $black;
  display: flex;
  &__img {
    width: 100%;
  }
  span {
    color: $primary;
  }
}
</style>
