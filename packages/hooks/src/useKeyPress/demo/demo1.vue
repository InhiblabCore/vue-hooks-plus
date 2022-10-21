<template>
  <div>
    <p>Try pressing the following: </p>
    <div>
      1. Modifier key [shift.c]: <span v-if="state === 1" style="color:#f00">complete</span>
    </div>
    <div> 2. Modifier key [meta]:<span v-if="state === 2" style="color:#f00" /> </div>
    <div> 3. Modifier key [ctrl.alt.c]: <span v-if="state === 3" style="color:#f00" /> </div>
    <div> 4. Modifier key [ctrl.enter]: <span v-if="state === 4" style="color:#f00" /> </div>
    <div> 5. Modifier key [ctrl.alt.0]: <span v-if="state === 5" style="color:#f00" /> </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useKeyPress } from 'vue-hooks-plus'

  const state = ref<number>()

  useKeyPress(['shift.c'], () => {
    state.value = 1
  })

  useKeyPress(['meta'], () => {
    state.value = 2
  })

  useKeyPress('ctrl.alt.c', () => {
    state.value = 3
  })

  useKeyPress('ctrl.enter', () => {
    state.value = 4
  })

  // Attention: event.key === '0'
  useKeyPress('ctrl.alt.0', () => {
    state.value = 5
  })
</script>

<style scoped lang="less"></style>
