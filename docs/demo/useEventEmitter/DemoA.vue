<template>
  <div>A Component props event ： {{ count }}</div>
  <div style="margin-top: 8px;">
    <a @click="changeGlobal">Global is performed within subcomponent A </a>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useEventEmitter } from 'vue-hooks-plus'

  const event = useEventEmitter({ global: true })
  const props = defineProps<{
    event: any
  }>()
  const count = ref(0)

  props.event.useSubscription('change', () => {
    count.value += 1
  })

  const changeGlobal = () => {
    event.emit('change')
  }
</script>
