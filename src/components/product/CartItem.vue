<template>
  <div class="product">
    <RouterLink to="`/product/${product.productId}`">
      <figure>
        <img
          :src="product.thumbnail"
          alt="상품 이미지">
      </figure>
    </RouterLink>
      
    <div class="card-body">
      <h2 class="card-title">
        <RouterLink to="`/product/${product.productId}`">
          {{ product.title }}
        </RouterLink>
      </h2>
      <p class="card-price">
        {{ product.price.toLocaleString('ko-KR') }} 원
      </p>
      <div class="card-actions">
        <div class="btn-group">
          <button
            class="btn btn-primary"
            @click="count--">
            -
          </button>
          <button class="btn btn-ghost no-animation">
            {{ count }}
          </button>
          <button
            class="btn btn-primary"
            @click="count++">
            +
          </button>
        </div>
      </div>
      <div class="totalPrice">
        {{ totalPrice.toLocaleString('ko-KR') }} 원
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  emits: ['total'],
  data() {
    return {
      count: 1,
      totalPrice: this.product.price
    }
  },
  watch: {
    count(value){
      this.totalPrice += value * this.product.price
      // let itemPrice = value * this.product.price
      // this.$emit('total', (itemPrice, this.product.productId))
    }
  },
}
</script>

<style lang="scss" scoped>
  .product {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    padding: 1rem 2rem;
    background-color: var(--color-cartList-box);
    border-radius: 1rem;
    figure {
      width: 14rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      overflow: hidden;
      background: #fff;
      flex-shrink: 0;
      border-radius: 1rem;
      min-width: 100%;
      img {
        object-fit: contain;
        width: 100%;
        height: 12rem;
        display: block;
      }
    }
    .card{
      &-body {
      padding-left: 3rem;
      padding-right: 3rem;
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      gap: 1rem; 
      }
      &-title{
       display: flex;
       align-items: center;
       gap: 0.5rem;
       font-size: 1.25rem;
       line-height: 1.75rem;
       font-weight: 600;
      }
      &-price {
        flex-grow: 1;
        font-size: 1.5rem;
        line-height: 2.25rem;
      }
      &-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 0.5rem;
      }
      
    } 
  }
  .price-box {
    align-items: center;
    align-self: flex-start;
    flex-shrink: 0;
    display: flex;
    margin-bottom: 5rem;
    margin-top: 2.5rem;
    .text {
      font-size: 1.5rem;
      line-height: 2rem;
    }
    .modal-button {
      margin-left: 1.25rem;
    }
  }
</style>
