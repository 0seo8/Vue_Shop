<template>
  <Swiper />
  <section class="category__box">
    <ProductList category="생활가전" />
  </section>
  <section class="category__box">
    <ProductList category="계절가전" />
  </section>
  <section class="category__box">
    <ProductList category="디지털" />
  </section>
</template>

<script>
import Swiper from '~/components/layouts/Swiper.vue'
import ProductList from '~/components/product/ProductList.vue'

export default {
  components: {
    Swiper,
    ProductList,
  },
}
</script>

<style lang="scss" scoped>
.category__box {
  margin-top: 40px;
}
</style>
