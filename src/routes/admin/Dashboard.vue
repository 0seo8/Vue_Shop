<template lang="">
  <section class="content-main">
    <div class="contnet-header">
      <h2>Dash Board</h2>
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
        <div class="col-lg-8 col-md-12">
          <div class="card mb-4">
            <article class="card-body">
              <div class="chartjs">
                <h5>제품별 판매량(막대 그래프)</h5>
                <canvas id="myChart"></canvas>
              </div>
            </article>
          </div>
        </div>
        <div class="col-lg-4 col-md-12">
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
      <div class="card mb-4">
        <div class="card-body">
          <h5>최근 거래내역</h5>
          <div class="table-responsive">
            <table class="table">
              <tbody>
                <tr>
                  <td>2323</td>
                  <td><b>Devon Lane</b></td>
                  <td>devon@example.com</td>
                  <td>$778.35</td>
                  <td><span class="badge rounded-pill alert-success">Delivered</span></td>
                  <td>07.05.2020</td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-light">Detail</a>
                    <div class="dropdown">
                      <a
                        href="#"
                        data-bs-toggle="dropdown"
                        class="btn btn-light"> <i class="material-icons md-more_horiz"></i> </a> 
                      <div class="dropdown-menu">
                        <a
                          class="dropdown-item"
                          href="#">View detail</a>
                        <a
                          class="dropdown-item"
                          href="#">Edit info</a>
                        <a
                          class="dropdown-item text-danger"
                          href="#">Delete</a>
                      </div>
                    </div> <!-- dropdown //end -->
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
import Chart from 'chart.js/auto'
export default {
  mounted() {
    console.log('Component mounted')

    const productSales = document.querySelector('#myChart')
    const saleOfProudcts = document.querySelector('#donutChart')
    
    const myChart = new Chart(productSales, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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
const doughnutChart = new Chart(saleOfProudcts, {
    type: 'doughnut',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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

myChart
doughnutChart
  }
}
</script>
<style lang="scss" scoped>
.content-main {
  background-color: #f8f9fa;
  padding: 30px 5%;
  margin-left: auto;
  margin-right: auto;
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
