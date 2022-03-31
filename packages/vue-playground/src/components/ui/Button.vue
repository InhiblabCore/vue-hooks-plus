<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps<{ href?: string; primary?: boolean; icon?: boolean; small?: boolean }>()
const type = computed(() => props.href ? 'a' : 'button')
</script>

<template>
  <button
    outline="focus:none"
    text="sm"
    p="x-4 y-2"
    flex="~"
    place="items-center content-center"
    space="x-1"
    h="10"
    font="medium"
    border="rounded"
    :class="{
      '!bg-green-500 !text-green-900': primary,
      'w-10 !px-0 text-lg': icon,
      'w-6 !h-6': small
    }"
    bg="hover:dark:dark-400"
  >
    <slot />
  </button>
</template>
