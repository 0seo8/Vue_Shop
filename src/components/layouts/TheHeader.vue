<template>
  <header>
    <Logo />
    <ul class="nav nav-pills">
      <li
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink     
          :to="nav.path"
          active-class="active"
          class="nav-link">
          <span>{{ nav.name }}</span>
        </RouterLink>
      </li>
    </ul>
  </header>
</template>

<script>
import Logo from '~/components/layouts/Logo.vue'
export default {
  components: {
    Logo
  }, 
  data() {
    return {
      navigations: [
        {path: '/', name:'Home '},
        {path: '/login', name:'LOGIN '},
         {path: '/admin', name:'ADMIN '},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 5rem;
  border: 1px solid;
  display: flex;
  align-items: center;
  .logo {
    width: 64px;
    .logo__img {
      width: 100%;
    }
  }
}

a {
  text-decoration: none;
  font: inherit;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

a:hover,
a:active,
a.active {
  color: #f1a80a;
}
</style>
