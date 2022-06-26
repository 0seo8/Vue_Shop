<template>
  <div>
    <div>
      <input v-model="email" type="text" />
    </div>
    <div>
      <input v-model="password" type="text" />
    </div>
    <div>
      <input v-model="displayName" type="text" />
    </div>
    <button @click="signUp">회원가입!</button>
  </div>
  <div>
    <h2>모든 계좌 목록</h2>
  </div>

  <div class="account-list">
    <div v-for="account in allAccount" :key="account.name" class="account">
      {{ account.name }}
      <span v-if="account.disabled" class="account-disabled-true">
        연결완료
      </span>
      <button
        v-else
        class="account-disabled-false"
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
  </div>

  <div>
    <h2>현재 계좌 목록</h2>
    <div
      v-for="currentAccount in currentAccounts.accounts"
      :key="currentAccount.id"
    >
      {{ currentAccount.bankName }}
      {{ currentAccount.accountNumber }}
      {{ currentAccount.balance }}
      <button v-on:click="disConnectAccount(currentAccount.id)">
        연결해제
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
const { VITE_API_KEY, VITE_USERNAME } = import.meta.env;

export default {
  data: function () {
    return {
      email: "",
      password: "",
      displayName: "",
    };
  },
  computed: {
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
    async signUp() {
      const res = await fetch(
        "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            apikey: VITE_API_KEY,
            username: VITE_USERNAME,
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            displayName: this.displayName,
          }),
        }
      );
      const { accessToken } = await res.json();
      window.localStorage.setItem("token", accessToken);
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
  },
};
</script>

<style>
.account-list {
  border: 1px solid black;
}

.account-disabled-false {
  border: 1px solid red;
  cursor: pointer;
}
</style>
