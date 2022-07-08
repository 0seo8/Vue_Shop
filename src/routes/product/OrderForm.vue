<template>
  <section class="container">
    <div class="title">
      <h2>주문서 작성</h2>
    </div>
    <div class="table">
      <div>
        <div class="info head">
          상품정보
        </div>
        <div class="info box">
          <img
            :src="seletedProduct.thumbnail"
            alt="상품사진" />
          <p>{{ seletedProduct.title }}</p>  
        </div>
      </div>
      <div>
        <div class="info head">
          배송정보
        </div>
        <div class="info box">
          {{ seletedProduct.price > 50000 ? "무료배송" : "2,500" }}
        </div>
      </div>
      <div>
        <div class="info head">
          상품금액
        </div>
        <div class="info box">
          {{ seletedProductPrice }} 원
        </div>
      </div>
    </div>

    <div class="purchaseInfo">
      <div class="orderUserInfo">
        <dl
          v-if="user"
          class="orderUserInfo__list">
          <dt>주문자정보</dt>
          <dd id="cName">
            {{ user.displayName }}
          </dd>
          <dd class="email">
            <span id="buyerEmail">{{ user.email }}</span>
          </dd>
          <dd>
            <button
              type="button"
              class="buttonBasic buttonDefault02 sizeSS"
              onclick="orderShowLayer('userInfoModify');">
              수정
            </button>
          </dd>
        </dl>
        <ul class="orderUserInfo__guide">
          <li>- 주문자 정보로 결제정보가 제공됩니다.</li>
        </ul>
      </div>
      <div class="checkbox-wrap">
        <div class="form-control">
          <label for="selectAccountId">결제를 진행할 계좌를 선택해주세요</label>
          <select
            id="selectAccountId"
            v-model="selectAccountId"
            name="selectAccountId">
            <option
              v-for="account in currentAccounts.accounts"
              :key="account.id"
              :value="account.id">
              {{ account.bankName }}
            </option>
          </select>
        </div>
        <div class="checkbox-info">
          <div class="box__inner">
            <ul class="check__list">
              <li class="list__item allagree">
                <div class="box__custom-form">
                  <input
                    id="checkAll"
                    v-model="checkAll"
                    type="checkbox"
                    name="checkAll" />
                  <label
                    for="checkAll">
                    <em>전체동의</em>
                    <span class="text">만 14세 이상만 구매가능합니다.</span>
                  </label>
                </div>
              </li>
            </ul>
            <ul class="check__list">
              <li class="list__item">
                <div class="box__custom-form">
                  <input
                    id="check1"
                    v-model="check.check1"
                    type="checkbox" 
                    name="check1" />
                  <label for="check1"><em>필수</em> 개인정보 수집 및 이용동의</label>
                </div>
                <button
                  class="button__detail"
                  @click="ReadMore = !ReadMore">
                  자세히
                </button>
                <div
                  v-if="ReadMore"
                  class="box__detail-term">
                  <p>만 14세 이상만 구매가능합니다.</p>
                  <p>
                    목적: 주문, 결제 및 배송서비스
                  </p>
                  <p>
                    항목: 구매자정보(이름, 연락처, 메일주소), 주문비밀번호, 상품 구매/취소/반품/교환/환불 정보, 수령인정보(이름, 주소, 연락처), 결제번호, 송장정보, 은행계좌정보, 휴대폰번호(휴대폰결제시), 해외카드번호(해외카드결제시), 현금영수증 정보
                  </p>
                  <p>
                    보유기간: <strong>관련 법률에 따라 5년간 보존</strong>
                  </p>
                  <p>
                    이용동의: Electronic Market는 고객님께서 구매하신 서비스 및 상품의 원활한 제공을 위해 최소한의 범위 내에서 아래와 같이 개인정보를 수집·이용 합니다. 고객님께서는 수집 및 이용에 동의하지 않으실 수 있으며 동의하지 않으실 경우, 일부 구매가 제한될 수 있습니다.
                  </p>
                </div>
              </li>
              <li class="list__item">
                <div class="box__custom-form">
                  <input
                    id="check2"
                    v-model="check.check2"
                    type="checkbox"
                    name="check2" />
                  <label for="check2"><em>필수</em> 개인정보 제3자 제공동의</label>
                </div>
                <button
                  class="button__detail"
                  @click="ReadMoreText = !ReadMoreText">
                  자세히
                </button>
                <div
                  v-if="ReadMoreText"
                  class="box__detail-term">
                  <p>
                    제공받는자: <strong>Electronic Market</strong>
                  </p>
                  <p>
                    목적: <strong>판매자와 구매자의 거래의 원활한 진행, 본인 의사의 확인, 고객 상담 및 불만처리, 상품과 경품배송을 위한 배송지 확인 등</strong>
                  </p>
                  <p>
                    항목: 구매자정보(이름, 연락처, 메일주소), 주문비밀번호, 상품 구매/취소/반품/교환/환불 정보, 수령인정보(이름, 주소, 연락처), 결제번호, 송장정보, 은행계좌정보, 휴대폰번호(휴대폰결제시), 해외카드번호(해외카드결제시), 현금영수증 정보
                  </p>
                  <p>
                    보유기간: <strong>구매 서비스 종료 후 1개월</strong>
                  </p>
                  <p>
                    이용동의: Electronic Market는 고객님께서 구매하신 서비스 및 상품의 원활한 제공을 위해 최소한의 범위 내에서 아래와 같이 개인정보를 수집·이용 합니다. 고객님께서는 수집 및 이용에 동의하지 않으실 수 있으며 동의하지 않으실 경우, 일부 구매가 제한될 수 있습니다.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="purchaseInfo__box">
        <h3 class="purchaseInfo__title">
          최종결제금액
        </h3>
        <div class="expected-payment">
          <div><span>상품가격</span><span>{{ seletedProductPrice }}원</span></div>
          <div>
            <span>배송비</span>
            <span v-if="seletedProduct.price < 50000">2,500 원</span>
            <span v-else>무료배송</span>
          </div>
        </div>
        <div class="expected-payment-all">
          <p>총결제금액</p>
          <div v-if="seletedProduct.price < 50000">
            {{ (seletedProduct.price + 2500).toLocaleString('ko-KR') }} 원
          </div>
          <div v-else>
            {{ seletedProductPrice }} 원
          </div>
        </div>        
        <button
          type="button"
          class="btn btn-primary"
          @click="PayNow(seletedProduct.id, selectAccountId)">
          결제하기
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data() {
    return {
      selectAccountId: '',
      ReadMore: false,
      ReadMoreText: false,
      check: {
        check1: false,
        check2: false,
      }
    }
  },
  computed: {
    ...mapState('account', ['currentAccounts']),
    ...mapState('product', ['seletedProduct', 'seletedProductPrice']),
        ...mapState('auth',['user']),
    selectAccount() {
      return this.currentAccounts.accounts.filter(account => account.id === this.selectAccountId)
    },
    checkAll: {
      get() {
        if(this.check.check1 && this.check.check2) {
          return true
        } else {
          return false
        }
      },
      set(e) {
        if(e === true) {
          this.check.check1 = true
          this.check.check2 = true
        } else {
          this.check.check1 = false
          this.check.check2 = false          
        }
      }
     }  
    },
    created() {
      this.getCurrentAccounts()
      this.authenticationCheck()
    },
    methods: {
      ...mapActions('account', ['getCurrentAccounts']),
      ...mapActions('product', ['requestPurchase']),
      ...mapActions('auth', ['authenticationCheck']),
      PayNow(productId, accountId) {
        if(this.selectAccountId === '') {
          confirm('결제 계좌가 선택되지 않았습니다')
        } else if (this.selectAccount.balance < this.seletedProduct.price){
          confirm('계좌 잔액이 부족합니다')
        } else if(!(this.check.check1 && this.check.check2)){
          confirm('체크박스를 확인해주세요')
        } else {
          const data = {productId, accountId}
          this.requestPurchase(data)
          if(confirm('결제가 정상적으로 진행되었습니다. 거래내역을 확인 하시겠습니까?')){
            this.$router.push('/orderlist')
          }else{
            this.$router.go(-1)
          }
        }
      },
    },
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 3rem;
  .title {
    text-align: center;
    margin: 1rem;
  }
}

