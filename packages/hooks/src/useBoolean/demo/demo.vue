<template>
  <div>
    <div>{{ flag }}</div>
    <br>
    <div>
      <p>
        <button style="margin-left: 16px" @click="() => set(!flag)">set</button>
        <button style="margin-left: 16px" @click="() => setTrue()">setTrue</button>
        <button style="margin-left: 16px" @click="() => setFalse()">setFalse</button>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useBoolean } from 'vue-hooks-plus'
  const [flag, { set, setFalse, setTrue }] = useBoolean(true)
</script>
