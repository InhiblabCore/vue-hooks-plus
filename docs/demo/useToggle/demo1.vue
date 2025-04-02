<template>
  <div>
    <div>{{ flag }}</div>
    <br>
    <div>
      <p>
        <vhp-button style="margin-left: 16px" @click="() => toggle()">toggle</vhp-button>
        <vhp-button style="margin-left: 16px" @click="() => set('Hello')">set Hello</vhp-button>
        <vhp-button style="margin-left: 16px" @click="() => set('Vue-hooks-plus')"
        >setvue-hooks-plus</vhp-button
        >
        <vhp-button style="margin-left: 16px" @click="() => setRight()">setRight</vhp-button>
        <vhp-button style="margin-left: 16px" @click="() => setLeft()">setLeft</vhp-button>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useToggle } from 'vue-hooks-plus'

  const [flag, { toggle, set, setLeft, setRight }] = useToggle('Hello', 'Vue-hooks-plus')
</script>
