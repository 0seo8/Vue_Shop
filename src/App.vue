<template>
  <TheHeader
    v-if="!$route.meta.hideNavigation"
    @theme="theme" />
  <div class="main__wrap">
    <RouterView />
    <div
      v-if="isLoading"
      class="spinner-border text-danger"
      role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TheHeader from '~/components/layouts/TheHeader.vue'
import TheFooter from '~/components/layouts/TheFooter.vue'
export default {
  components: {
    TheHeader,
    TheFooter,
  },
  computed: {
    ...mapState('product', ['isLoading']),
  },
  methods: {
    theme() {
      let body = document.querySelector('body')
      body.classList.toggle('nightmode')
    },
  },
}
</script>

<style lang="scss">
@import "~/scss/main";

.main__wrap {
  padding-top: 50px;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  position: absolute;
  top: 45%;
  right: 49%;
}
</style>
