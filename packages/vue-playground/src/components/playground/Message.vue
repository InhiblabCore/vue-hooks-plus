<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  message: string
  type: string
}>()
</script>

<template>
  <div class="flex flex-row items-center px-2 py-2 space-x-2 border-b dark:border-dark-400 font-mono">
    <div class="text-xs px-1 py-[3px] flex items-center bg-red-500 text-red-900 font-bold rounded">
      ERROR
    </div>
    <span class="text-sm dark:(text-light-900 text-opacity-50)">
      {{ message }}
    </span>
  </div>
</template>
