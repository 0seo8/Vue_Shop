<template>
  <section class="container">
    <h3>주문목록</h3>
    <div class="container main">
      <div
        v-for="purchase in purchaseList"
        :key="purchase.detailId"
        class="wrap">
        <table>
          <colgroup>
            <col width="800" />
            <col width="" />
          </colgroup>
          <tbody>
            <tr>
              <td class="td1">
                <div class="title">
                  <span
                    v-if="purchase.done"
                    class="isdone">구매확정</span>
                  <span
                    v-else
                    class="isdone">확정대기</span>
                  <span
                    class="SWzAJ">
                    <span
                      size="4"
                      class="sc-13xhsmd-1 kMeFyN"></span>
                  </span>
                  <span
                    class="date">
                    {{ getdate(purchase.timePaid) }} 주문
                  </span>
                </div>
                <div class="content">
                  <div class="img__box">
                    <a>
                      <img
                        width="64"
                        height="64"
                        :src="purchase.product.thumbnail"
                        :alt="purchase.product.title" />
                    </a>
                  </div>
                  <div class="info">
                    <div class="info__box">
                      <a>
                        <span>{{ purchase.product.title }}</span>
                      </a>
                      <div class="info__desc">
                        <div>
                          <span class="price">{{ purchase.product.price.toLocaleString("ko-KR") }} 원</span>
                        </div> 
                        <div>
                          <button
                            class="btn btn-outline-info">
                            재구매하기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="td2">
                <div class="button__box">
                  <button
                    :disabled="purchase.done || purchase.isCanceled"
                    class="btn btn-outline-primary"
                    @click="confirmPurchase(purchase.detailId)">
                    구매확정
                  </button>
                  <button
                    :disabled="purchase.done || purchase.isCanceled"
                    class="btn btn-outline-success"
                    @click="cancelOrder(purchase.detailId)">
                    구매취소
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>  
    </div>
  </section>
</template>

<script>
import dayjs from 'dayjs'
import {mapState, mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      // purchaseList : ''
    }
  },
  computed: {
    ...mapState('product',['PurchaseHistories']),
    ...mapGetters('product',['getPurchasedProductId']), 
    purchaseList() {
      return this.PurchaseHistories.slice(0,5)
    } 
  },
  created() {
    this.readPurchaseAllHistory()
  },
  methods: {
    ... mapActions('product', ['readPurchaseAllHistory', 'confirmPurchase', 'cancelOrder']),
    getdate(e) {
      return dayjs(e).format('YY년 MM월 DD일')
    },
    // purchaseListFn(page) {
    //   this.purchaseList = this.PurchaseHistories.slice(`${page - 1}`,`${page + 3}`)
    // }  
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
  .wrap {
    border-radius: 8px;
    border: 1px solid rgb(238, 238, 238);
    background-color: rgb(255, 255, 255);
    margin-top: 16px;  
  }
}

.td1 {
  height: 100%;
  padding: 20px;
  vertical-align: top;
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    line-height: 1.5;
    .isdone {
        font-size: 1.2rem;
        font-weight: bold;
        color: #111;
        margin-left: 1rem;
    }
    .SWzAJ {
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 4px;
      height: 1em;
      vertical-align: middle;
      margin-left: 6px;
      margin-right: 6px;
      .kMeFyN {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: rgb(17, 17, 17);
          opacity: 0.2;
      }
    }
    .date {
      font-size: 1rem;
      font-weight: normal;
      color: rgb(0, 137, 26);
    }
  }
  .content {
     overflow: hidden;
     display: flex;
     flex-direction: row;
    .img__box {
          display: flex;
    width: 64px;
    position: relative;
    margin-right: 16px;
    }
    .info {
       user-select: none;
       overflow: hidden;
       flex: 1 1 0%;
       display: flex;
      &__box {
         display: flex;
         flex: 1 1 0%;
         user-select: none;
         min-width: 0px;
         flex-direction: column;
         justify-content: center;
        .title {
          margin-bottom: 4px;
        }
       }
      &__desc {
         display: flex;
         align-items: center;     
         justify-content: space-between;
        line-height: 1.5;
        .price {
          font-size: 1rem;
          font-weight: normal;
          color: #555;
        }
      }
    }
  }
}

.td2 {
  width: 200px;
  height: 100%;
  text-align: center;
  border-left: 1px solid rgb(238, 238, 238);
  .button__box {
    display: flex;
    flex-flow: column wrap;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
}

</style>
