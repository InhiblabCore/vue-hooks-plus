<template>
  <div>
    <input type="text" placeholder="input" v-model="valueRef" />
    <p>ThrottledValue：{{ throttledValue }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useThrottle, useTimeout } from 'vue-hooks-plus'
  const valueRef = ref('')
  const waitRef = ref(500)

  useTimeout(() => {
    waitRef.value = 2000
  }, 2000)
  const throttledValue = useThrottle(valueRef, { wait: waitRef })
</script>
