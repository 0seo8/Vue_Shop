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
              v-for="(detail, index) in details"
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
              <td class="date">
                {{ new Date(detail.timePaid).toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    details: Array
  },
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
}
</script>
<style lang="scss" scoped>
.card-body {
  color: var(--color-text-base);
}
tr {
    font-size: 1rem;
    color: var(--color-text-base);
  td {
    &:first-child {
      width: 70px;
      text-align: center;
    }
    &:nth-child(5) {
      width: 62px;
    }
    &:nth-child(6) {
      color: var(--color-gray-700);
    }
    vertical-align: inherit;
    line-height: 2.5rem;
  }
  .badge {
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
    font-weight: 900;
    margin-right: 2rem;
  }
}
</style>
