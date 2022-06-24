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
    PurchaseThis() {
      //1. 로그인 검증
       //로그인이 되지 않은 경우 => alret창(로그인이 필요한 서비스입니다. 로그인 하시겠습니까?) => 로그인 페이지

      //로그인이 된 경우payment페이지
      this.$router.push('/purchase')
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
