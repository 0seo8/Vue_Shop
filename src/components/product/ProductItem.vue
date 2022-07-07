<template>
  <RouterLink
    :to="`/product/${product.id}`"
    :prodcut="product">
    <figure>
      <div
        v-if="product.isSoldOut"
        class="soldout">
        <span>상품매진</span>
      </div>
      <img
        :src="product.thumbnail"
        alt="thumbnail" />
    </figure>
    <div class="card-body">
      <p class="title">
        {{ product.title }}
      </p>
      <p>₩ {{ product.price.toLocaleString("ko-KR") }}</p>
    </div>
  </RouterLink>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  figure {
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: 200px;
    background-color: #fff;
    position: relative;
    .soldout {
      span {
        z-index: 1;
        top: 10px;
        left: 10px;
        position: absolute;
        color: red;
        border: 1px solid;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &+ img {
      filter: grayscale(80%);
    }
      }
    img {
      height: auto;
      max-width: 100%;
      max-height: 100%;
      transition-duration: .3s;
      transition-property: transform;
      transition-timing-function: cubic-bezier(.4,0,.2,1);
    }
  }

.card-body {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 0.5rem;
  .title {
    font-size: 15px;
    display: inline-block;
    width: 100%;
    color: #111;
    font-weight: 600;
  }
}
</style>
