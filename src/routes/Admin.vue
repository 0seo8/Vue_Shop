<template lang="">
  <div>
    <h1>관리자 페이지</h1>
    <div>상품 목록</div>
    <div>
      <ul
        v-for="product in products"
        :key="product.id">
        <li>{{ product }}</li>
      </ul>
    </div>
    <div>
      <RouterLink to="add-product">
        <button @click="readProducts()">
          제품 추가하기
        </button>
      </RouterLink>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    products() {
      return this.$store.state.admin.productList
    }
  },
  created(){
  this.$store.dispatch('admin/readProducts')
  },
  methods: {
    async readProducts() {
      const res = await this.$fetch('/products', {
        headers: {masterKey: true},
        method: 'GET'
      })
      console.log(res)
      return res
    }
  }
}
</script>
<style lang="scss" scoped>
  
</style>
