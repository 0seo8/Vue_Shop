<template>
  <section class="container">
    <div class="breadcrumbs">
      <ul>
        <li @click="$router.push('/')">
          홈 >
        </li>
        <li> 장바구니 </li>
      </ul>
    </div>
    <div class="container ">
      <div class="wrap">
        <div class="wrap_box">
          <CartItem
            v-for="product in myCartList.map(item=>item.product)"
            :key="product.productId"
            :product="product" 
            @total="total" />
        </div>
        <div class="price-box">
          <span class="text">총 : {{ totalPrice }}</span>
          <label
            for="confirm-modal"
            class="modal-button btn btn-primary ml-5">구매하기</label>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import CartItem from '~/components/product/CartItem.vue'
export default {
  components: {
    CartItem
  },
  data() {
    return {
      totalPrice: 0
    }
  },
  computed: {
    ...mapState('product', ['count']),
    ...mapGetters('product', ['myCartList']),
   },
  created() {
      this.readPurchaseAllHistory()
  },
  methods: {
    ...mapActions('product', ['readPurchaseAllHistory']),
    total(e) {
      console.log('toatal', e)
    }
  }
}
</script>

<style lang="scss" scoped>

section {
  padding-top: 4rem;
}

.container {
   padding-top: 1.25rem;
}
.wrap {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5rem;
  &_box {
    flex-grow: 1;
  }
}


</style>
