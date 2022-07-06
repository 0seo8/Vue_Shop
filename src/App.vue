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
    TheFooter
  }

}
</script>


<style lang="scss">
@import '~/scss/variables';

.main__wrap {
  padding-top:49px;
}

body {
  font-family: 'GmarketSansMedium';
  .swal2-title {
    font-size: 1.5rem !important;
    span {
      color: $color-primary;
    }
  }
  .swal2-html-container {
    font-size: 1rem;
  }
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
