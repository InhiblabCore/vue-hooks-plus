<template>
  <div>
    <div>Click Count：{{ valueRef }}</div>
    <br />
    <vhp-button @click="() => (wait = 3000)">Update time 3000ms</vhp-button>
    <vhp-button style="margin-left: 8px;" @click="() => run()">Click me!</vhp-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useDebounceFn } from 'vue-hooks-plus'
  const valueRef = ref(0)

  const wait = ref(1000)
  const { run } = useDebounceFn(
    () => {
      valueRef.value += 1
    },
    {
      wait: wait,
    },
  )
</script>
