<template>
  <div class="header">
    <h1>
      <RouterLink to="/">
        Eletron Market
      </RouterLink>
    </h1>
    <ul class="nav nav-pills category__list">
      <li
        v-for="nav in navigations"
        :key="nav.name"
        class="cotegory__item">
        <RouterLink
          :to="{
            name: 'product',
            params: { category: nav.name },
          }"
          class="nav-link">
          <span>{{ nav.name }}</span>
        </RouterLink>
      </li>
    </ul>
    <div class="button__list">
      <ul
        class="darkmode"
        @click="theme">
        <li    
          v-if="!nightmode"      
          class="material-symbols-outlined">
          light_mode
        </li>
        <li
          v-else
          class="material-symbols-outlined">
          dark_mode
        </li>
      </ul>
      <input
        v-model="searchText"
        class="form-control"
        placeholder="검색"
        @focus="$router.push({name: 'search'})" />
      <span
        v-if="logined"
        class="material-symbols-outlined"
        @click="$router.push('/mypage')">
        person_outline
      </span>
      <button
        v-else
        class="btn btn-primary login"
        @click="$router.push('/login')">
        로그인
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  emits: ['theme'],
  data() {
    return {
      navigations: [{ name: '생활가전' }, { name: '계절가전' }],
      searchText: '',
      nightmode: false
    }
  },
  watch: {
    searchText(value) {
     this.searchProducts({'searchText': value.trim()})
    }
  },
  methods: {
    ...mapActions('product', ['searchProducts']),
   theme() {
      this.nightmode = !this.nightmode
      this.$emit('theme')
    }    
  },
}
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";
.header {
  position: fixed;
  z-index: 10;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  min-height: 48px;
  background-color: #fff;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
    color: $primary;
    a {
      font-weight: 700;
      font-size: 20px;
      white-space: nowrap;
      text-decoration: none;
    }
  }
}

.category {
  &__list {
    flex-grow: 1;
    flex-wrap: nowrap;
    margin-left: 8px;
    white-space: nowrap;
    font-size: 14px;
    .nav-link {
      color: $color-black;
      &:hover {
        color: $color-primary;
      }
    }
  }
  &__item {
    height: 32px;
    padding: 0 12px;
    display: inline-flex;
    flex-shrink: 0;
    cursor: pointer;
    flex-wrap: wrap;
  }
}

.button__list {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 8px;
  input {
    margin: auto 16px;
    height: 28px;
  }
  .material-symbols-outlined {
    color: $color-primary;
    display: block;
    &:hover {
      cursor: pointer;
    }
  }
  .login {
    height: 30px;
    width: 80px;
    font-size: 12px;
  }
}

.darkmode {
  position: relative;
  display: block;
  height: 24px;
  width: 24px;
  li {
    position: absolute;
  }
}

</style>
