<template lang="">
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="mb-4">
        최근 거래내역
      </h5>
      <div class="table-responsive">
        <table class="table">
          <tbody>
            <tr
              v-for="(detail, index) in transactionDetail"
              :key="detail.id">
              <td>{{ index + 1 }}</td>
              <td><b>{{ detail.user.displayName }}</b></td>
              <td>{{ detail.user.email }}</td>
              <td>{{ detail.product.price.toLocaleString() + '원' }}</td>
              <td>
                <span 
                  v-if="detail.isCanceled"
                  class="badge rounded-pill alert-danger">거래취소</span>
                <span 
                  v-else-if="!detail.done"
                  class="badge rounded-pill alert-warning">입금대기</span>
                <span 
                  v-else-if="detail.done"
                  class="badge rounded-pill alert-success">거래완료</span>
              </td>
              <td>{{ new Date(detail.timePaid).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {field: 'index', name: ''},
        {field: 'user-name', name: '이름'},
        {field: 'user-email', name: '제목'},
        {field: 'product-price', name: '가격'},
        {field: 'done', name: '구매여부'},
        {field: 'time', name: '구매시간'}
      ]
    }
  },
  computed: {
    transactionDetail() {
      return this.$store.state.admin.transactionDetail
    }
  },  
}
</script>
<style lang="scss" scoped>
tr {
  font-size: 10px;
  td {
    &:nth-child(5) {
      width: 62px;
    }
    vertical-align: inherit;
  }
  .badge {
    padding: 0.4rem 0.8rem;
  }
}
</style>
