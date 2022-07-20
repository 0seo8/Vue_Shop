<template>
  <div class="not-found">
    <div class="status">
      404
    </div>
    <div class="message">
      Page Not Found!
    </div>
    <button
      class="btn btn-primary"
      @click="$router.push('/')">
      Home
    </button>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  line-height: 1.2;
  text-align: center;
  padding: 80px 20px;
  .status {
    font-size: 160px;
    color: var(--color-pirmary);
  }
  .message {
    font-size: 50px;
  }
  .btn {
    margin-top: 40px;
  }
}
</style>
