<template>
  <div class="my-page-top">
    <div class="profile">
      <div class="profile__img">
        <img :src="user.profileImg">
      </div>
      <div
        v-show="user"
        class="profile__info">
        <h3>{{ user.displayName }} 님</h3>
        <p>이메일 : {{ user.email }}</p>
        <button
          class="btn btn-primary logout-btn"
          @click="logOut()">
          로그아웃!
        </button>
        <button
          class="btn btn-primary modify-btn"
          @click="$router.push('/profilechange')">
          회원 정보 수정
        </button>
        <button
          class="btn btn-primary">
          거래내역
        </button>
      </div>
    </div>

    <div class="account">
      <div
        v-if="handleAccount"
        class="current-account-list">
        <h2 class="account-title">
          현재 계좌 목록
        </h2>
        <div
          v-for="currentAccount in currentAccounts.accounts"
          :key="currentAccount.id"
          class="current-account">
          {{ currentAccount.bankName }} / 잔액 :
          {{ currentAccount.balance.toLocaleString("ko-KR") }}원 /
          <button
            class="btn btn-primary"
            @click="disConnectAccount(currentAccount.id)">
            연결해제
          </button>
        </div>
        <button
          class="btn btn-primary connect-btn"
          @click="toogleHandleAccount()">
          계좌 연결하기
        </button>
      </div>

      <div
        v-else
        class="all-account-list">
        <h2 class="account-title">
          모든 계좌 목록
        </h2>

        <div
          v-for="account in allAccount"
          :key="account.name"
          class="all-account">
          {{ account.name }}
          <span
            v-if="account.disabled"
            class="account-disabled-true">
            연결완료
          </span>
          <button
            v-else
            class="account-disabled-false btn btn-primary"
            @click="
              connectAccount(
                account.code,
                account.digits.reduce((a, b) => a + b)
              )
            ">
            연결하기
          </button>
        </div>
        <button
          class="btn btn-primary connect-btn"
          @click="toogleHandleAccount()">
          나가기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      handleAccount: true,
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    allAccount: function () {
      return this.$store.state.account.allAccount
    },
    currentAccounts: function () {
      return this.$store.state.account.currentAccounts
    },
    userImg: function () {
      return this.$store.state.auth.user.img
    },
  },
  created() {
    this.$store.dispatch('account/getAllAccount')
    this.$store.dispatch('account/getCurrentAccounts')
  },
  methods: {
    toogleHandleAccount() {
      this.handleAccount = !this.handleAccount
    },
    pushProfileChange() {
      this.$router.push('/profilechange')
    },
    async connectAccount(bankCode, accountNumber) {
      await this.$store.dispatch('account/connectAccount', {
        bankCode,
        accountNumber,
      })
      await this.$store.dispatch('account/getAllAccount')
      await this.$store.dispatch('account/getCurrentAccounts')
    },
    async disConnectAccount(accountId) {
      await this.$store.dispatch('account/disConnectAccount', accountId)
      await this.$store.dispatch('account/getAllAccount')
      await this.$store.dispatch('account/getCurrentAccounts')
    },
    async logOut() {
      await this.$store.dispatch('auth/logOut')
      await this.$store.dispatch('auth/deleteAdminInfo')
      this.$router.push('/login')
    },
    ...mapActions('auth', ['authenticationCheck']),
  },
}
</script>

<style lang="scss">
.my-page-top {
  display: flex;
  margin: 3rem 1rem;
  padding: 3rem 1rem;
  justify-content: center;
  align-items: center;
  background: var(--color-mypage-box);
  border-radius: 1rem;
  h3 {
    font-size: 1.5rem;
  }
}
.profile {
  width: 60%;
  display: flex;
  padding: 1rem;
  border-right: 1px solid black;
  &__img {
    flex-shrink: 1;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 200px;
    img {
      width: 100%;
    }
  }
  &__info {
    text-align: center;
    white-space: nowrap;
    flex-grow: 1;
  }
}

.logout-btn {
  margin-bottom: 0.5rem;
  display: block;
  margin: auto;
  margin-bottom: 1rem;
}
.modify-btn {
  display: block;
  margin: auto;
  margin-bottom: 1rem;
}
.account {
  width: 40%;
}

.current-account-list {
  text-align: center;
}

.account-title {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.current-account {
  margin-bottom: 0.7rem;
}
.connect-btn {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
.all-account-list {
  text-align: center;
}

.all-account {
  margin-bottom: 0.7rem;
}

.account-disabled-true {
  color: red;
  font-weight: 900;
  margin-left: 1rem;
}

@media screen and (max-width: 1024px) {
  .my-page-top {
    flex-flow: column;
  }
}
</style>
