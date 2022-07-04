<template>
  <TheHeader />
  <RouterView />
  <TheFooter />
</template>

<script>
import TheHeader from '~/components/layouts/TheHeader.vue'
import TheFooter from '~/components/layouts/TheFooter.vue'
export default {
  components: {
    TheHeader,
    TheFooter
  }

}
</script>


<style lang="scss">
@import "~/scss/_variables.scss";

body {
  font-family: 'GmarketSansMedium';
}

a {
  color: inherit;
  text-decoration: none;
}

ol, ul, li {
  margin:0;
  padding: 0;
}

button {
  border: 0;
}
  
</style>
