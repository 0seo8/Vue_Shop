<template>
  <div class="breadcrumbs container">
    <ul>
      <li @click="$router.push('/')">
        홈 >
      </li>
      <li> 마이 페이지</li>
    </ul>
  </div>
  <section class="container">
    <div class="mypage-container">
      <div class="sticky-container">
        <div class="sticky-child">
          <div class="box">
            <div>
              <div class="copy_link">
                <div class="drop-down">
                  <button
                    type="button"
                    aria-pressed="false"
                    @click="copyUrl">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="var(--color-text-base)"
                      preserveAspectRatio="xMidYMid meet"><path d="M9.64 14.646a4.5 4.5 0 1 1 0-5.292l4.54-2.476a4.5 4.5 0 1 1 .63.795l-4.675 2.55c.235.545.365 1.146.365 1.777s-.13 1.232-.365 1.777l4.675 2.55a4.5 4.5 0 1 1-.63.795l-4.54-2.476zM18 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM6 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM18 23a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="main-area">
                <div class="profile-img">
                  <img
                    v-if="!user.profileImg"
                    srcset="https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?gif=1&amp;w=240&amp;h=240&amp;c=c&amp;webp=1 1.5x,https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?gif=1&amp;w=320&amp;h=320&amp;c=c&amp;webp=1 2x,https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?gif=1&amp;w=480&amp;h=480&amp;c=c&amp;webp=1 3x">
                  <img
                    v-else
                    :src="user.profileImg">
                </div>
                <div class="profile-desc">
                  <div class="greeting">
                    안녕하세요
                  </div>
                  <div class="title">
                    {{ user.displayName }} 님
                    <div class="sub">
                      <span
                        class="material-symbols-outlined setting"
                        @click="$router.push('/profilechange')">
                        settings
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sub-area">
              <div class="links">
                <div
                  class="link"
                  @click="$router.push('/orderlist')">
                  <span class="material-symbols-outlined">
                    history
                  </span>
                  <div>거래내역</div>
                </div>
                <div
                  class="link"
                  @click="toogleHandleAccount()">
                  <span class="material-symbols-outlined">
                    savings
                  </span>
                  <div>계좌연결</div>
                </div>
                <div
                  class="link"
                  @click="logOut()">
                  <span class="material-symbols-outlined">
                    logout
                  </span>
                  <div>
                    로그아웃
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mypage-container">
      <div class="sticky-container">
        <div class="sticky-child">
          <div class="box">
            <table class="table">
              <thead>
                <tr>
                  <th
                    v-for="head in heads"
                    :key="head"
                    scope="col">
                    {{ head }}
                  </th>
                </tr>
              </thead>
              <tbody v-if="handleAccount">
                <tr
                  v-for="currentAccount in currentAccounts.accounts"
                  :key="currentAccount.id">
                  <td>{{ currentAccount.bankName }}</td>
                  <td> {{ currentAccount.balance.toLocaleString("ko-KR") }}원</td>
                  <td>
                    <button
                      class="btn btn-primary connect-btn"
                      @click="toogleHandleAccount()">
                      연결
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr
                  v-for="account in allAccount"
                  :key="account.name">
                  <td> {{ account.name }}</td>
                  <td>3,000,000원</td>
                  <td>
                    <span
                      v-if="account.disabled"
                      class="account-disabled-true">
                      연결완료
                    </span>
                    <span
                      v-else
                      class="account-disabled-false btn btn-primary"
                      @click="
                        connectAccount(
                          account.code,
                          account.digits.reduce((a, b) => a + b)
                        )
                      ">
                      연결
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      handleAccount: true,
      heads : ['은행', '잔액', '연결해제']
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
    copyUrl () {
    const value = window.document.location.href
    const outputValue = value.slice(0, -7)
    navigator.clipboard.writeText(outputValue).then(() =>{
      confirm('주소가 복사되었습니다')
    })
    }
  },
  
}
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-flow: column;
  align-items: center;
}
.mypage-container {
  max-width: 900px;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  padding-top: 2rem;
  padding-left: 7.5px;
  padding-right: 7.5px;
  .sticky {
    &-container {
    position: sticky;
    top: 81px;
    transition: top 0.1s ease 0s;
    }
    &-child {
      position: relative;
    }
  }
  .box {
    position: relative;
    padding: 30px 25px 18px;
    border-radius: 4px;
    border: 1px solid rgb(218, 220, 224);
    box-shadow: rgb(63 71 77 / 6%) 0px 2px 4px 0px;
    background-color: var(--color-info-bg);
    color: var(--color-text-base);
    .copy_link {
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: flex;
      align-items: flex-end;
      z-index: 1;
      .drop-down {
        position: relative;
        display: inline-block;
        button {
          display: inline-block;
          margin: 0px;
          padding: 0px;
          border: none;
          background: none;
          font-style: inherit;
          font-variant: inherit;
          font-weight: inherit;
          font-stretch: inherit;
          line-height: inherit;
          font-family: inherit;
          font-size: 24px;
        }
      }
    }
    .main-area {
      position: relative;
      min-height: 84px;
      box-sizing: border-box;
      margin: 0px 0px 20px;
      padding-left: 140px;
      .profile {
        &-img {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 84px;
        height: 84px;
        margin: 0px 20px 0px 0px;
        border-radius: 100%;
        background-color: rgb(237, 237, 237);
        overflow: hidden;
           img {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            transform: translate(-50%, -50%);
              &::after {
              content: "";
              display: block;
              position: absolute;
              top: 0px;
              left: 0px;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: 1px solid rgba(0, 0, 0, 0.07);
              border-radius: 100%;
            }
          }
        }
        &-desc {
        text-align: left;
          .greeting {
            margin: 0px 10px 0px 10px;
            color: var(--color-gray-900);
            font-size: 20px;
            margin-bottom: 10px;
          }
          .title {
            display: flex;
            margin: 0px 10px 0px 10px;
            font-weight: bold;
            font-size: 26px;
            line-height: 1.2;
            overflow-wrap: break-word;
            word-break: break-all;
            .setting {
              margin-left: 10px;
              cursor: pointer;
            }
          }
          .sub {
            text-align: left;
          }
        }
      }

    }
    .sub-area {
      border-top: 1px solid rgb(234, 235, 239);
      padding: 22px 12px 0px;
      .links {
        display: flex;
        .link {
          padding: 0px 16px;
              flex: 1 0 0px;
              display: block;
              min-width: 0px;
              box-sizing: border-box;
              text-align: center;
              padding: 18px 16px 14px;
              transition: opacity 0.1s ease 0s;
              cursor: pointer;
              &:hover {
                color: $primary;
              }
          div {
            margin: 0px auto 4px;
          }
        }
      }
    }
  }
}
.table {
  white-space: nowrap;
  text-align: center;
  color: var(--color-text-base);
}



@media screen and (max-width: 380px) {
  .container .box {
    .main-area {
      min-height: 120px;
      padding: 0;
      .profile {
        &-img {
        width: 84px;
        height: 84px;
        position: relative;
        margin: 0px auto 24px;
        }
        &-desc {
        text-align: center;
          .title {
            margin: 0px 0px 10px;
            font-size: 20px;
          }
          .sub {
            text-align: center;     a {
                padding-left: 16px;
              padding-right: 16px;
              margin-right: 6px;
              font-weight: normal;
              font-size: 12px;
            }
          }
        }
      }
    }
    .sub-area {
      padding: 24px 0px 6px;
      .links {
        .link {
          padding: 0;
        }
      }
    }
  } 
  .table {
    font-size: 16px;
    .mypage-container .box {
      padding: 30px 18px 18px;
    }
  }
}
</style>
