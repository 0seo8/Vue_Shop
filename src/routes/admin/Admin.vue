<template lang="">
  <div>
    <h1>관리자 페이지</h1>
    <h2>상품 목록</h2>
    <div class="container-product">
      <RouterLink to="/admin/add-product">
        <button>
          제품 추가하기
        </button>
      </RouterLink>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr class="head-proudct">
              <th :style="`min-width: 30px;`"></th>
              <th
                v-for="info in productInfo"
                :key="info.id">
                {{ info }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(product, index) in products"
              :key="product.id">
              <td>
                {{ index }}
              </td>
              <td
                v-for="info in productInfo"
                :key="product[info]">
                {{ product[info] }}
              </td>
            </tr>
          </tbody>
        </table>
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
      if(this.products.length === 0) {
        return []
      }
      return Object.keys(this.products[0])
    }
  },
  created() {
  this.$store.dispatch('admin/readProducts')
  console.log(this.$store.state.admin.productList)
  },
}
</script>
<style lang="scss" scoped>
  h1 {
    text-align: center;
  }
  h2 {
    text-align: center;
  }
  button {
    margin: 10px auto;
    width: 110px;
  }
</style>
