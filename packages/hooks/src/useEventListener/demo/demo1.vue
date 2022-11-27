<template>
  <div>
    <div>窗口尺寸改变：{{ valueRef }}</div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useEventListener } from 'vue-hooks-plus'

  const valueRef = ref(0)

  useEventListener('resize', () => {
    valueRef.value += 1
  })
</script>
