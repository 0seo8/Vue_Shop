<template lang="">
  <section class="product-section">
    <div class="container-product">
      <div class="content-header">
        <h2>제품 목록</h2>
        <AdminButton />
      </div>
      <div class="card mb-4">
        <div class="card-body">
          <div class="table-responisve">
            <table class="table table-hover">
              <thead>
                <tr class="head-proudct text-left">
                  <th :style="`min-width: 30px;`">
                    index
                  </th>
                  <th
                    v-for="info in productInfo"
                    :key="info">
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
    </div>
  </section>
</template>
<script>
import AdminButton from '../../components/AdminButton.vue'
export default {
  components: {
    AdminButton
  },
  computed: {
    products() {
      console.log(this.$store.state.admin.productList)
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
  section {
    padding: 30px 3%;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
    .content-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    table tbody {
      font-size: 0.7rem;
    }
  }
</style>
