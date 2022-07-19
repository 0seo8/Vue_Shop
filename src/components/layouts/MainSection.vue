<template>
  <Swiper />
  <section class="category__box">
    <ProductList
      category="생활가전"
      class="main" />
  </section>
  <section class="category__box">
    <ProductList
      category="계절가전"
      class="main" />
  </section>
  <section class="category__box">
    <ProductList
      category="디지털"
      class="main" />
  </section>
</template>

<script>
import Swiper from '~/components/layouts/Swiper.vue'
import ProductList from '~/components/product/ProductList.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    Swiper,
    ProductList,
  },
  mounted() {
    this.readAllProducts()
  },
  methods: {
   ...mapActions('product', ['readAllProducts'])
  }
  
}
</script>

<style lang="scss" scoped>
.category__box {
  margin-top: 5rem;
}

@media screen and (max-width: 380px) {
  .category__box {
    margin-top: 2rem;
  }
}

</style>
