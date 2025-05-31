<template>
  <div style="margin-top: 16px;">Global Event count： {{ globalCount }}</div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useEventEmitter } from 'vue-hooks-plus'

  const event = useEventEmitter({ global: true })
  const globalCount = ref(0)

  event.subscribe('change', () => {
    console.log('global', event)
    globalCount.value += 1
  })
</script>
