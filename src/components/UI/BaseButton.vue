<template>
  <button
    :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props:{
    mode: {
      type: String,
      default:''
    }
  },
}
</script>

<style scoped lang="scss">
  button {
    padding: 0.5rem 1rem;
    font-family: inherit;
    background-color: $primary;
    border: none;
    border-radius: 30px;
    color: white;
    &:hover,
    &:active {
      cursor: pointer;
      background-color: #e03b41;
    }
    &.flat {
      background-color: transparent;
      color: #3a0061;
      border: none;
      &:hover,
      &:active {
        background-color: #edd2ff;
      }
    }
  }

</style>
