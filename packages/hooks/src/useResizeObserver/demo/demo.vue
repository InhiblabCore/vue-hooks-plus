<template>
  <div>
    <textarea ref="valueRef" class="resizer" disabled />
    <p>width: {{ width }}</p>
    <p>height: {{ height }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { ref, toRefs, reactive } from 'vue'
  import { useResizeObserver } from 'vue-hooks-plus'

  const { width, height } = toRefs(
    reactive({
      width: 0,
      height: 0,
    }),
  )

  const valueRef = ref()
  useResizeObserver(valueRef, entries => {
    const entry = entries[0]
    const { width: _w, height: _h } = entry.contentRect

    width.value = _w
    height.value = _h
  })
</script>

<style>
  .resize {
    min-width: 200px;
    min-height: 200px;
    max-width: 500px;
    max-height: 500px;
  }
</style>
