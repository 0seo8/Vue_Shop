<template>
  <div class="wrap">
    <table>
      <colgroup>
        <col width="800">
        <col width="">
      </colgroup>
      <tbody>
        <tr>
          <td class="td1">
            <div class="title">
              <span
                v-if="purchase.done"
                class="isdone">구매확정</span>
              <span
                v-else
                class="isdone">확정대기</span>
              <span class="SWzAJ">
                <span
                  size="4"
                  class="sc-13xhsmd-1 kMeFyN" />
              </span>
              <span class="date"> {{ getdate }} 주문 </span>
            </div>
            <div class="content">
              <div class="img__box">
                <a>
                  <img
                    :src="purchase.product.thumbnail"
                    :alt="purchase.product.title">
                </a>
              </div>
              <div class="info">
                <div class="info__box">
                  <a>
                    <span
                      class="title"
                      @click="
                        $router.push(`/product/${purchase.product.productId}`)
                      ">{{ purchase.product.title }}</span>
                  </a>
                  <div class="info__desc">
                    <div>
                      <span class="price">{{
                        purchase.product.price.toLocaleString("ko-KR")
                      }}
                        원</span>
                    </div>
                    <div>
                      <button
                        class="btn btn-outline-info repurchase"
                        @click="
                          $router.push(`/product/${purchase.product.productId}`)
                        ">
                        재구매하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td class="td2">
            <div class="button__box media-lg">
              <button
                :disabled="purchase.done || purchase.isCanceled"
                class="btn btn-outline-primary"
                @click="$emit('confirm', purchase.detailId)">
                구매확정
              </button>
              <button
                :disabled="purchase.done || purchase.isCanceled"
                class="btn btn-outline-success"
                @click="$emit('cancel', purchase.detailId)">
                구매취소
              </button>
            </div>
            <div class="button__box media-sm">
              <button 
                class="btn btn-outline-primary"
                :disabled="purchase.done || purchase.isCanceled"
                @click="$emit('confirm', purchase.detailId)">
                <span
                  class="material-symbols-outlined">
                  check
                </span>
              </button>
              <button
                class="btn btn-outline-success"
                :disabled="purchase.done || purchase.isCanceled"
                @click="$emit('cancel', purchase.detailId)">
                <span
                  class="material-symbols-outlined">
                  close
                </span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    purchase: {
      type: Object,
      required: true,
    },
  },
  emits: ['cancel', 'confirm'],
  computed: {
    getdate() {
      return dayjs(this.purchase.timePaid).format('YY년 MM월 DD일')
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  border-radius: 8px;
  border: 1px solid var( --color-gray-100);
  background-color: var(--color-background-bg);
  margin-top: 16px;
}

.td1 {
  height: 100%;
  padding: 20px;
  vertical-align: top;
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    line-height: 1.5;
    cursor: pointer;
    .isdone {
      font-size: 1.2rem;
      font-weight: bold;
      color: var(--color-gray-800);
      margin-left: 1rem;
    }
    .SWzAJ {
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 4px;
      height: 1em;
      vertical-align: middle;
      margin-left: 6px;
      margin-right: 6px;
      .kMeFyN {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: var(--color-gray-900);
        opacity: 0.2;
      }
    }
    .date {
      font-size: 1rem;
      font-weight: normal;
      color: var(--color-green);
    }
  }
  .content {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    .img__box {
      display: flex;
      position: relative;
      margin-right: 16px;
      > a {
        width: 64px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .info {
      user-select: none;
      overflow: hidden;
      flex: 1 1 0%;
      display: flex;
      &__box {
        display: flex;
        flex: 1 1 0%;
        user-select: none;
        min-width: 0px;
        flex-direction: column;
        justify-content: center;
        .title {
          margin-bottom: 4px;
        }
      }
      &__desc {
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 1.5;
        .price {
          font-size: 1rem;
          font-weight: normal;
          color: var(--color-gray-600);
        }
      }
    }
  }
}

.td2 {
  width: 200px;
  height: 100%;
  text-align: center;
  border-left: 1px solid var(--color-gray-100);
  .button__box {
    display: flex;
    flex-flow: column wrap;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
}

.btn-outline {
  &-primary:disabled {
    color: rgba(var(--color-pirmary), 0.3);
    &:hover {
      color: #fff;
    }
  }
}

.td2 .button__box {
  &.media-sm {
    display: none;
    padding: 0;
  }
  &.media-lg {
    padding: 0;
  }
}

@media (max-width: 650px) {
  .td1 {
    .title {
      .isdone {
        font-size: 1rem;
        margin-left: 0;
      }
      .date {
        font-size: .8rem;
      }
    }
    .content {
      font-size: .8rem;
      .info__desc {
        .price{
          font-size: .8rem;
        }
      }
      .repurchase {
        display: none;
      }
    }

  }
  .td2 {
      padding: .5remrem;
      .button__box {
      &.media-sm {
        display: flex;
        button {
        padding:.3rem;
        }
      }
      &.media-lg {
        display: none;
        button {
        padding:.3rem;
        }
      }
    }
  }
}
</style>
