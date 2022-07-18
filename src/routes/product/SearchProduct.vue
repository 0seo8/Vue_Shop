<template>
  <section class="container">
    <h2>
      찾으시는 상품의 목록은 아래와 같습니다😊
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
import { mapState} from 'vuex'
import ProductItem from '~/components/product/ProductItem.vue'
export default {
  components: {
    ProductItem
  },
  computed: {
    ...mapState('product', ['searchProductList']),
  },
}
</script>


<style lang="scss" scoped>
  section {
    padding-top: 80px;
    h2 {
      font-size: 22px;
      line-height: 25px;
      text-align: center;
      font-weight: 700;
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
