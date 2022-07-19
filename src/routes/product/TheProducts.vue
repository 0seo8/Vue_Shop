<template>
  <section class="breadcrumbs container">
    <ul>
      <li @click="$router.push('/')">
        홈 >
      </li>
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
