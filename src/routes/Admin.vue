<template lang="">
  <div>
    <h1>관리자 페이지</h1>
    <div>상품 목록</div>
    <div>
      <RouterLink to="add-product">
        <button>
          제품 추가하기
        </button>
      </RouterLink>
      <div
        v-for="product in products"
        :key="product.id"
        class="product-list">
        <div>{{ product }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    products() {
      return this.$store.state.admin.productList
    },
    productInfo() {
      if(this.product.length === 0) {
        return []
      }
      return Object.keys(this.products[0])
    }
  },
  created() {
  this.$store.dispatch('admin/readProducts')
  },
}
</script>
<style lang="scss" scoped>
  
</style>
