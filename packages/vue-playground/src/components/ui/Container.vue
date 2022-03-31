<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ title: string; noOverflow?: boolean; noRounding?: boolean }>()
</script>

<template>
  <div
    h="full"
    grid="~"
    border="1 light-900 dark:dark-400"
    shadow="lg"
    class="grid-rows-[min-content,auto]"
    :class="noRounding ? 'border-t-0' : 'rounded-md'"
  >
    <div
      flex="~ row"
      text="xs"
      items="center"
      bg="light-500 dark:dark-800"
      border="b-1 dark:dark-400 light-900"
      p="l-2"
      h="8"
      :class="noRounding ? '' : 'rounded-t-md'"
    >
      <div flex="1">
        {{ title }}
      </div>
      <div flex="~ row" items="center">
        <slot name="controls" />
      </div>
    </div>
    <div
      bg="dark:dark-800 light-300"
      position="relative"
      border="rounded-b-md"
      w="full"
      :class="noOverflow ? 'overflow-hidden' : 'overflow-auto'"
    >
      <slot />
    </div>
  </div>
</template>
