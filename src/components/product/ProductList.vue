<template>
  <section class="container">
    <h2>{{ category }}</h2>
    <div class="product__list">
      <div
        v-for="product in products.filter(product => product.tags === category)"
        :key="product.id">
        <ProductItem :product="product" />
      </div>
    </div>
  </section>
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
  section {
    margin: 40px auto 0;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 24px;
    padding-bottom: 16px;
    h2 {
      font-size: 22px;
      line-height: 25px;
      text-align: center;
      font-weight: 700;
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

@media (min-width: 1025px) {
  .section {
    padding-top: 48px;
    padding-bottom: 32px;
  }
}
</style>
