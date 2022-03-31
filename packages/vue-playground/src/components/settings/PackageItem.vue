<script setup lang="ts">
import { defineProps, computed, ref, watch } from 'vue'
import { orchestrator } from '~/orchestrator'

const props = defineProps<{
  name: string
  source: string
  description?: string
  url?: string
}>()

const version = ref('Latest')
const isInstalled = computed(() => orchestrator.packages.some(({ name }) => name === props.name))

watch(version, () => {
  if (isInstalled.value) {
    orchestrator.packages = [
      ...(orchestrator.packages.filter(({ name }) => name !== props.name) || []),
      {
        ...orchestrator.packages.find(({ name }) => name === props.name)!,
        version: version.value,
      },
    ]
  }
})

const uninstall = () => orchestrator.packages = orchestrator.packages.filter(({ name }) => name !== props.name)
const install = () => orchestrator.packages = [...orchestrator.packages, {
  name: props.name,
  url: `https://cdn.skypack.dev/${props.name}`,
  description: props.description,
  version: version.value,
  source: 'skypack',
}]
</script>

<template>
  <div bg="dark:dark-500" border="~ rounded light-700 dark:dark-900" p="4">
    <div flex="~" space="x-4" items="center">
      <span flex="1">{{ name }}</span>
      <span text="xs dark:(light-900 opacity-70)" bg="dark:dark-300" p="x-2 y-1" border="rounded">{{ source }}</span>
    </div>
    <div text="sm dark-100 opacity-70 dark:(light-900 opacity-70)">
      {{ description }}
    </div>
    <div flex="~ row" m="t-2">
      <span flex="1"></span>
      <div flex="~" space="x-[1px]" bg="light-900 dark:dark-900" border="~ rounded dark:dark-900">
        <!-- <PackageVersion v-model="version" v-if="source === 'skypack'" :name="name" /> -->
        <Button v-if="isInstalled" border="rounded-r" :class="{'rounded': source !== 'skypack'}" @click="uninstall()">
          <carbon-delete />
          <span>
            Uninstall
          </span>
        </Button>
        <Button v-else border="rounded-r" :class="{'rounded': source !== 'skypack'}" @click="install()">
          <carbon-download />
          <span>
            Install
          </span>
        </Button>
      </div>
    </div>
  </div>
</template>
