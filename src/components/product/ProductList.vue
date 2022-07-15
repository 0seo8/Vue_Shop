<template>
  <section class="container">
    <h2>
      {{ category }}
    </h2>
    <div
      class="product__list"
      :class="main">
      <div
        v-for="product in products.filter((product) =>
          product.tags.includes(category)
        )"
        :key="product.id"
        class="card">
        <ProductItem :product="product" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProductItem from './ProductItem.vue'

export default {
  components: { ProductItem },
  props: {
    category: {
      type: String,
      required: true
    },
    main: {
      type: String,
      default: ''
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
  }
}
</script>

<style lang="scss" scoped>
section {
  overflow: hidden;
  h2 {
    font-size: 22px;
    line-height: 25px;
    text-align: center;
    font-weight: 700;
    color: var(--color-text-title);
  }

  .main {
    height: 380px;
  }
  .product {
    &__list {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      margin-top: 30px;
      grid-gap: 20px;
      overflow: hidden;
      .card {
        box-sizing: border-box;
        border: 2px solid var(--color-sub-primary);
        transition: 0.3s ease box-shadow;
        background-color: var(--color-card-primary);
        padding: 12px;
        &:hover {
          box-shadow: 0px 0px 10px 2px var(--color-shawdow-300);
        }
      }
    }
  }
}
</style>
