<template>
  <div>
    <p>Try pressing the following: </p>
    <div>1. Press ArrowUp by key to increase</div>
    <div>2. Press ArrowDown by keyCode to decrease</div>
    <div>
      counter: <span style="color:#f00">{{ counter }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useKeyPress } from 'vue-hooks-plus'

  const counter = ref(0)

  useKeyPress('uparrow', () => {
    counter.value = counter.value + 1
  })

  useKeyPress(40, () => {
    counter.value = counter.value - 1
  })
</script>

<style scoped lang="less"></style>
