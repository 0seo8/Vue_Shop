<template>
  <section>
    <div class="product__img">
      <div v-if="seletedProduct.thumbnail">
        <img
          :src="seletedProduct.thumbnail" />  
      </div>
      <p v-else>
        상품이미지 준비중입니다
      </p>
    </div>
    <div class="product__info">
      <div class="product__info__title">
        <h2>{{ seletedProduct.title }}</h2>
        <div>#{{ seletedProduct.tags }}</div>
      </div>
      <div class="info__price">
        ₩ {{ seletedProduct.price }}
      </div>
      <div class="info__des">
        {{ seletedProduct.description }}
      </div>
      <BaseButton
        :id="productId"
        @click="PurchaseThis">
        구매하기
      </BaseButton>
    </div>
  </section>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  data() {
    return {
      IsProductCard: false,
      addCart: false,
    }
  },
  computed: {
    ...mapState('product',['seletedProduct']),
    productId() {
      return this.$route.params.id
    },
  },
  mounted() {
    this.readProductDetail(this.productId)
  },
  methods: {
    ... mapActions('product', ['readProductDetail']),
    Purchase() {

    }
  },
}
</script>

<style lang="scss">
  section {
    display: flex;
    gap: 1rem;
  }
</style>
