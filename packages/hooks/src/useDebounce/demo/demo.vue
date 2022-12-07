<template>
  <div>
    <input type="text" placeholder="input" v-model="valueRef">
    <p>DebouncedValue：{{ debouncedValue }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useDebounce } from 'vue-hooks-plus'
  const valueRef = ref('')

  const debouncedValue = useDebounce(valueRef, { wait: 500 })
</script>
