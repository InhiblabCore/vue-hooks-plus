<template>
  <div>
    <input type="text" placeholder="input" v-model="valueRef">
    <p>ThrottledValue：{{ throttledValue }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useThrottle } from 'vue-hooks-plus'
  const valueRef = ref('')

  const throttledValue = useThrottle(valueRef, { wait: 500 })
</script>
