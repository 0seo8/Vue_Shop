<template>
  <teleport to="body">
    <div @click="$emit('close')"></div>
    <dialog open>
      <header>
        <slot name="header">
          <h3>{{ title }}</h3>
        </slot>
      </header>
      <section>
        <slot></slot>
      </section>
      <menu>
        <slot name="actions">
          <button
            class="btn"
            @click="$emit('close')"></button>
        </slot>
      </menu>
    </dialog>
  </teleport>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    },
    emits: ['close']
}
</script>

<style lang="scss" scoped>
div {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
}
  dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  header {
    background-color: rgba(#F2555A, .8);
    color: white;
    width: 100%;
    h3 {
      margin: 0;
      padding: 1rem;
      text-align: center;
    }
  }
  section {
    padding: 1rem;
  }
  menu {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    margin: 0;
  }
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
