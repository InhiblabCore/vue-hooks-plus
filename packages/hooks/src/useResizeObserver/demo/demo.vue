<template>
  <div>
    <div>Click button resize the box to see changes</div>
    <br />
    <div>
      <vhp-button @click="handleCols"> col+1</vhp-button>
      <vhp-button style="margin-left: 8px;" @click="handleRows"> row+1 </vhp-button>
    </div>
    <br />
    <textarea
      ref="valueRef"
      class="resizer"
      :rows="rows"
      :cols="cols"
      disabled
      v-text="`width: ${width}\nheight: ${height}`"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, toRefs, reactive } from 'vue'
  import { useResizeObserver } from 'vue-hooks-plus'

  const cols = ref(40)
  const rows = ref(5)

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

  const handleCols = () => {
    cols.value += 1
  }
  const handleRows = () => {
    rows.value += 1
  }
</script>

<style>
  .resize {
    min-width: 200px;
    min-height: 200px;
    max-width: 500px;
    max-height: 500px;
  }
</style>
