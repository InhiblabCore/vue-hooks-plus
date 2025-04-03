<template>
  <div style="margin-top: 16px;">Global Event count： {{ globalCount }}</div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useEventEmitter } from 'vue-hooks-plus'

  const event = useEventEmitter({ global: true })
  const globalCount = ref(0)

  event.useSubscription('change', () => {
    globalCount.value += 1
  })
</script>
