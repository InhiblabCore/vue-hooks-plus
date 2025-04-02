<template>
  <div>
    <p>counter current value：{{ counter }}</p>
    <p>counter previous value：{{ prevCounter }}</p>
    <vhp-button @click="inc()">increase</vhp-button>
    <vhp-button @click="dec()" style="margin-left: 8px;">decrease</vhp-button>
  </div>
</template>

<script lang="ts" setup>
  import { usePrevious, useCounter } from 'vue-hooks-plus'
  const [counter, { inc, dec }] = useCounter(0)
  const prevCounter = usePrevious(counter)
</script>
