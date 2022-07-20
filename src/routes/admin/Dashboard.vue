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
                {{ details.length }}개
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
              <canvas id="myChart" />
            </div>
          </article>
        </div>
      </div>
      <div class="col-md-4 col-sm-12">
        <div class="card mb-4">
          <article class="card-body">
            <div class="chartjs">
              <h5>매출액 대비 제품 비중</h5>
              <canvas id="donutChart" />
            </div>
          </article>
        </div>
      </div>
    </div>
    <Transactions :details="details" />
  </section>
</template>
<script>
import Chart from 'chart.js/auto'
import AdminButton from '../../components/AdminButton.vue'
import Transactions from '../../components/Transactions.vue'

export default {
  components: {
    AdminButton,
    Transactions,
  },
  computed: {
    details() {
      return this.$store.state.admin.transactionDetail
    },
    saleData() {
      return this.details.map(detail => detail.product.price)
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
  created() {
    this.$store.dispatch('admin/readTransactionDetail')
    this.$store.dispatch('admin/readProducts')
  },
  mounted() {
    
    const productSales = document.querySelector('#myChart')
    const saleOfProudcts = document.querySelector('#donutChart')
    
    const myChart = new Chart(productSales, {
    type: 'bar',
    data: {
        labels: ['모니터', '청소기', '노트북', '에어컨', '에어팟', '선풍기', '커피머신', '스마트 웨어러블'],
        datasets: [{
            label: 'Electron Market Sale Data',
            data: [12, 19, 3, 5, 2, 3, 2, 7],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(153, 200, 255, 0.2)',
                'rgba(255, 60, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(153, 200, 255, 1)',
                'rgba(255, 60, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
})
const doughnutChart = new Chart(saleOfProudcts, {
    type: 'doughnut',
    data: {
        labels: ['생활가전', '계절가전', '디지털'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            // y: {
            //   beginAtZero: true
            // }
        }
    }
})

doughnutChart
myChart
  },
}
</script>
<style lang="scss" scoped>
.content-main {
  color: var(--color-text-base);
  font-family: 'GmarketSansMedium';
  background-color: var(--color-admin-bg);
  padding: 60px 10%;
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
