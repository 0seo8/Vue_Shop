<template>
  <RouterLink
    :to="`/${product.id}`"
    :prodcut="product">
    <figure>
      <img
        :src="product.thumbnail"
        alt="thumbnail" />
    </figure>
    <div
      class="card-body">
      <p>
        {{ product.title }}
      </p>
      <p>
        ₩ {{ product.price }}
      </p>
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
    padding: 2rem;
    line-height: 1.5;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
