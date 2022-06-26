<template>
  <TheHeader />
  <div class="section">
    <RouterView />
  </div>
</template>
<script>
import TheHeader from '~/components/layouts/TheHeader.vue'
export default {
    components: { TheHeader }
}
</script>

<style lang="scss"> 
  section {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 100px 0;
  }
</style>

