<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  badge?: any
  active: boolean
}>()
</script>

<template>
  <div
    text="dark:(light-900 opacity-70)"
    flex="~ row"
    items="center"
    p="x-4"
    h="12"
    cursor="pointer"
    bg="hover:(dark:dark-300)"
    :class="{ 'bg-light-600 dark:bg-dark-300': active }"
  >
    <div flex="~ row 1" space="x-2" items="center">
      <slot />
    </div>
    <div
      v-if="badge"
      text="sm"
      w="8"
      h="8"
      border="rounded-full"
      flex="~"
      place="items-center content-center"
      bg="light-900 dark:dark-700"
    >
      {{ badge }}
    </div>
  </div>
</template>
