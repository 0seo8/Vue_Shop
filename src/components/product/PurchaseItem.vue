<template>
  <tr>
    <td>
      날짜
    </td>
    <td>
      {{ purchase.product.title }}
    </td>
    <td>
      {{ purchase.product.price }} 
    </td>
    <td>
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
    </td>
    <td>
      <BaseButton @click="confirmPurchase(purchase.product.productId)">
        구매확인
      </BaseButton>
    </td>
    <td>
      <BaseButton @click="cancelOrder(purchase.detailId)">
        구매취소
      </BaseButton>
    </td>
  </tr>
</template>

<script>
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
  },
  methods: {
    ...mapActions('product', ['confirmPurchase', 'cancelOrder']),
  }
}
</script>
