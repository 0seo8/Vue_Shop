<template>
  <div><h1>상품 목록</h1></div>
  <ul>
    <ProductItem
      v-for="product in products"
      :key="product.id" 
      :product="product" />
  </ul>
</template>

<script>
import ProductItem from '~/components/product/ProductItem.vue'
import {mapState, mapActions} from 'vuex'

export default {
  components: {
    ProductItem
  },
  computed: {
    ...mapState('product',['products'])
  },
  mounted() {
    this.readAllProducts()
  },
  methods: {
    ... mapActions('product', ['readAllProducts'])
  },
}
</script>
