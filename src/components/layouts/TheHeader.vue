<template>
  <div class="header">
    <div class="header-side">
      <span
        class="material-symbols-outlined side-menu"
        @click="activatedCategory"
      >
        menu
      </span>
      <h1>
        <RouterLink to="/">
          <span class="logo">Eletron Market</span>
        </RouterLink>
      </h1>
    </div>
    <ul ref="categoryBox" class="nav nav-pills category__list">
      <li v-for="nav in navigations" :key="nav.name" class="cotegory__item">
        <RouterLink
          :to="{
            name: 'product',
            params: { category: nav.name },
          }"
          class="nav-link"
        >
          <span>{{ nav.name }}</span>
        </RouterLink>
      </li>
    </ul>
    <div class="button__list">
      <button
        v-if="findAdmin"
        class="btn btn-primary admin"
        @click="$router.push('/admin')"
      >
        admin
      </button>
      <ul class="darkmode" @click="theme">
        <li v-if="!nightmode" class="material-symbols-outlined">light_mode</li>
        <li v-else class="material-symbols-outlined">dark_mode</li>
      </ul>
      <div class="drop-down">
        <button>
          <span
            class="material-symbols-outlined search-icon"
            @click="activatedSearch"
          >
            search
          </span>
        </button>
        <input
          ref="searchInput"
          v-model="searchText"
          class="form-control"
          placeholder="검색"
          @focus="$router.push({ name: 'search' })"
        />
      </div>
      <span
        v-if="logined"
        class="material-symbols-outlined"
        @click="$router.push('/mypage')"
      >
        person_outline
      </span>
      <button
        v-else
        class="btn btn-primary login"
        @click="$router.push('/login')"
      >
        로그인
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  emits: ["theme"],
  data() {
    return {
      navigations: [
        { name: "생활가전" },
        { name: "계절가전" },
        { name: "디지털" },
      ],
      searchText: "",
      nightmode: false,
    };
  },
  computed: {
    logined: function () {
      return this.$store.state.auth.logined;
    },
    findAdmin: function () {
      return this.$store.state.auth.findAdmin;
    },
  },
  watch: {
    searchText(value) {
      this.searchProducts({ searchText: value.trim() });
    },
  },
  created() {
    this.$store.dispatch("auth/findLocalStorageUser");
    this.$store.dispatch("auth/findAdmin");
  },

  methods: {
    ...mapActions("product", ["searchProducts"]),
    theme() {
      this.nightmode = !this.nightmode;
      this.$emit("theme");
    },
    activatedSearch() {
      this.$refs.searchInput.classList.toggle("active");
    },
    activatedCategory() {
      this.$refs.categoryBox.classList.toggle("active");
    },
  },
};
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
  justify-content: space-between;
  padding: 6px 12px;
  min-height: 48px;
  background-color: #fff;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
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
  gap: 1.5rem;

  .material-symbols-outlined {
    font-size: 30px;
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

  button {
    width: 2.5rem;
    display: flex;
    background-color: transparent;
  }
  .form-control {
    margin: auto 16px;
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
  li {
    position: absolute;
    left: 0;
  }
}

.side-menu {
  display: none;
}

@media (max-width: 960px) {
  .side-menu {
    display: block;
  }
  .category__list {
    display: none;
    &.active {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      flex-flow: column;
      position: absolute;
      top: 51px;
      background: #fff;
      left: 0;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    }
  }
}

@media (max-width: 650px) {
  .drop-down {
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
}
</style>
