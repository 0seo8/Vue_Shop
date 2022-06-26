<template>
  <RouterLink
    :to="`/${product.id}`"
    :prodcut="product">
    <BaseCard>
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
    </BaseCard>
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
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: 200px;
    img {
      height: auto;
      max-width: 50%;
      max-height: 50%;
      transition-duration: .3s;
      transition-property: transform;
      transition-timing-function: cubic-bezier(.4,0,.2,1);
    }
  }
  .card-body {
    padding: 10px;
    line-height: 1.5;
  }
</style>
