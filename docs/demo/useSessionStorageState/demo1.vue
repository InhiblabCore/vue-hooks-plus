<template>
  <div>
    <p>{{ filters }}</p>
    <vhp-button type="vhp-button" style="margin-right: 12px" @click="toggleOnlyAvailable">
      toggle available
    </vhp-button>
    <vhp-button type="vhp-button" @click="reset">
      reset
    </vhp-button>
  </div>
</template>

<script lang="ts" setup>
import { useSessionStorageState } from 'vue-hooks-plus'

const defaultFilters = {
  keyword: 'vue',
  onlyAvailable: false,
}

const [filters, setFilters] = useSessionStorageState('use-session-storage-state-demo-object', {
  defaultValue: defaultFilters,
})

const toggleOnlyAvailable = () => {
  setFilters(previous => ({
    ...(previous ?? defaultFilters),
    onlyAvailable: !(previous ?? defaultFilters).onlyAvailable,
  }))
}

const reset = () => {
  setFilters(defaultFilters)
}
</script>
