<template>
  <section>
    <div class="product__box">
      <figure>
        <img
          v-if="seletedProduct.thumbnail"
          :src="seletedProduct.thumbnail"
          :alt="`${seletedProduct.title} 이미지`" />  
        <img
          v-else
          src="../../assets/no-Img"
          alt="이미지 준비중" />
      </figure>

      <div class="product__info">
        <div class="title">
          <img
            v-if="seletedProduct.isSoldOut"
            class="soldout"
            src="../../assets/solidout.svg" />
          <h3>{{ seletedProduct.title }}</h3>
        </div>
        <p class="desc">
          {{ seletedProduct.description }}
        </p>
        <p class="price">
          ₩ {{ seletedProductPrice }}
        </p>

        <div class="coupon">
          <p>5만원 이상 주문 시 무료 배송!</p>
          <p>10만원 이상 주문 시 10% 할인 쿠폰 증정!</p>            
        </div>

        <div class="shipping">
          <span class="material-symbols-outlined">
            local_shipping
          </span>
          <p>당일 출고!</p>
        </div>

        <p>
          <strong class="strong">13:00시</strong> 이내 주문 완료 시, 오늘 출고됩니다.
        </p>

        <button
          :id="productId"
          :disabled="seletedProduct.isSoldOut"
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
  computed: {
    ...mapState('product',['seletedProduct', 'seletedProductPrice']),
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
@import '~/scss/main.scss';

section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; 
}
.product{
  &__box {
    padding-top: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    figure {
      position: relative;
      flex-shrink: 0;
      max-width: 600px;
      min-width: 300px;
      border-radius: 10px;
      overflow: hidden;
      background-color: #fff;
      padding: 10px;
      text-align: center;
      img {
        width: 70%;
        height: 70%;
      }
    }
  }
  &__info {
    padding: 30px;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    max-width: 700px;
    .title {
      position: relative;
      .soldout {
        position:absolute;
        z-index:1;
        left: -2rem;
        top: -2rem;
        max-width: 60px;
       
      }
      h3 {
        margin-bottom: 1rem;
      }
    }
    p {
      margin-bottom: 1rem;
      &.desc {
        line-height: 1.7;
      }
     &.price {
      font-size: 22px;
      font-weight: bold;
     }
    }
    .shipping {
      display: flex;
    }
    strong {
      font-weight: 600;
    }
    .btn {
      width: 30%;
      padding: .5rem;
      color: #fff;
    }
  }
}
</style>