.table {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  > * {
    border: none;
  }
  .info.head {
    padding: 20px 25px;
    border-top: 2px solid #222;
    background-color: rgb(245,245,245);
    font-weight: 600;
    text-align: center;
  }
  .info.box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    border-bottom: 1px solid #ccc;
    img {
      width:30%;
      max-height: 200px; 
    }
  }
}

.purchaseInfo{
  display: grid;
  margin-top: 15px;
  gap: 1rem;
  grid-template-columns: 1fr 2fr 1fr;
.orderUserInfo {
    padding: 30px 20px;
    background: #f9f9f9;
    &__guide {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #eee;
      li {
        line-height: 17px;
        font-size: 12px;
        color: #555;
      }
    }
    &__list {
      dt {
        position: relative;
        margin-bottom: 13px;
        padding-bottom: 15px;
        border-bottom: 1px solid #222;
        font-weight: 600;
        font-size: 16px;
        color: #222;
      }
      dd {
        position: relative;
        line-height: 22px;
        font-size: 13px;
        color: #222;
        &.email {
         display: flex;
         justify-content: space-between;
        }
      }
    }
  }
  &__box {
    border: 1px solid #000;
    padding: 1.5rem;
    min-width: 300px;
    .expected-payment {
      display: flex;
      flex-flow: column;
      > div {
        display: flex;
        justify-content: space-between;
        padding: .5rem;
      }
    }
    .expected-payment-all {
      border-top: 1px solid #222;
      padding-top: 1rem;
      display: flex;
      flex-flow: column;
      align-items: end;
    }
  }
  &__title {
    padding-bottom: 15px;
    border-bottom: 1px solid #222;
    text-align: center;
    font-weight: 700;
    font-size: 22px;
    color: #222;
  }
}

