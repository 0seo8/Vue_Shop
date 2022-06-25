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
              </div>
            </article>
          </div>
        </div>
        <div class="col-lg-4 col-md-12">
          <div class="card mb-4">
            <article class="card-body">
              <div class="chartjs">
                <h5>매출액 대비 제품 비중</h5>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div class="card mb-4">
        <div class="card-body">
          <h5>최근 거래내역</h5>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  
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
