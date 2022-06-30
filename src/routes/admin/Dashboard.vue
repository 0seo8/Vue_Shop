<template lang="">
  <section class="content-main">
    <div class="content-header">
      <h2>대시보드</h2>
      <AdminButton />
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="card card-body mb-4">
          <article class="incontenxt">
            <span class="bg-primary rounded-circle">
              <i class="material-symbols-outlined icon">
                paid
              </i>
            </span>
            <div class="text">
              <h6>전체 매출</h6>
              <div class="span">
                1,452,456원
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
              <h6>전체 주문</h6>
              <div class="span">
                3,584개
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
              <h6>전체 제품</h6>
              <div class="span">
                53개
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
              <canvas id="myChart"></canvas>
            </div>
          </article>
        </div>
      </div>
      <div class="col-md-4 col-sm-12">
        <div class="card mb-4">
          <article class="card-body">
            <div class="chartjs">
              <h5>매출액 대비 제품 비중</h5>
              <canvas id="donutChart"></canvas>
            </div>
          </article>
        </div>
      </div>
    </div>
    <Transactions />
  </section>
</template>
<script>
import Chart from 'chart.js/auto'
import AdminButton from '../../components/AdminButton.vue'
import axios from 'axios'
import Transactions from '../../components/Transactions.vue'

const { VITE_API_KEY, VITE_USERNAME } = import.meta.env
export default {
  components: {
    AdminButton,
    Transactions
  },
  computed: {
    details() {
      console.log(this.$store.state.admin.transactionDetail)
      return this.$store.state.admin.transactionDetail
    },
  }, 
  created() {
    this.$store.dispatch('admin/readTransactionDetail')
  },
  mounted() {
    
    const productSales = document.querySelector('#myChart')
    const saleOfProudcts = document.querySelector('#donutChart')
    
    const myChart = new Chart(productSales, {
    type: 'bar',
    data: {
        labels: ['테블릿', '노트북', '마우스', '가전제품', '에어컨', '프린터'],
        datasets: [{
            label: 'Electron Market Sale Data',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
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
        labels: ['테블릿', '노트북', '마우스', '가전제품', '에어컨', '프린터'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
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


doughnutChart
myChart
  },
  methods: {
  async request() {
    const { data } = await axios({
      url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/all',
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        apikey: VITE_API_KEY,
        username: VITE_USERNAME,
        masterKey: true
      }
    })
    console.log(data)
    return data
    }
  },
}
</script>
<style lang="scss" scoped>
.content-main {
  background-color: #f8f9fa;
  padding: 30px 5%;
  margin-left: auto;
  margin-right: auto;
  .content-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .card {
    box-shadow: 0 0.1rem 0.25rem rgb(0 0 0 / 8%);
    display: flex;
    .incontenxt {
      display: flex;
      flex: auto;
      opacity: 0.9;
      align-items: center;
      h6 {
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
