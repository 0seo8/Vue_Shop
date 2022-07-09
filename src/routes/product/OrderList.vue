<template>
  <section class="container">
    <h3>주문목록</h3>
    <div class="container main">
      <div v-if="!PurchaseHistories.length">
        구매 신청 내역이 없습니다.
      </div>
      <div
        v-for="purchase in PurchaseHistories"
        :key="purchase.detailId">
        <PurchaseItem
          :purchase="purchase" 
          @cancel="cancel"
          @confirm="confirm" />
      </div>
    </div>
  </section>
</template>

<script>
import {mapState, mapActions, mapGetters } from 'vuex'
import PurchaseItem from '~/components/product/PurchaseItem.vue'

export default {
    components: { PurchaseItem },
    computed: {
      ...mapState('product', ['PurchaseHistories']),
      ...mapGetters('product', ['getPurchasedProductId']),
    },
    created() {
        this.readPurchaseAllHistory()
    },
    methods: {
      ...mapActions('product', ['readPurchaseAllHistory', 'confirmPurchase', 'cancelOrder']),
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
  margin-top: 3rem;
  text-align: center;
}
.main {
    max-width: 900px;
    border-radius: 12px;
    box-shadow: rgb(0 0 0 / 8%) 0px 2px 4px 0px, rgb(0 0 0 / 16%) 0px 0px 1px 0px;
    background-color: rgb(255, 255, 255);
    margin-bottom: 20px;
    padding: 24px 24px 16px;
}

</style>
