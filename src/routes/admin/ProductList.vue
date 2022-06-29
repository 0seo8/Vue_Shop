<template lang="">
  <section class="product-section">
    <div class="container-product">
      <div class="content-header">
        <h2>제품 목록</h2>
        <AdminButton />
      </div>
      <div class="card mb-4">
        <div class="card-body">
          <article class="itemlist">
            <div class="row align-items-center">
              <div class="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                <a href="#">
                  <div class="left">
                    <img
                      src=""
                      alt="" />
                  </div>
                  <div class="info">
                    <h6>{{ products }}</h6>
                  </div>
                </a>
              </div>
              <div class="col-lg-2 col-sm-2 col-4 col-price"></div>
              <div class="col-lg-2 col-sm-2 col-4 col-status"></div>
              <div class="col-lg-2 col-sm-2 col-4 col-date"></div>
              <div class="col-lg-1 col-sm-2 col-4 col-action"></div>
            </div>
          </article>
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
  data() {
    // return {
    //   columns: [
    //     {field: 'thumbnail', name: '이미지'},
    //     {field: 'title', name: '제목', },
    //     {field: 'description', name: '상세설명'},
    //     {field: 'price', name: '가격'},
    //     {field: 'tags', name: '태그'}
    //     {field: 'isSoldOut', name: '매진여부'}
    //   ]
    // }
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
  }
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
