<template>
  <section class="container">
    <h2>{{ category }}</h2>
    <div class="product__list">
      <div
        v-for="product in products.filter(product => product.tags.includes(category))"
        :key="product.id"
        class="card">
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
    .card {
      transition: 0.3s ease box-shadow;
      background-color: rgba(#FFB1C1, .5);
      &:hover {
        box-shadow: 0px 0px 10px 2px rgb(0 0 0 / 26%);
      }
    }
  }
 }
}

</style>
