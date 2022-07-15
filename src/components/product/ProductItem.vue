<template>
  <RouterLink
    :to="`/product/${product.id}`"
    :prodcut="product">
    <figure>
      <div
        v-if="product.isSoldOut"
        class="sold-out-box">
        <span>SOLD OUT</span>
      </div>
      <img
        :class="product.isSoldOut ? 'soldout' : ''"
        :src="product.thumbnail"
        alt="thumbnail">
    </figure>
    <div class="card-body">
      <div class="tags">
        <span
          v-for="(tag, index) in product.tags"
          :key="index"
          class="tags__item badge rounded-pill">
          # {{ tag }}
        </span>
      </div>
      <p class="title">
        {{ product.title }}
      </p>
      <p class="price">
        ₩ {{ product.price.toLocaleString("ko-KR") }}
      </p>
    </div>
  </RouterLink>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");

figure {
  border-radius: 4px;
  margin: 0;
  padding: 1rem 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 210px;
  background-color: var(--color-background-bg);
  position: relative;
  .sold-out-box {
    position: absolute;
    font-family: "Permanent Marker", cursive;
    font-size: 40px;
    width: 100px;
    height: 200px;
    top: 0;
    left: 50%;
    color: #d22828;
    text-shadow: 0 0 var(--color-text-base);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-50%);
    transform: translate(-50%) rotate(-15deg);
    z-index: 3;
  }

  img {
    height: auto;
    max-width: 100%;
    max-height: 100%;
    transition-duration: 0.3s;
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    &.soldout {
      filter: grayscale(90%);
    }
  }
}

.card-body {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 1rem 0.5rem;
  .tags {
    .badge {
      padding: 2px 6px;
    }
  }
  .title {
    font-size: 10px;
    display: inline-block;
    width: 100%;
    color: var(--color-gray-600);
    font-weight: 400px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid var(--color-shawdow-200);
  }
  .price {
    font-weight: bold;
    line-height: 20px;
    letter-spacing: 0;
    font-size: 14px;
    color: var(--color-text-base);
  }
  .tags {
    position: absolute;
    top: -1.5rem;
    left: 0.5rem;
    font-size: 12px;
    white-space: nowrap;

    &__item {
      display: inline-block;
      padding: 2px;
      border: 1px solid var( --color-gray-400);
      line-height: 1.2;
      margin-right: 4px;
      border-radius: 1px;
      background: rgba(var(--color-text-base), 0.04);
      line-height: 1.4;
      letter-spacing: -0.8px;
      color: var(--color-gray-800);
    }
  }
}
</style>
