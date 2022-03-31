<script setup lang="ts">
import { ref, computed } from 'vue'
import { orchestrator } from '~/orchestrator'

const filter = ref('')
const pkgs = computed(() => {
  if (filter.value.length > 2)
    return orchestrator.packages.filter(({ name }) => name.includes(filter.value))

  return orchestrator.packages
})
</script>

<template>
  <div>
    <div h="20" flex="~ row" items="center" p="x-4">
      <Textfield v-model="filter" placeholder="Filter Packages" />
    </div>
    <div p="x-4 y-2" space="y-4">
      <PackageItem
        v-for="item in pkgs"
        :key="item.name"
        v-bind="item"
      />
    </div>
  </div>
</template>
