<template lang="">
  <div class="btn-group">
    <RouterLink to="/admin">
      <button class="btn btn-primary">
        대시보드
      </button>
    </RouterLink>
    <RouterLink to="/admin/add-product">
      <button class="btn btn-primary">
        제품추가
      </button>
    </RouterLink>
    <RouterLink to="/admin/product-list">
      <button class="btn btn-primary">
        제품목록
      </button>
    </RouterLink>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.btn-group {
  padding: 0 0.5rem 0.5rem 0.5rem; 
}
</style>
