<template>
  <div class="my-page-top">
    <div class="profile">
      <div class="profile-image">프로필사진 : {{ userInfo.profileimg }}</div>
      <div class="profile-info">
        <p>이메일 : {{ userInfo.email }}</p>
        <p>이름 : {{ userInfo.displayName }}</p>
        <button @click="logOut()" class="btn btn-primary logout-btn">
          로그아웃!
        </button>
        <button class="btn btn-primary modify-btn" @click="pushProfileChange()">
          회원 정보 수정
        </button>
      </div>
    </div>

    <div class="account">
      <div v-if="this.handleAccount" class="current-account-list">
        <h2 class="account-title">현재 계좌 목록</h2>
        <div
          class="current-account"
          v-for="currentAccount in currentAccounts.accounts"
          :key="currentAccount.id"
        >
          {{ currentAccount.bankName }} / 잔액 :
          {{ currentAccount.balance.toLocaleString("ko-KR") }}원 /
          <button
            v-on:click="disConnectAccount(currentAccount.id)"
            class="btn btn-primary"
          >
            연결해제
          </button>
        </div>
        <button
          @click="toogleHandleAccount()"
          class="btn btn-primary connect-btn"
        >
          계좌 연결하기
        </button>
      </div>

      <div v-else class="all-account-list">
        <h2 class="account-title">모든 계좌 목록</h2>

        <div
          v-for="account in allAccount"
          :key="account.name"
          class="all-account"
        >
          {{ account.name }}
          <span v-if="account.disabled" class="account-disabled-true">
            연결완료
          </span>
          <button
            v-else
            class="account-disabled-false btn btn-primary"
            v-on:click="
              connectAccount(
                account.code,
                account.digits.reduce((a, b) => a + b)
              )
            "
          >
            연결하기
          </button>
        </div>
        <button
          @click="toogleHandleAccount()"
          class="btn btn-primary connect-btn"
        >
          나가기
        </button>
      </div>
    </div>
  </div>

  <OrderList />
</template>

<script>
import OrderList from "./product/OrderList.vue";

export default {
  components: {
    OrderList,
  },
  data() {
    return {
      handleAccount: true,
    };
  },
  computed: {
    userInfo: function () {
      return JSON.parse(window.localStorage.getItem("user"));
    },
    allAccount: function () {
      return this.$store.state.account.allAccount;
    },
    currentAccounts: function () {
      return this.$store.state.account.currentAccounts;
    },
  },
  created() {
    this.$store.dispatch("account/getAllAccount");
    this.$store.dispatch("account/getCurrentAccounts");
  },
  methods: {
    toogleHandleAccount() {
      this.handleAccount = !this.handleAccount;
    },
    pushProfileChange() {
      this.$router.push("/profilechange");
    },
    async connectAccount(bankCode, accountNumber) {
      await this.$store.dispatch("account/connectAccount", {
        bankCode,
        accountNumber,
      });
      await this.$store.dispatch("account/getAllAccount");
      await this.$store.dispatch("account/getCurrentAccounts");
    },
    async disConnectAccount(accountId) {
      await this.$store.dispatch("account/disConnectAccount", accountId);
      await this.$store.dispatch("account/getAllAccount");
      await this.$store.dispatch("account/getCurrentAccounts");
    },
    async logOut() {
      await this.$store.dispatch("auth/logOut");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.my-page-top {
  display: flex;
  border: 1px solid black;
}
.profile {
  width: 60%;
  display: flex;
  padding: 1rem;
  border-right: 1px solid black;
}
.profile-image {
  width: 50%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0 auto;
}

.profile-info {
  width: 50%;
  text-align: center;
  padding-top: 25%;
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
</style>
