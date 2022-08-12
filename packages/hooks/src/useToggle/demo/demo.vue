<template>
  <div>
    <div>{{ flag }}</div>
    <br />
    <div>
      <p>
        <button style="margin-left: 16px" @click="() => toggle()">toggle</button>
        <button style="margin-left: 16px" @click="() => setRight()">togle True</button>
        <button style="margin-left: 16px" @click="() => setLeft()">togle False</button>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useToggle } from 'vue-hooks-plus'

  const [flag, { toggle, setLeft, setRight }] = useToggle()
</script>
