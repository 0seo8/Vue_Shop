<template>
  <TheHeader />
  <RouterView />
</template>
<script>
import TheHeader from '~/components/layouts/TheHeader.vue'
export default {
    components: { TheHeader }
}
</script>


<style>
body {
  line-height: 1.4;
  font-family: 'Roboto', sans-serif;  
}
</style>

<style lang="scss">
@import "~/scss/main";
</style>
