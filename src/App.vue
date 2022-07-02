<template lang="">
  <RouterView />
  <Footer />
</template>
<script>

import Footer from './components/Footer.vue'
export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer
  }
}
</script>

<style lang="scss"> 
@import "~/scss/_variables.scss";
body {
  font-family: 'GmarketSansMedium';
}
</style>

