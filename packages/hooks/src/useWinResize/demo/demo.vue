<template>
  <div>Windows尺寸变化 {{ countRef }} 次</div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useWinResize } from 'vue-hooks-plus'

  const countRef = ref(0)
  useWinResize(() => (countRef.value += 1))
</script>
