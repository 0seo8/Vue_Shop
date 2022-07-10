<template>
  <section class="breadcrumbs container">
    <ul>
      <li>홈 > </li>
      <li> {{ $route.params.category }}</li>
    </ul>
  </section>
  <section>
    <ProductList :category="$route.params.category" />
  </section>
</template>

<script>
import ProductList from '~/components/product/ProductList.vue'
export default {
  components: {
    ProductList
  }
}
</script>

<style scoped lang="scss">
section {
  padding-top: 2rem;
}
.breadcrumbs {
  margin-bottom: 1rem;
  ul {
    display: flex;
    li:not(:first-child) {
      padding-left: .5rem;
    }
  }
}
</style>
