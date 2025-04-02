<template>
  <div>
    <div>{{ flag }}</div>
    <br />
    <div>
      <p>
        <vhp-button @click="() => set(!flag)">Set</vhp-button>
        <vhp-button style="margin-left: 8px" @click="() => setTrue()">SetTrue</vhp-button>
        <vhp-button style="margin-left: 8px" @click="() => setFalse()">SetFalse</vhp-button>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useBoolean } from 'vue-hooks-plus'
  const [flag, { set, setFalse, setTrue }] = useBoolean(true)
</script>
