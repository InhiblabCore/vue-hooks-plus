<template>
  <div>
    <div>{{ flag }}</div>
    <br>
    <div>
      <p>
        <vhp-button style="margin-left: 16px" @click="() => toggle()">toggle</vhp-button>
        <vhp-button style="margin-left: 16px" @click="() => setRight()">togle True</vhp-button>
        <vhp-button style="margin-left: 16px" @click="() => setLeft()">togle False</vhp-button>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useToggle } from 'vue-hooks-plus'

  const [flag, { toggle, setLeft, setRight }] = useToggle()
</script>
