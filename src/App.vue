<template>
  <TheHeader />
  <div class="main__wrap">
    <RouterView />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '~/components/layouts/TheHeader.vue'
import TheFooter from '~/components/layouts/TheFooter.vue'
export default {
  components: {
    TheHeader,
    TheFooter,
  },
}
</script>

<style lang="scss">
@import '~/scss/main';

.main__wrap {
  padding-top: 49px;
}
</style>
