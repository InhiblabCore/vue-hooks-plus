<template>
  <div>name: {{ name }}</div>
  <div>age: {{ age }}</div>
  <div>double age: {{ formatAge }}</div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useFormatResult, useInterval } from 'vue-hooks-plus'

  const age = ref(0)
  const name = useFormatResult({ name: 'vue-hooks-plus' }, data => {
    return data.name
  })

  const formatAge = useFormatResult(age, data => {
    return data * 2
  })

  useInterval(() => {
    age.value += 1
  }, 1000)
</script>
