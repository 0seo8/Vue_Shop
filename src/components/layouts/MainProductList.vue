<template>
  <div>
    <h2>생활가전</h2>
    <ul>
      <ProductItem
        v-for="product in products.filter(product => product.tags === '생활가전')"
        :key="product.id" 
        :product="product" />
    </ul>
  </div>
  <div>
    <h2>계절가전</h2>
    <ul>
      <ProductItem
        v-for="product in products.filter(product => product.tags === '계절가전')"
        :key="product.id" 
        :product="product" />
    </ul>
  </div>
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
