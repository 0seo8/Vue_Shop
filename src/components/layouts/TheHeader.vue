<template>
  <div class="header">
    <div class="header-side">
      <span
        class="material-symbols-outlined side-menu"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvas"
        aria-controls="offcanvasExample"
        @click="activatedCategory">
        menu
      </span>
      <div
        id="offcanvas"
        class="offcanvas offcanvas-start"
        tabindex="-1"
        aria-labelledby="offcanvasLabel">
        <div class="position-relative offcanvas-header">
          <button
            type="button"
            class="btn-close position-absolute top-1 end-1"
            data-bs-dismiss="offcanvas"
            aria-label="Close" />
        </div>
        <div
          class="offcanvas-body">
          <h4>Category</h4>
          <ul
            ref="categoryBox"
            class="nav nav-pills flex-column">
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
        </div>
      </div>
      <h1>
        <RouterLink
          to="/"
          class="logo">
          <Logo
            class="logo__img" />
          <span class="logo__title">Eletron Market</span>
        </RouterLink>
      </h1>
    </div>
    <ul
      ref="categoryBox"
      class="nav nav-pills category__list">
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
      <button
        v-if="findAdmin"
        class="btn btn-primary admin"
        @click="$router.push('/admin')">
        <span class="admin_btn">adimin</span>
        <span class="admin_btn_m">Ad</span>
      </button>
      <ul
        class="darkmode"
        aria-label="Toggle themes"
        @click="toggleTheme">
        <li
          v-if="theme == 'darkMode'"
          class="material-symbols-outlined">
          light_mode
        </li>
        <li
          v-else
          class="material-symbols-outlined">
          dark_mode
        </li>
      </ul>
      <div class="drop-down">
        <button>
          <span
            class="material-symbols-outlined search-icon"
            @click="activatedSearch">
            search
          </span>
        </button>
        <input
          ref="searchInput"
          v-model="searchText"
          class="form-control"
          placeholder="검색"
          @focus="$router.push({ name: 'search' })">
      </div>
      <span
        v-if="user.email"
        class="material-symbols-outlined"
        @click="$router.push('/mypage')">
        person_outline
      </span>
      <button
        v-else
        class="btn btn-primary login"
        @click="$router.push({name: 'login'})">
        로그인
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Logo from '~/components/layouts/Logo.vue'
export default {
  components: {
    Logo,
  },
  // emits: ['theme'],
  data() {
    return {
      navigations: [
        { name: '생활가전' },
        { name: '계절가전' },
        { name: '디지털' },
      ],
      searchText: '',
      theme: 'lightMode',
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    findAdmin: function () {
      return this.$store.state.auth.findAdmin
    },
  },
  watch: {
    searchText(value) {
      this.searchProducts({ searchText: value.trim() })
    },
  },
  mounted() {
    let localTheme = localStorage.getItem('theme')
    if(localTheme) {
      document.documentElement.setAttribute('data-theme', localTheme)  
      this.theme = localTheme   
    } else {
      document.documentElement.setAttribute('data-theme', this.theme)
      window.localStorage.setItem('theme', this.theme)
    }
  },
  created() {
    this.$store.dispatch('auth/authenticationCheck')
  },

  methods: {
    ...mapActions('auth', ['authenticationCheck']),
    ...mapActions('product', ['searchProducts']),
    toggleTheme() {
      this.theme = this.theme == 'darkMode' ? 'lightMode' : 'darkMode'
      localStorage.setItem('theme', this.theme)
      document.documentElement.setAttribute('data-theme', this.theme)
    },
    activatedSearch() {
      this.$refs.searchInput.classList.toggle('active')
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 10;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  min-height: 56px;
  color: var(--color-text-base);
  background-color: var(--color-header-bg);
  box-shadow: 0 10px 15px -3px var(--color-shawdow-100), 0 4px 6px -4px var(--color-shawdow-100);
  .header-side {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
    color: var(--color-pirmary);
    a {
      font-weight: 700;
      font-size: 20px;
      white-space: nowrap;
      text-decoration: none;
      display: flex;
      align-items: center;
    }
    .logo__title {
      margin-left: 0.5rem;
    }
  }
}

#offcanvas {
  width: 250px;
  background-color: var(--color-info-bg);
  color: var(--color-text-base);
  .offcanvas-body {
    h4 {
      padding: 8px 16px;
      color: $primary;
      font-weight: bold;
    }
  }
  a {
    color: inherit;
  }
}

.category {
  &__list {
    flex-grow: 1;
    flex-wrap: nowrap;
    margin-left: 8px;
    white-space: nowrap;
    font-size: 1rem;
    .nav-link {
      color: var(--color-text-base);
      &:hover {
        color: var(--color-pirmary);
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

  .material-symbols-outlined {
    font-size: 30px;
    color: var(--color-pirmary);
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

  .admin {
    height: 30px;
    width: 80px;
    font-size: 12px;
    margin-right: 10px;
  }
}

.drop-down {
  position: relative;
  display: inline-block;
  margin: 0 1rem;
  padding-left: 1.5rem;

  button {
    width: 2.5rem;
    display: flex;
    background-color: transparent;
  }
  .form-control {
    margin-left: 8px;
    height: 36px;
  }
  .search-icon {
    display: none;
  }
}

.darkmode {
  position: relative;
  display: flex;
  align-items: center;
  z-index: 2;
  li {
    position: absolute;
    left: 0;
  }
}

.side-menu {
  display: none;
  cursor: pointer;
}
.btn-close {
  right: 1rem;
  top: 1rem;
}
.admin_btn_m {
  display: none;
}

button {
  border: 0;
}

@media (max-width: 960px) {
  .side-menu {
    display: block;
    cursor: pointer;
  }
  .category__list {
    display: none;
  }
}

@media (max-width: 650px) {
  .header .header-side {
    gap: 0;
  }
  .button__list {
    gap: 0;
  }
  .drop-down {
    padding-left: 0;
    .form-control {
      display: none;
      position: fixed;
      left: 0;
      border-radius: 0;
      margin: 0;
      &.active {
        display: block;
      }
    }

    .search-icon {
      display: block;
      margin-left: 1rem;
    }
  }
  .logo .logo__img {
    display: none;
    
  }
  .btn {
    width: fit-content;
    padding: .5rem;
    .admin_btn {
        display: none;
      &_m {
        display: block;
    }
  }
  }
  .logo__title {
    font-size: 1.1rem;
  }

}
</style>
