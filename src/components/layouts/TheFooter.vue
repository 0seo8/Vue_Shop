<template lang="">
  <footer>
    <Logo />
    <a href="https://github.com/cham9994/team5" target="_blank">
      (c){{ dateYear }} Team5
    </a>
  </footer>
</template>
<script>
import Logo from "./Logo.vue";
export default {
  components: {
    Logo,
  },
  data() {
    return {
      dateYear: new Date().getFullYear(),
    };
  },
};
</script>
<style lang="scss" scoped>
footer {
  padding: 70px 0;
  text-align: center;
  opacity: 0.3;
  .logo {
    display: block;
    margin-bottom: 4px;
  }
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      margin: 0;
      padding-right: 8px;
    }
  }
}
</style>

