<template>
  <Swiper />
  <ProductList category="생활가전" />
  <ProductList category="계절가전" />
</template>

<script>
import Swiper from '~/components/layouts/Swiper.vue'
import ProductList from '~/components/product/ProductList.vue'

export default {
  components: {
    Swiper,
    ProductList
  },
}
</script>

<style lang="scss" scoped>

</style>

