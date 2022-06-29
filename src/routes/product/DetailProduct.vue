<template>
  <section>
    <div class="product__box">
      <figure>
        <img
          v-if="seletedProduct.thumbnail"
          :src="seletedProduct.thumbnail"
          alt="`${seletedProduct.title}`이미지" />  
        <img
          v-else
          src="/assets/no-Img"
          alt="이미지 준비중" />  
      </figure>

      <div class="product__info">
        <h2>{{ seletedProduct.title }}</h2>
        <p>{{ seletedProduct.description }}</p>
        <div>
        </div>
        <p>₩ {{ seletedProduct.price }}</p>

        <div class="coupon">
          <p>10만원 이상 주문 시 무료 배송!</p>
          <p>30만원 이상 주문 시 10% 할인 쿠폰 증정!</p>            
        </div>

        <div class="shipping">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000">
            <path
              d="M0 0h24v24H0V0z"
              fill="none" />
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
          </svg>
          <p>당일 출고!</p>
        </div>

        <p class="kacbae">
          <strong class="strong">13:00시</strong> 이내 주문 완료 시, 오늘 출고됩니다.
        </p>

        <button
          :id="productId"
          type="button"
          class="btn btn-primary"
          @click="PurchaseThis">
          구매하기
        </button>
      </div>
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

<style lang="scss" scoped>
  section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px auto;
    height: 100%; 
  }
  .product{
    &__box {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid red;
      figure {
        flex-shrink: 0;
        min-width: 300px;
        border-radius: 10px;
        overflow: hidden;
        background-color: #fff;
        padding: 10px;
      }
    }
    &__info {
      padding: auto 30px;
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
    }
  }
</style>



