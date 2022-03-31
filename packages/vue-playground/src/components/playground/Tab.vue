<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { setActiveFile, orchestrator, removeFile } from '~/orchestrator'

const props = defineProps<{
  name?: string
  active: boolean
}>()

const isActive = computed(() => orchestrator.activeFilename === props.name)
const isProtectedFile = computed(() => props.name === 'App.vue')

const remove = () => {
  if (props.name)
    removeFile(props.name)
}
</script>

<template>
  <div
    :class="{ '!pr-4': name === 'App.vue', 'dark:bg-dark-600 light-800': isActive }"
    p="l-4 r-2"
    cursor="pointer"
    bg="hover:(light-800 dark:dark-600)"
    text="sm"
    h="8"
    display="inline-flex"
    flex="row"
    place="items-center"
    space="x-2"
    border="r-1 light-900 dark:dark-400"
    @click="setActiveFile(name)"
  >
    <logos-vue />
    <div
      :class="{ '!text-green-500': active }"
      text="dark-900 dark:light-900 xs"
    >
      <slot />
    </div>
    <Button v-if="!isProtectedFile" icon p="0" small @click="remove()">
      <carbon-close />
    </Button>
  </div>
</template>
