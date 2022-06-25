<template>
  <div
    class="my-tab">
    <div
      class="my-info">
      <div>
        <img
          src=""
          alt="고객이미지사진" />
      </div>
      <span><strong>고객이름</strong>님</span>
    </div>
    <div>
      <p>계좌 잔액</p>
      <span><strong>금액</strong>원</span>
      <div>계좌보기</div>
    </div>
    <nav>
      <div>구매내역</div>
      <div>내 정보 수정</div>
    </nav>
  </div>
  <div>
    <h1>거래 내역</h1>
    <div v-if="!PurchaseHistories.length">
      구매 신청 내역이 없습니다.
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>주문일</th>
            <th>상품명</th>
            <th>상품가격</th>
            <th>상세보기</th>
            <th>구매확정</th>
            <th>구매취소</th>
          </tr>
        </thead>
        <tbody>
          <PurchaseItem
            v-for="purchase in PurchaseHistories"
            :key="purchase.id"
            :purchase="purchase"
            @click="log" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters } from 'vuex'
import PurchaseItem from '~/components/product/PurchaseItem.vue'
export default {
  components: {
    PurchaseItem
  },
  data() {
    return {
      
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
    ... mapActions('product', ['readPurchaseAllHistory']),
    log(e){
      console.log(e)
    }
  },
}
</script>
