<template>
  <div>
    <h2>{{ title }}</h2>
    <RouterLink to="id" />
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    title: {
      type: String,
      required: true
    },
  },
}
</script>
