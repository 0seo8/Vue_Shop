<template>
  <div class="header">
    <h1>
      <RouterLink
        to="/">
        Eletronic Market
      </RouterLink>
    </h1>
    <ul class="nav nav-pills category__list">
      <li
        v-for="nav in navigations"
        :key="nav.name"
        class="cotegory__item">
        <RouterLink     
          :to="{
            name: 'product',
            params: {category: nav.name}
          }"
          class="nav-link">
          <span>{{ nav.name }}</span>
        </RouterLink>
      </li>
    </ul>
    <div class="button__list">
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
</template>

<script>
export default {
    data() {
    return {
      navigations: [
        { name:'생활가전'},
        { name:'계절가전'},
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
@import "~/scss/main";

.header {
  position: fixed;
  z-index: 10;  
  width: 100%;
  height: 80px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px $nav-padding;
  min-height: 48px;
  background-color: #fff;
  box-shadow:  0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
    a {
      font-weight: 700;
      font-size: 20px;
      white-space: nowrap;
      text-decoration: none;      
    }
   }
  }

  .category {
    &__list {
      flex-grow: 1;
      flex-wrap: nowrap;
      margin-left: 8px;
      white-space: nowrap;
    }
    &__item {
      height: 32px;
      padding: 0 12px;
      display: inline-flex;
      flex-shrink: 0;
      cursor: pointer;
      flex-wrap: wrap;
    }
  }

  .button__list {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 0 8px;
    input {
      margin: auto 16px;
    }
    .material-symbols-outlined {
      color: $primary;
      font-size: 40px;
      display: block;
      &:hover {
        cursor: pointer;
      }
    }
  }

</style>

