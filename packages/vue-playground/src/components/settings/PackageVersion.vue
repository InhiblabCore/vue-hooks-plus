<script setup lang="ts">
import { defineProps, computed, ref } from 'vue'
import { useFetch, useVModel } from '@vueuse/core'

const props = defineProps<{
  name: string
  modelValue: string
}>()

const version = useVModel(props)
const { data } = useFetch(`https://api.skypack.dev/v1/package/${props.name}`).json().get()

const versions = computed(() => {
  if (data.value && data.value.versions) {
    return [
      'Latest',
      ...Object.keys(data.value.versions),
    ]
  }

  return ['Latest']
})
</script>

<template>
  <div>
    <Listbox v-model="version">
      <div position="relative">
        <ListboxButton
          h="10"
          z="10"
          bg="dark:dark-700"
          border="rounded-l"
          p="x-4"
          flex="~"
          items="center"
          space="x-2"
          position="relative"
          outline="focus:none"
        >
          <span>
            {{ version }}
          </span>
          <carbon-chevron-down />
        </ListboxButton>
        <ListboxOptions
          position="absolute top-6"
          bg="light-700 dark:dark-700"
          list="none"
          w="full"
          p="0"
          max-h="60"
          z="100"
          overflow="auto"

          border="1 dark:dark-900 light-900 rounded-b"
        >
          <div
            v-for="v in versions"
            :key="v"
            cursor="pointer"
            p="y-2 x-4"
            m="l-0"
            bg="hover:dark:dark-800"
          >
            <ListboxOption :value="v">
              {{ v }}
            </ListboxOption>
          </div>
        </ListboxOptions>
      </div>
    </Listbox>
  </div>
</template>
