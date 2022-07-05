<template>
  <section>
    <div class="product__box">
      <figure>
        <div
          v-if="seletedProduct.isSoldOut"
          class="soldout">
          <svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 512 512"><title>sold-sign-flat</title><path
              d="M0,256C0,114.61,114.61,0,256,0S512,114.63,512,256,397.38,512,256,512,0,397.39,0,256Z"
              fill="#f2555a" /><path
                d="M382.76,341.79,363.59,219.18c-.64-4.1-4-7-7.49-6.44l-11.82,1.86L241.74,146.8a15.25,15.25,0,0,0,.43-6.66A15.47,15.47,0,1,0,214.5,151.8l-67.31,93.63-12.8,2c-3.5.56-5.8,4.31-5.16,8.42l19.17,122.61c.64,4.09,4,7,7.49,6.43L377.59,350.2C381.09,349.65,383.42,345.88,382.76,341.79ZM222,157.21a15.36,15.36,0,0,0,14.59-2.68l94,62.19L160.07,243.42ZM193.71,332.38c-2.74,3.62-7.26,5.91-13.56,6.89a38.87,38.87,0,0,1-5.69.48,71.21,71.21,0,0,1-8.77-.69l-1.17-7.63a52.91,52.91,0,0,0,10.15,2.14,28.18,28.18,0,0,0,5.72-.24,10.47,10.47,0,0,0,7-3.71,8.16,8.16,0,0,0,1.78-6.52,9.19,9.19,0,0,0-2.19-4.73c-1.2-1.35-3.88-2.79-8-4.36l-4.09-1.58c-5.46-2.06-9.22-4.13-11.32-6.22a13.1,13.1,0,0,1-3.77-7.4,14,14,0,0,1,.91-7.56,14.86,14.86,0,0,1,4.69-6.14,18,18,0,0,1,8.38-3.25,47,47,0,0,1,13.64,0l1.1,7a74.21,74.21,0,0,0-8.81-1.58,22.1,22.1,0,0,0-4.61.21c-3.15.49-5.36,1.67-6.62,3.55a7.41,7.41,0,0,0-1.48,5.37,7,7,0,0,0,1.61,3.41,10.34,10.34,0,0,0,3.38,2.67,55.76,55.76,0,0,0,5.46,2.33l4.26,1.6c5.49,2.08,9.3,4.17,11.35,6.28a14.06,14.06,0,0,1,3.82,7.86A14.88,14.88,0,0,1,193.71,332.38Zm58.63-18.54a23.12,23.12,0,0,1-7.15,11.6,25.37,25.37,0,0,1-13.13,5.78,25.78,25.78,0,0,1-14-1.37,23.18,23.18,0,0,1-10.41-8.7,35,35,0,0,1-5.46-14.5,35.69,35.69,0,0,1,.72-15.16,22.8,22.8,0,0,1,7.23-11.59,27.74,27.74,0,0,1,27.16-4.22,22.93,22.93,0,0,1,10.41,8.85,38.06,38.06,0,0,1,4.6,29.32ZM268,324.23l-8.43-54.3,7.7-1.19,7.53,48.54,24.1-3.74.9,5.76Zm80.44-27.06a24.06,24.06,0,0,1-6.91,11.66q-5.14,4.78-15.31,6.36L308.1,318l-8.45-54.32,18-2.8q10.46-1.62,16.31.58a21.66,21.66,0,0,1,9.83,7.52,30.3,30.3,0,0,1,5.24,13.53A35.61,35.61,0,0,1,348.48,297.16Z"
                fill="#fff" /><path
                  d="M237.72,284q-5.48-5.35-13.62-4.09t-11.73,8c-2.4,4.52-3,10.28-2,17.31s3.45,12.36,7.08,16,8.2,5,13.68,4.15,9.41-3.55,11.76-8.1,3-10.34,1.9-17.39S241.37,287.62,237.72,284Z"
                  fill="#fff" /><path
                    d="M337.52,274.38a16.22,16.22,0,0,0-7.21-6.62q-4.61-2.2-15.69-.48l-6.35,1,6.65,42.78,9.83-1.53q7.69-1.19,11.14-4.21a16.13,16.13,0,0,0,4.79-8.65,31.29,31.29,0,0,0,.32-12.13A28.44,28.44,0,0,0,337.52,274.38Z"
                    fill="#fff" /></svg>
        </div>
        <img
          v-if="seletedProduct.thumbnail"
          :src="seletedProduct.thumbnail"
          :alt="`${seletedProduct.title} 이미지`" />  
        <img
          v-else
          src="/assets/no-Img"
          alt="이미지 준비중" />
      </figure>

      <div class="product__info">
        <h2>{{ seletedProduct.title }}</h2>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="12px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000">
            <path
              d="M0 0h24v24H0V0z"
              fill="none" />
            <path
              d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
          </svg>
          <p>당일 출고!</p>
        </div>

        <p class="kacbae">
          <strong class="strong">13:00시</strong> 이내 주문 완료 시, 오늘 출고됩니다.
        </p>

        <button
          v-if="seletedProduct.isSoldOut"
          type="button"
          disabled
          class="btn btn-primary">
          상품매진
        </button>

        <button
          v-else
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
@import '~/scss/variables.scss';
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
        width: 600px;
        min-width: 300px;
        border-radius: 10px;
        overflow: hidden;
        background-color: #fff;
        padding: 10px;
        text-align: center;
        .soldout {
          position: absolute;
          width: 100px;
          &+img {
             filter: grayscale(80%);
          }
        }
        img {
          width: 60%;
          height: 60%;
        }

      }
    }
    &__info {
      padding: 30px;
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      max-width: 700px;
      h2 {
        margin-bottom: 1rem;
      }
      p.desc {
        line-height: 1.7;
      }
      p.price {
        font-size: 22px;
        font-weight: bold;
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