.checkbox-wrap {
  display: flex;
  flex-flow: column;
  justify-content: space-between;

  &__box {
    position: relative;
    margin-top: 16px;
  }
  .box__inner {
     padding: 20px 30px;
     background-color: #fff;
     border-radius: 8px;
     border: 1px solid #e0e0e0;
  }
  .allagree {
    padding-bottom: 16px;
    border-bottom: 1px solid #eee;
  }
  .box__custom-form {
    padding-right: 70px;
    position: relative;
    input[type="checkbox"] {
       position: absolute;
       top: 0;
       left: 0;
       z-index: 1;
       width: 20px;
       height: 20px;
       margin-top: 0 !important;
      &+label {
        position: relative;
        display: inline-block;
        z-index: 5;
        margin: 0;
        padding-left: 26px;
        vertical-align: top;
        font-size: 15px;
        line-height: 20px;
        color: #616161;
        cursor: pointer;
      }
    }
    em {
      display: inline;
      margin-right: 6px;
      color: #067dfd;
      font-style: normal;
    }
    .text {
      display: inline;
      font-size: 15px;
      line-height: 20px;
      color: #9e9e9e;
      vertical-align: top;
    }
  }
  .check__list {
    margin-top: 16px;
    .list__item {
      position: relative;
      margin-bottom: 1rem;
    }
  }
  .button__detail {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 14px;
    line-height: 20px;
    color: #9e9e9e;
    letter-spacing: -0.14px;
  }
  .box__detail-term {
    padding: 12px 14px;
    margin: 10px 0 2px;
    font-size: 13px;
    line-height: 18px;
    color: #9e9e9e;
    background: #f5f5f5;
    border-radius: 8px;
  }
}

.form-control {
  display: flex;
  flex-flow: column;
  padding: 16px;
  flex-shrink: 0;
}
.account-list {
  display: flex;
  flex-flow: row wrap;
  gap: .5rem;
}

.btn {
  width: 100%;
  color: #fff;
  margin-top: 1rem;
}

select {
  margin-top: 1rem;
}
</style>
