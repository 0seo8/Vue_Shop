<template>
  <RouterLink
    :to="`/${product.id}`"
    :prodcut="product">
    <BaseCard>
      <img
        :src="product.thumbnail"
        alt="thumbnail" />
      <div>{{ product.title }}</div>
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
