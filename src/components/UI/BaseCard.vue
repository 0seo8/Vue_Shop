<template>
  <div
    :class="mode">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  div{
    width: 100%;
    height: 300px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    transition: 0.3s ease box-shadow;
    box-shadow: 0px 0px 10px 2px #00000042;    
  &:hover {
      box-shadow: 0px 0px 20px 3px #00000042;    
  }
}
</style>
