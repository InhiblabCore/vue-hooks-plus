<template>
  <div>
    <div>{{ flag }}</div>
    <br>
    <div>
      <p>
        <vhp-button style="margin-left: 16px" @click="() => set(!flag)">set</vhp-button>
        <vhp-button style="margin-left: 16px" @click="() => setTrue()">setTrue</vhp-button>
        <vhp-button style="margin-left: 16px" @click="() => setFalse()">setFalse</vhp-button>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useBoolean } from 'vue-hooks-plus'
  const [flag, { set, setFalse, setTrue }] = useBoolean(true)
</script>
