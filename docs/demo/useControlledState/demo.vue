<template>
  <div>
    <div>Show default value: {{ count }}</div>
    <div>Show form value: {{ countFormValue }}</div>
    <vhp-button @click="() => (value = 10)">Set value</vhp-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useControlledState } from 'vue-hooks-plus'
  const value = ref<number | undefined>(undefined)
  const [count] = useControlledState(undefined, 10)
  const [countFormValue] = useControlledState(value, 0)
</script>
