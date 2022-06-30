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
@import "~/scss/main";

body {
  line-height: 1.4;
  font-family: 'Roboto', sans-serif;  
}

a {
  color: inherit;
  text-decoration: none;
}

  
</style>
