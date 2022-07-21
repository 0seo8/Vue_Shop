<template lang="">
  <section class="content-main">
    <div class="content-header">
      <h1>대시보드</h1>
      <AdminButton />
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="card card-body mb-4">
          <article class="incontenxt">
            <span class="primary rounded-circle">
              <i class="material-symbols-outlined icon">
                paid
              </i>
            </span>
            <div class="text">
              <h5>전체 매출</h5>
              <div class="span">
                {{ totalSale }}원
              </div>
            </div>
          </article>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-body mb-4">
          <article class="incontenxt">
            <span class="bg-info rounded-circle">
              <i class="material-symbols-outlined">
                local_shipping
              </i>
            </span>
            <div class="text">
              <h5>전체 주문</h5>
              <div class="span">
                {{ transactionDetail.length }}개
              </div>
            </div>
          </article>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-body mb-4">
          <article class="incontenxt">
            <span class="bg-success rounded-circle">
              <i class="material-symbols-outlined">
                shopping_basket
              </i>
            </span>
            <div class="text">
              <h5>전체 제품</h5>
              <div class="span">
                {{ productCount }}개
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 col-sm-12">
        <div class="card mb-4">
          <article class="card-body">
            <div class="chartjs">
              <h5>제품별 판매량(막대 그래프)</h5>
              <BarChart />
            </div>
          </article>
        </div>
      </div>
      <div class="col-md-4 col-sm-12">
        <div class="card mb-4">
          <article class="card-body">
            <div class="chartjs">
              <h5>매출액 대비 제품 비중</h5>
              <DoughnutChart />
            </div>
          </article>
        </div>
      </div>
    </div>
    <Transactions :details="transactionDetail" />
  </section>
</template>
<script>
import AdminButton from '../../components/admin/AdminButton.vue'
import Transactions from '../../components/admin/Transactions.vue'

import BarChart from '../../components/admin/chart/BarChart.vue'
import DoughnutChart from '../../components/admin/chart/DoughnutChart.vue'

import {mapState} from 'vuex'

export default {
  components: {
    AdminButton,
    Transactions,
    BarChart,
    DoughnutChart
  },
  computed: {
    ...mapState('admin', ['transactionDetail']),
    saleData() {
      return this.transactionDetail.map(detail => detail.product.price)
    },
    totalSale() {
      let sumPrice = 0
      this.saleData.forEach(price => sumPrice += price)
      return sumPrice.toLocaleString()
    },
    productCount() {
      return this.$store.state.admin.productList.length
    }
  }, 
  mounted() {
    this.$store.dispatch('admin/readTransactionDetail')
    this.$store.dispatch('admin/readProducts')
  },
}
</script>
<style lang="scss" scoped>
.content-main {
  color: var(--color-text-base);
  font-family: 'GmarketSansMedium';
  background-color: var(--color-admin-bg);
  padding: 60px 6%;
  margin-left: auto;
  margin-right: auto;
  .content-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .row {
    font-size: 1rem;
    .primary {
      background-color: #f2555a;
    }
  }
  .card {
    background-color: var(--color-info-bg);
    box-shadow: 0 0.1rem 0.25rem rgb(0 0 0 / 8%);
    display: flex;
    font-weight: bold;
    .incontenxt {
      display: flex;
      flex: auto;
      opacity: 0.9;
      align-items: center;
      h5 {
        color: var(--color-gray-700);
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 0 !important;
      }
      span {
        width: 40px;
        height: 40px;
        margin-right: 0.5rem;
        i {
          line-height: 40px;
          margin-left: 8px;
        }
      }
    }
  }
}

</style>
