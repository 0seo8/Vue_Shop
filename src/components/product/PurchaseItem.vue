<template>
  <div class="column" :class="purchase.isCanceled ? 'show' : ''">
    <div>
      {{ getdate }}
    </div>
    <div class="title">
      <span v-if="purchase.done" class="badge badge-done">확정</span>
      <span v-else-if="purchase.isCanceled" class="badge badge-cancle"
        >취소</span
      >
      {{ purchase.product.title }}
    </div>
    <div>{{ purchase.product.price.toLocaleString("ko-KR") }} 원</div>
    <div>
      <BaseDialog v-if="isOpen" title="상세 보기">
        <template #default> 제품에 대한 상세 내역정리 </template>
        <template #actions>
          <button class="btn" @click="isOpen = false">Okay</button>
        </template>
      </BaseDialog>
      <button class="btn btn-outline-info">상세보기</button>
    </div>
    <div>
      <button
        :disabled="purchase.done || purchase.isCanceled"
        class="btn btn-outline-primary"
        @click="$emit('confirm', purchase.detailId)"
      >
        구매확인
      </button>
    </div>
    <div>
      <button
        :disabled="purchase.done || purchase.isCanceled"
        class="btn btn-outline-success"
        @click="$emit('cancel', purchase.detailId)"
      >
        구매취소
      </button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapActions } from "vuex";
import BaseDialog from "~/components/UI/BaseDialog.vue";
export default {
  components: {
    BaseDialog,
  },
  props: {
    purchase: {
      type: Object,
      required: true,
    },
  },
  emits: ["cancel", "confirm"],
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    getdate() {
      return dayjs(this.purchase.timePaid).format("YYYY년 MM월 DD일 HH시 mm분");
    },
  },
  methods: {
    ...mapActions("product", ["confirmPurchase", "cancelOrder"]),
  },
};
</script>

<style lang="scss" scoped>
.btn:disabled {
  color: #ccc;
  border-color: #ccc;
}

.show {
  color: #ccc;
  text-decoration: line-through;
}

.column {
  padding: 0.5rem;
  border-bottom: 1px solid #e0e2e7;
  display: block;
  align-items: center;
  justify-content: center;

  .title {
    text-align: start;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    .badge {
      display: inline-block;
      padding: 0 5px;
      border-radius: 5px;
      font-size: 11px;
      line-height: 18px;
      font-weight: 700;
      color: #fff;
      &-done {
        background-color: #ff61a7;
      }
      &-cancle {
        background-color: #ccc;
      }
    }
  }
}
</style>
