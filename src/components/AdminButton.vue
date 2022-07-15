<template lang="">
  <div
    class="btn-group"
    role="group"
    aria-label="Basic example">
    <button
      class="btn btn-primary btn-sm">
      <RouterLink to="/admin">
        <span>대시보드</span>
      </RouterLink>
    </button>
    <button class="btn btn-primary btn-sm">
      <RouterLink to="/admin/add-product">
        <span>제품추가</span>
      </RouterLink>
    </button>
    <button class="btn btn-primary btn-sm">
      <RouterLink to="/admin/product-list">
        <span>제품목록</span>
      </RouterLink>
    </button>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.btn-group {
  padding: 0 0 0.5rem 0.5rem; 
  a {
    text-decoration: none;
    color: var(--color-white);
  }
}
</style>
