<template>
  <TheHeader @theme="theme" />
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
  methods: {
   theme() {
      let body = document.querySelector('body')
      body.classList.toggle('nightmode')
    }  
  }
}
</script>

<style lang="scss">
@import '~/scss/main';

body {
  background-color: #fff;
  color: #000;
  transition: background-color 2s;
  &.nightmode {
  background-color: #000;
  color: #fff;    
  }
}

.main__wrap {
  padding-top: 49px;
}
</style>
