<template>
  <h2>{{ category }}</h2>
  <div class="product__list">
    <div
      v-for="product in products.filter(product => product.tags === category)"
      :key="product.id"
      class="list__item">
      <RouterLink
        :to="`/${product.id}`"
        :prodcut="product">
        <img
          :src="product.thumbnail"
          alt="thumbnail" />
        <div>{{ product.title }}</div>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  props: {
    category: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('product',['products'])
  },
  mounted() {
    this.readAllProducts()
  },
  methods: {
    ... mapActions('product', ['readAllProducts'])
  },
}
</script>

<style lang="scss" scoped>
  .product__list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    margin-top: 50px;
    grid-gap: 20px;
  }

.list__item {
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  transition: 0.3s ease box-shadow;
  box-shadow: 0px 0px 10px 2px #00000042;    
  &:hover {
    box-shadow: 0px 0px 20px 3px #00000042;    
  }
}
</style>
