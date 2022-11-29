<template>
  <div>
    <p>{{ JSON.stringify(scroll) }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { useScroll } from 'vue-hooks-plus'
  const scroll = useScroll(document)
</script>
