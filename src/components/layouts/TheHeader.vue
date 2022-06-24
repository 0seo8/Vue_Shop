<template>
  <header>
    <RouterLink
      v-for="nav in navigations"
      :key="nav.name"
      :to="nav.path">
      <span>{{ nav.name }}</span>
    </RouterLink>
  </header>
</template>

<script>
export default {
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

<style scoped>
header {
  width: 100%;
  height: 5rem;
  border: 1px solid;
  display: flex;
  align-items: center;
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
