<template>
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

<style scoped>
section {
  padding-top: 2rem;
}
</style>
