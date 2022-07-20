<template>
  <div class="breadcrumbs container">
    <ul>
      <li @click="$router.push('/')">
        홈 >
      </li>
      <li> 주문 목록</li>
    </ul>
  </div>
  <section class="container">
    <h3>주문목록</h3>
    <div class="container main">
      <div class="btn__wrap">
        <div class="btn__list">
          <div
            class="badge rounded-pill alert-danger"
            :style="{color: state==='all'?'#F79698':''}"
            @click="currentState('all')">
            All
          </div>
          <div
            class="badge rounded-pill alert-warning"
            :style="{color: state==='confirm'?'#F79698':''}"
            @click="currentState('confirm')">
            구매 확정 내역
          </div>
          <div
            class="badge rounded-pill alert-success"
            :style="{color: state==='cancel'?'#F79698':''}"
            @click="currentState('cancel')">
            구매 취소 내역
          </div>
        </div>
      </div>

      <div v-if="!PurchaseHistories.length">
        구매 신청 내역이 없습니다.
      </div>
      <div v-if="state==='cancel'">
        <PurchaseItem
          v-for="purchase in PurchaseHistories.filter(purchase=>purchase.isCanceled).slice(0, page)"
          :key="purchase.detailId"
          :purchase="purchase" 
          @cancel="cancel"
          @confirm="confirm" />
      </div>

      <div v-else-if="state==='confirm'">
        <PurchaseItem
          v-for="purchase in PurchaseHistories.filter(purchase=>purchase.done).slice(0, page)"
          :key="purchase.detailId"
          :purchase="purchase" 
          @cancel="cancel"
          @confirm="confirm" />
      </div>

      <div v-else>
        <PurchaseItem
          v-for="purchase in PurchaseHistories.slice(0, page)"
          :key="purchase.detailId"
          :purchase="purchase" 
          :page="page"
          @cancel="cancel"
          @confirm="confirm" />
      </div>

      <div class="bottom">
        <p v-if="page>=PurchaseHistories.length">
          더이상의 구매내역이 없습니다.
        </p>
        <button
          :disabled="page>=PurchaseHistories.length"
          class="btn__item"
          @click="page=page+3">
          더보기
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import {mapState, mapActions, mapGetters } from 'vuex'
import PurchaseItem from '~/components/product/PurchaseItem.vue'

export default {
    components: { PurchaseItem },
    data() {
      return {
        state: 'all',
        page: 4
      }
    },
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
      },
      currentState(e) {
        this.state = e
        this.page=4
      }
    },

}
</script>

<style lang="scss" scoped>

section {
  margin-top: 2rem;
  text-align: center;
}
.main {
    max-width: 900px;
    border-radius: 12px;
    box-shadow: rgb(0 0 0 / 8%) 0px 2px 4px 0px, rgb(0 0 0 / 16%) 0px 0px 1px 0px;
    background-color: var(--color-info-box);
    margin-top: 2rem;
    margin-bottom: 20px;
    padding: 24px 24px 16px;
}

.btn {
  &__wrap {
    display: flex;
    flex-direction: row;    
  }
  &__list {
    display: flex;
    align-items: center;
    margin-top: 12px;
  }
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    min-width: 72px;
    height: 26px;
    border-radius: 13px;
    border: 1px solid rgb(196, 205, 213);
    background-color: rgb(255, 255, 255);
    color: rgb(69, 79, 91);
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    vertical-align: middle;
    margin-right: 5px;
    line-height: 1;
    cursor: pointer;
  }
}
  .bottom {
    display: flex;
    flex-flow: column;
    justify-content: center;
    margin-top: 1rem;
    align-items: center;
    p {
      margin-bottom: 1rem;
    }
}

.btn-outline-primary {
  color: #f2555a;
  border-color: #f2555a;
  &:hover {
    background-color: #f2555a;
    border-color: #f2555a;
  }
}

.badge {
  margin-right: .5rem;
  padding: .4rem .8rem;
  min-width: 60px;
  cursor: pointer;
  &:hover {
    filter: sepia(1.2);
  }
}

</style>
