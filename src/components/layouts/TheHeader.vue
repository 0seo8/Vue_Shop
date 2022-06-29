<template>
  <header>
    <div class="header">
      <RouterLink
        to="/"
        class="logo">
        <h1><span>Eletronic</span>Market</h1>
      </RouterLink>
      <ul class="nav nav-pills">
        <li
          v-for="nav in navigations"
          :key="nav.name"
          class="nav-item">
          <RouterLink     
            :to="nav.path"
            active-class="active"
            class="nav-link">
            <span>{{ nav.name }}</span>
          </RouterLink>
        </li>
      </ul>
      <div class="nav--right">
        <span class="material-symbols-outlined">
          light_mode
        </span>
        <input
          class="form-control"
          placeholder="검색" />
        <span
          class="material-symbols-outlined"
          @click="GoToCart">
          shopping_bag
        </span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
    data() {
    return {
      navigations: [
        {path: '/HomeAP', name:'생활가전'},
        {path: '/SeasonAP', name:'계절가전 '},
      ]
    }
  },
  methods: {
    GoToCart () {
      this.$router.push('/cart')
    }
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
  .logo {
    align-items: center;
    font-family: "Oswald", sans-serif;
    display: flex;
    flex-shrink: 0;
    h1 {
      font-size: 20px;
  }
 }
}
  .nav {
    flex-grow: 1;
    flex-wrap: nowrap;
    &-item {
      flex-shrink: 0;
    }
  }
  .nav--right {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    input {
      margin: 0 10px;
    }
    .material-symbols-outlined {
      // color: $primary;
      display: block;
      &:hover {
        cursor: pointer;
      }
    }
  }

</style>

