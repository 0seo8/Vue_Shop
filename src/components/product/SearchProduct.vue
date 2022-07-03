<template>
  <section class="container">
    <h2>
      "{{ $route.params.searchText }}"에 대한 검색 결과입니다.
    </h2>
    <div class="product__list">
      <div
        v-for="product in searchProductList"
        :key="product.id"
        class="card">
        <ProductItem
          :product="product" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProductItem from '~/components/product/ProductItem.vue'
export default {
  components: {
    ProductItem
  },
  computed: {
    ...mapState('product', ['searchProductList']),
  },
  created() {
    this.searchProducts(this.$route.params)
  },
  methods : {
    ...mapActions('product', ['searchProducts'])
  }
}
</script>


<style lang="scss" scoped>
  section {
    padding-top: calc(80px + 3rem);
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
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
