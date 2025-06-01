<template>
  <div>A Component props event ： {{ count }}</div>
  <div style="margin-top: 8px;">
    <a @click="changeGlobal">Global is performed within subcomponent A </a>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from 'vue'

  import { useEventEmitter } from 'vue-hooks-plus'
  import { EventEmitter } from 'vue-hooks-plus/src/useEventEmitter/event'

  const event_ = useEventEmitter({ global: true })
  const props = defineProps<{
    event: EventEmitter<any>
  }>()
  const count = ref(0)

  let unsubscribe: (() => void) | null = null

  onMounted(() => {
    unsubscribe = props.event.subscribe('change', () => {
      console.log('props', props.event)
      count.value += 1
    })
  })
  onUnmounted(() => {
    if (unsubscribe) unsubscribe()
  })

  const changeGlobal = () => {
    event_.emit('change')
  }
</script>
