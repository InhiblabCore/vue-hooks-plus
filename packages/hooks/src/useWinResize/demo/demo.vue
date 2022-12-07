<template>
  <div>Windows change count： {{ countRef }}</div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useWinResize } from 'vue-hooks-plus'

  const countRef = ref(0)
  useWinResize(() => (countRef.value += 1))
</script>
