<script setup lang="ts">
import { defineProps } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps<{ modelValue: string }>()
const value = useVModel(props)
</script>

<template>
  <Listbox v-model="value">
    <div position="relative">
      <ListboxButton
        outline="focus:none"
        flex="~"
        h="8"
        items="center"
        p="x-2"
        space="x-2"
        border="l-1 dark:dark-300"
        position="relative"
      >
        <slot :value="value" />
        <carbon-chevron-down />
      </ListboxButton>
      <ListboxOptions
        position="absolute top-5 right-0"
        bg="dark:dark-900 light-300"
        shadow="~ lg"
        border="rounded-b rounded-tl"
        overflow="hidden"
        list="none"
        outline="focus:none"
        p="0"
        z="5000"
      >
        <slot name="items" />
      </ListboxOptions>
    </div>
  </Listbox>
</template>
