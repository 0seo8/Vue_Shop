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
@import "~/scss/variables.scss";

.main__wrap {
  padding-top:49px;
}

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
  list-style: none;
}

button {
  border: 0;
}
  
</style>
