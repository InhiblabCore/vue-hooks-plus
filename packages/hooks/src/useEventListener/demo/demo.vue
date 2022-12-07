<template>
  <div>
    <div ref="divRef" style="cursor: pointer;">Click me!</div>
    <br>
    <div>click count：{{ valueRef }}</div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useEventListener } from 'vue-hooks-plus'

  const divRef = ref()
  const valueRef = ref(0)

  useEventListener(
    'click',
    () => {
      valueRef.value += 1
    },
    { target: divRef },
  )
</script>
