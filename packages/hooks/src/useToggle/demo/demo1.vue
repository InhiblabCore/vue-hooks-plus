<template>
  <div>
    <div>{{ flag }}</div>
    <br />
    <div>
      <p>
        <button style="margin-left: 16px" @click="() => toggle()">toggle</button>
        <button style="margin-left: 16px" @click="() => set('Hello')">set Hello</button>
        <button style="margin-left: 16px" @click="() => set('Vue-hooks-plus')"
          >setvue-hooks-plus</button
        >
        <button style="margin-left: 16px" @click="() => setRight()">setRight</button>
        <button style="margin-left: 16px" @click="() => setLeft()">setLeft</button>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useToggle } from 'vue-hooks-plus'

  const [flag, { toggle, set, setLeft, setRight }] = useToggle('Hello', 'Vue-hooks-plus')
</script>
