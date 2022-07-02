<template>
  <section class="container">
    <h2>구매내역</h2>
    <div class="card">
      <div class="row head">
        <div
          v-for="column in columns"
          :key="column.field"
          class="column head">
          {{ column.name }}
        </div>
      </div>
      <div
        v-for="purchaseHistory in PurchaseHistories" 
        :key="purchaseHistory.detailId"
        class="row">
        <div
          v-for="column in columns"
          :key="column.field"
          class="column">
          <template v-if="column.field === 'timePaid'">
            {{ purchaseHistory.timePaid }}
          </template>
          <template v-else-if="column.field === 'done'">
            <button
              class="btn btn-outline-success"
              @click="cancelOrder(purchase.detailId)">
              구매취소
            </button>
          </template>
          <template v-else-if="column.field === 'isCanceled'">
            <button
              class="btn btn-outline-primary"
              @click="confirmPurchase(purchase.product.productId)">
              구매확인
            </button>
          </template>
          <template v-else-if="column.field === 'description'">
            <button
              class="btn btn-outline-info"
              @click="isOpen = true">
              상세보기
            </button>
          </template>
          <template v-else>
            {{ purchaseHistory.product[column.field] }}
          </template>
        </div>
      </div>
    </div>  
    <BaseDialog
      v-if="isOpen"
      title="상세 보기">
      <template #default>
        제품에 대한 상세 내역정리
      </template>
      <template #actions>
        <BaseButton @click="isOpen = false">
          Okay
        </BaseButton>
      </template>
    </BaseDialog>
  </section>
</template>

<script>
import {mapState, mapActions, mapGetters } from 'vuex'
import BaseDialog from '../../components/UI/BaseDialog.vue'
export default {
  components: {
    BaseDialog
  },
  data() {
    return {
      columns: [
        { field: 'timePaid', name: '주문일' },
        { field: 'title', name: '상품명' },
        { field: 'price', name: '상품가격'},
        { field: 'description', name: '상세보기' },
        { field: 'done', name: '구매확정'},
        { field: 'isCanceled', name: '구매취소'},
      ],
      isOpen: false,
    }
  },
  computed: {
    ...mapState('product',['PurchaseHistories']),
    ...mapState('user',['user']),
    ...mapGetters('product',['getPurchasedProductId']),
  },
  created() {
    this.readPurchaseAllHistory()
  },
  methods: {
    ... mapActions('product', ['readPurchaseAllHistory','confirmPurchase', 'cancelOrder'])
  },
}
</script>

<style lang="scss" scoped>
  section {
    padding-top: calc(80px + 2rem);
    h2 {
      padding: 1rem;     
    }
  }
    .card{
      box-shadow: 0 0.1rem 0.25rem rgb(0 0 0 / 8%);
      overflow: hidden;
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
      .column {
        padding: .5rem;
        border-bottom: 1px solid #e0e2e7;
        display: block;
        align-items: center;
        justify-content: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 16px;
        line-height: 16px;
      }
    }

</style>
