<template>
  <div class="breadcrumbs container">
    <ul>
      <li>홈 > </li>
      <li> {{ selectedProduct.title }}</li>
    </ul>
  </div>
  <section class="container detail-products">
    <div class="product__box">
      <figure>
        <img
          v-if="selectedProduct.thumbnail"
          :src="selectedProduct.thumbnail"
          :alt="`${selectedProduct.title} 이미지`">  
        <img
          v-else
          src="../../assets/no-Img"
          alt="이미지 준비중">
        <div
          v-if="selectedProduct.isSoldOut"
          class="sold-out-box">
          <span>SOLD OUT</span>
        </div> 
      </figure>

      <div class="product__info">
        <div class="tags">
          <span
            v-for="(tag, index) in tags"
            :key="index"
            class="tags__item">
            # {{ tag }}
          </span>
        </div>

        <h3>{{ selectedProduct.title }}</h3>


        <p class="price">
          ₩ {{ selectedPrice }}
        </p>

        <p class="desc">
          {{ selectedProduct.description }}
        </p>

        <div class="coupon">
          <p>10만원 이상 주문 시 무료 배송!</p>
          <p>20만원 이상 주문 시 10% 할인 쿠폰 증정!</p>            
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
          :disabled="selectedProduct.isSoldOut"
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
    ...mapState('product',['selectedProduct', 'selectedPrice']),
    productId() {
      return this.$route.params.id
    },
    tags() {
      return this.selectedProduct.tags
    }
  },
  mounted() {
    this.readProductDetail(this.productId)
  },
  methods: {
    ... mapActions('product', ['readProductDetail']),
    PurchaseThis() {
      this.$router.push('/purchase')
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/main.scss';
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

.detail-products {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; 
  margin-top: 2rem;
}
.product{
  &__box {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
    flex-flow: wrap;
    gap: 3rem;
    figure {
      position: relative;
      flex-shrink: 0;
      max-width: 600px;
      min-width: 300px;
      border-radius: 10px;
      overflow: hidden;
      background-color: var(--color-background-bg);
      padding: 10px;
      text-align: center;
      flex-grow: 1;
      img {
        width: 300px;
      }
      .sold-out-box {
        position: absolute;
        font-family: 'Permanent Marker', cursive;
        font-size: 60px;
        width: 300px;
        height: 300px;
        top: 0;
        left: 50%;
        color: var(--color-red-200);
        text-shadow: 0 0 var(--color-text-base);
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translate(-50%);
        transform: translate(-50%) rotate(-15deg);
      }
    }
  }
  &__info {
    padding: 30px;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    max-width: 600px;
    flex-grow: 1;

    .tags {
      display: flex;
      margin-bottom: 1rem;
      &__item {
          display: inline-block;
          padding: 4px 5px;
          border: 1px solid var(--color-shawdow-400);
          font-size: 12px;
          line-height: 1.2;
          margin-right: 8px;
      }
    }

    h3 {
      margin-bottom: 1rem;
    }

    p {
      margin-bottom: 8px;
      &.desc {
        line-height: 1.7;
        margin-bottom: 1rem;
      }
     &.price {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 1rem;
     }
    }
    .coupon {
      margin-bottom: 1rem;
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
      color: var(--color-white);
    }
  }
}

.breadcrumbs {
  padding-top: 2rem;
  margin-bottom: 1rem;
  ul {
    display: flex;
    li:not(:first-child) {
      padding-left: .5rem;
    }
  }
}
</style>



