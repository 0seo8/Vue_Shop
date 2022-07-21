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
              v-for="(detail) in paginatedData"
              :key="detail.id">
              <td />
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
        <nav
          aria-label="Page navigation example">
          <ul
            class="pagination">
            <li class="page-item">
              <span
                class="page-link"
                aria-label="Previous">
                <span
                  aria-hidden="true"
                  @click="prevPage">&laquo;</span>
              </span>
            </li>

            <li
              v-for="pageNum in totalPages"
              :key="pageNum"
              class="page-item">
              <span
                class="page-link"
                :aria-current="currentPage === pageNum - 1 && 'page'"
                @click="paginate(pageNum)">{{ pageNum }}
              </span>
            </li>

            <li class="page-item">
              <span
                class="page-link"
                href="#"
                aria-label="Next">
                <span
                  aria-hidden="true"
                  @click="nextPage">&raquo;
                </span>
              </span>
            </li>
          </ul>
        </nav>
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
        {field: 'user-name', name: '이름'},
        {field: 'user-email', name: '제목'},
        {field: 'product-price', name: '가격'},
        {field: 'done', name: '구매여부'},
        {field: 'time', name: '구매시간'}
      ],
      pageSize: 10,
      currentPage: 0
    }
  },
  computed: {
    perPage() {
      return Math.ceil(this.details.length / this.pageSize)
    },
    totalPages() {
      return Array(this.perPage).fill().map((_, i) => i + 1)
    },
    paginatedData() {
      const start = (this.currentPage) * this.pageSize
      const end = start + this.pageSize
      return this.details.slice(start, end)
    }
  },
  methods: {
    paginate(num) {
      this.currentPage = num - 1
    },
    nextPage() {
      if (this.currentPage < this.perPage) {
        this.currentPage += 1
      }
    },
    prevPage() {
      if (this.currentPage >= 1) {
        this.currentPage -= 1  
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.card-body {
  color: var(--color-text-base);
  .table-responsive {
    
    .pagination {
      padding-top: 0.6rem;
      justify-content: center;
      cursor: pointer;
        [aria-current="page"] {
          color: var(--color-pirmary);
        }
      span {
        color: var(--color-gray-700);
      }
    }
  }
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
