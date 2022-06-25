<template>
  <main>
    <div class="title">
      <h2>주문서 작성</h2>
    </div>
    <div class="orderInfo">
      <table>
        <thead>
          <tr>
            <th>
              상품정보
            </th>
            <th>배송</th>
            <th>상품금액(할인포함)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="thumb">
                <img
                  src=""
                  alt="상품이미지" />
              </div>
            </td>
            <td>
              <div>
                <p>{{ seletedProduct.title }}</p>
                <p>{{ seletedProduct.description }}</p>
              </div>
            </td>
            <td>
              <div>
                <p>국내배송</p>
                <p>택배</p>
                <p>무료</p>
              </div>
            </td>
            <td>
              <div>
                <p><span>{{ seletedProduct.price }}</span>원</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="purchaseInfo">
      <div class="purchaseInfo__right">
        <div>
          <h2>최종결제금액</h2>
          <div><span>상품가격</span><span>{{ seletedProduct.price }}</span></div>
        </div>
        <div>
          <h3>총결제금액</h3>
          <div>{{ seletedProduct.price }}</div>
        </div>
        <div>
          <div class="form-control">
            <label for="selectAccount">결제를 진행할 계좌를 선택해주세요</label>
            <select
              id="selectAccount"
              v-model="selectAccount">
              <option
                v-for="account in accounts"
                :key="account.id"
                :value="account.id">
                {{ account.bankName }}
              </option>
            </select>
          </div>
          <BaseButton @click="PayNow(seletedProduct.id, selectAccount)">
            결제하기
          </BaseButton>
        </div>
      </div>
      <BaseDialog
        v-if="openDialog"
        title="결제완료">
        <template #default>
          <p>결제가 정상적으로 처리 되었습니다.</p> 
          <p>거래내역을 확인 하시겠습니까?</p>
        </template>
        <template #actions>
          <BaseButton @click="goToCart">
            Okay
          </BaseButton>
          <BaseButton @click="openDialog=false">
            Close
          </BaseButton>
        </template>
      </BaseDialog>
    </div>
  </main>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import BaseDialog from '~/components/UI/BaseDialog.vue'
export default {
  components: {
    BaseDialog
  },
  data() {
    return {
      selectAccount: '',
      openDialog: false
    }
  },
  computed: {
    ...mapState('user', ['accounts']),
    ...mapState('product', ['seletedProduct'])
    },
    methods: {
      ...mapActions('product', ['requestPurchase']),
      PayNow(productId, accountId) {
        const data = {productId, accountId}
        this.requestPurchase(data)
        this.openDialog = true
      },
      goToCart() {
        this.$router.push('/cart')
      } 
    },
}
</script>

<style lang="scss">
.purchaseInfo{
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
}
.account-list {
  display: flex;
  flex-flow: row wrap;
  gap: .5rem;
}
</style>
