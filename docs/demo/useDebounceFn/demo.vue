<template>
  <div>
    <div>Click Count：{{ valueRef }}</div>
    <vhp-button @click="() => run()">Click me!</vhp-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useDebounceFn } from 'vue-hooks-plus'
  const valueRef = ref(0)

  const { run } = useDebounceFn(
    () => {
      valueRef.value += 1
    },
    {
      wait: 1000,
    },
  )
</script>
