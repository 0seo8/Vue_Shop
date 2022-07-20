<template>
  <MainSection />
  <RouterView />
</template>
<script>
import MainSection from '~/components/layouts/MainSection.vue'
export default {
  components: {
    MainSection,
  },
}
</script>

<style lang="scss"></style>
