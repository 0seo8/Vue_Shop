<template>
  <RouterLink
    :to="`/${product.id}`"
    :prodcut="product">
    <img
      :src="product.thumbnail"
      alt="thumbnail" />
    <div>{{ product.title }}</div>
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
