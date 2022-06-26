<template>
  <div class="section">
    <h2>{{ category }}</h2>
    <div class="product__list">
      <div
        v-for="product in products.filter(product => product.tags === category)"
        :key="product.id">
        <ProductItem :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import ProductItem from './ProductItem.vue'

export default {
  components: { ProductItem },
  props: {
      category: {
          type: String,
          required: true
      }
  },
  computed: {
      ...mapState('product', ['products'])
  },
  mounted() {
      this.readAllProducts()
  },
  methods: {
      ...mapActions('product', ['readAllProducts'])
  },
}
</script>

<style lang="scss" scoped>
  .section {
    margin-top: 40px;
    padding: 48px 8px 32px;
    h2 {
      font-size: 22px;
      line-height: 25px;
     text-align: center;
  }
  .product{
  &__list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    margin-top: 50px;
    grid-gap: 20px;
  }
 }
}
</style>
