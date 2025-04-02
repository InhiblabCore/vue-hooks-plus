<template>
  <div>
    <p>Try pressing the following: </p>
    <div>
      1. Modifier key [shift.c]: <span v-if="state === 1" style="color:#f00">complete</span>
    </div>
    <div>2. Modifier key [c]: <span v-if="state === 2" style="color:#f00">complete</span></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useKeyPress } from 'vue-hooks-plus'

  const state = ref<number>()

  useKeyPress(['shift.c'], () => {
    state.value = 1
  })

  useKeyPress(
    ['c'],
    () => {
      state.value = 2
    },
    {
      exactMatch: true,
    },
  )
</script>
