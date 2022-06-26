<template>
  <div>
    <div class="swiper">
      상품 스와이퍼 영역
    </div>
    <MainProductList />
  </div>
</template>
<script>
import MainProductList from '~/components/layouts/MainProductList.vue'
export default {
  components: {
    MainProductList
  }
}
</script>

<style lang="scss">
  .swiper{
    width: 100%;
    height: 700px;
    border: 1px solid black;
  }
</style>
