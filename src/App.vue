<template>
  <TheHeader
    v-if="!$route.meta.hideNavigation" /> 
  <div class="main__wrap">
    <RouterView />
    <teleport to="body">
      <div
        v-if="isLoading"
        class="spinner-border text-danger"
        role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </teleport>
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
    ...mapState(['isLoading']),
  },
}
</script>

<style lang="scss">
.main__wrap {
  padding-top: 56px;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  position: absolute;
  top: 45%;
  right: 49%;
}

.breadcrumbs {
  padding-top: 3rem;
  margin-bottom: 1.5rem;
  margin-top: 1rem;
  ul {
    display: flex;
    li:not(:first-child) {
      padding-left: .5rem;
    }
  li {
      cursor: pointer;
    }  
  }
}
@media screen and (max-width: 650px) {
  .breadcrumbs {
    padding-top: 2.5rem;
  }
}

@media screen and (max-width: 380px) {
  .breadcrumbs {
    padding-top: 1rem;
    margin-bottom: .5rem;
    margin-top: .5rem;
    ul {
      font-size: .8rem;
    }
  }
}

</style>
