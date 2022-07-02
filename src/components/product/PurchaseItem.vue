<template>
  <div>
    <div>
      {{ gedivate }}
    </div>
    <div>
      {{ purchase.product.title }}
    </div>
    <div>
      {{ purchase.product.price.toLocaleString("ko-KR") }} 원
    </div>
    <div>
      <BaseDialog
        v-if="isOpen"
        title="상세 보기">
        <template #default>
          제품에 대한 상세 내역정리
        </template>
        <template #actions>
          <BaseButton @click="isOpen = false">
            Okay
          </BaseButton>
        </template>
      </BaseDialog>
      <button class="btn btn-outline-info">
        상세보기
      </button>
    </div>
    <div>
      <button
        class="btn btn-outline-primary"
        @click="confirmPurchase(purchase.product.productId)">
        구매확인
      </button>
    </div>
    <div>
      <button
        class="btn btn-outline-success"
        @click="cancelOrder(purchase.detailId)">
        구매취소
      </button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import {mapActions} from 'vuex'
import BaseDialog from '~/components/UI/BaseDialog.vue'
export default {
  components:{
    BaseDialog
  },
  props: {
    purchase: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    gedivate() {
      return dayjs(this.purchase.timePaid).format('MM월 YY일 HH:mm')
    },
  },
  methods: {
    ...mapActions('product', ['confirmPurchase', 'cancelOrder']),
  }
}
</script>
