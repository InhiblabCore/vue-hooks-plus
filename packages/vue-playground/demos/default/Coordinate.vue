<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  label: String,
  value: Number,
})
</script>

<template>
  <div
    font="mono"
    bg="light-500 dark:dark-500"
    flex="~ col"
    text="center"
    p="2"
    border="rounded"
  >
    <span text="4xl">{{ value }}</span>
    <span text="sm dark:light-900 dark:opacity-50" m="t-2">Mouse {{ label }}</span>
  </div>
</template>
