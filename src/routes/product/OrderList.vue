<template>
  <section class="container">
    <h2>거래 내역</h2>
    <div v-if="!PurchaseHistories.length">
      구매 신청 내역이 없습니다.
    </div>
    <div
      v-else
      class="card">
      <div class="row head">
        <div
          v-for="(head, index) in headers"
          :key="index">
          {{ head }}
        </div>
      </div>  
      <PurchaseItem
        v-for="purchase in PurchaseHistories"
        :key="purchase.detailId"
        :purchase="purchase" 
        class="row"
        @cancel="cancel"
        @confirm="confirm" />
    </div>
  </section>
</template>

<script>
import {mapState, mapActions, mapGetters } from 'vuex'
import PurchaseItem from '~/components/product/PurchaseItem.vue'
export default {
  components: {
    PurchaseItem
  },
  data() {
    return {
      headers: ['주문일자', '상품명', '상품가격', '상세보기',  '구매확정', '구매취소']
    }
  },
  computed: {
    ...mapState('product',['PurchaseHistories']),
    ...mapState('auth',['user']),
    ...mapGetters('product',['getPurchasedProductId']),
  },
  created() {
    this.readPurchaseAllHistory()
  },
  methods: {
    ... mapActions('product', ['readPurchaseAllHistory', 'confirmPurchase', 'cancelOrder']),
    cancel(e) {
      this.cancelOrder(e)
    },
    confirm(e) {
      this.confirmPurchase(e)
    }
  },
}
</script>

<style lang="scss" scoped>
  section {
    padding-top: 2rem;
    h2 {
      padding: 1rem;     
    }
  }

  .card{
    box-shadow: 0 0.1rem 0.25rem rgb(0 0 0 / 8%);
    overflow: hidden;
    overflow-y: auto;
    max-height: 55vh;
  .row {
    display: grid;
    grid-template-columns: repeat(2, 1.5fr) repeat(4, 1fr);
    text-align: center;
    justify-content: center;
    &.head {
      font-weight: bold;
      padding: 1rem 0;
      border-bottom: 1px solid #ccc;
      box-shadow: 0 0.1rem 0.25rem rgb(0 0 0 / 8%);
    }
    &:nth-child(2) {
      margin-top: 1rem;
    }
  }
}

</style>
